import MaterialTable from "@material-table/core"
import { makeStyles } from "@mui/styles"
import { useState, useEffect } from "react"
import { getData, serverURL, postData } from "../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import categoryimg from "../assets/category.png"
import { Dialog, DialogActions, DialogContent, Button, DialogTitle, DialogContentText } from "@mui/material";
import { TextField, Grid, Avatar, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";


const useStyles = makeStyles({
    reportroot: {
        height: "100vh",
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    reportbox: {
        height: 'auto',
        marginTop:'10px',
    },
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        height: 'auto',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    myswal: {
        zIndex: 2000
    }
})

function DisplayAllBrands() {
    const classes = useStyles()
    const [brands, setBrands] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    ////////////////Edit Brand Action/////////////////////

    const useStyle = useStyles()
    const [brandName, setBrandName] = useState('')
    const [image, setImage] = useState({ bytes: '', filename: '' })
    const [errors, setError] = useState({})
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [saveCancelBtn, setSaveCancelBtn] = useState(false)
    const [tempImage, setTempImage] = useState('')
    const [brandId, setBrandId] = useState('')
    const [oldPicture,setOldPicture]=useState('')

    const fetchAllCategory = async () => {
        var response = await getData('category/display_all_category')
        setCategoryList(response.data)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fillAllCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleError = (error, label) => {
        setError((prev) => ({ ...prev, [label]: error }))
    }

    function validation() {
        var error = false
        if (brandName.length === 0) {
            error = true
            handleError('Please Input Brand Name...', 'brandName')
        }
        if (image.filename.length === 0) {
            error = true
            handleError('Please Select Image ', 'image')
        }
        return error
    }

    const handleImage = (event) => {
        setImage({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
        setSaveCancelBtn(true)
    }

    const handleSubmit = async () => {
        var error = validation()
        if (error === false) {
            var body = { categoryid: categoryId, brandname: brandName, brandid: brandId }
            var response = await postData('brands/edit_brand', body)

            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Brands',
                    text: response.message,
                    toast: true
                })
                setOpen(false)
                fetchAllBrands()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.message,
                    toast: true
                })
            }
        }
    }

    const handleCancel = () => {
        setImage({ bytes: '', filename: tempImage })
        setSaveCancelBtn(false)
    }

    const handleEditPicture = async () => {
        setSaveCancelBtn(false)
        var formData = new FormData()
        formData.append('image', image.bytes)
        formData.append('brandid', brandId)
        formData.append('oldpicture',oldPicture)
        var response = await postData('brands/edit_brand_picture', formData)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: 'Picture Edit Successfully',
                toast: true,
                customClass: {
                    container: classes.myswal
                }
            })
            setOpen(false)
            fetchAllBrands()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Picture Edit Failed!',
                toast: true,
                customClass: {
                    container: classes.myswal
                }
            })
        }
    }

    const handleDelete = (rowData) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var response = await postData('brands/delete_brand', { brandid: rowData.brandid,oldpicture:rowData.image })
                if (response.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Record has been deleted.',
                        'success'
                    )
                    fetchAllBrands()
                }
                else
                {
                    Swal.fire(
                        'Failed!',
                        'Your Record has not been deleted.',
                        'error'
                    )
                }
            }
        })
    }
    //////////////////////////////////////////////////////

    const brandForm = () => {
        return (
            <div className={useStyle.root}>
                <div className={useStyle.box}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryId}
                                    label="Category"
                                    onChange={(event) => setCategoryId(event.target.value)}
                                >
                                    {fillAllCategory()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                error={errors.brandName}
                                fullWidth
                                helperText={errors.brandName}
                                label="Brand Name"
                                size="small"
                                value={brandName}
                                onChange={(event) => setBrandName(event.target.value)}
                                onFocus={() => handleError('', 'brandName')}>
                            </TextField>
                        </Grid>

                        {!saveCancelBtn ? <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button component="label" fullWidth variant="contained" startIcon={<CloudUploadIcon />} onFocus={() => handleError('', 'image')}>
                                <input type="file" required hidden accept="images/*" onChange={handleImage} />
                                Brand Image
                            </Button>
                            <div style={{ color: '#b32f2f', fontSize: 13, marginLeft: 15, fontFamily: 'consolas' }}>{errors.image}</div>
                        </Grid> :
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={handleEditPicture}>save</Button>
                                <Button onClick={handleCancel}>Cancel</Button>
                            </Grid>}

                        <Grid item xs={6} className={useStyle.center}>
                            <Avatar src={image.filename} style={{ width: 100, height: 100 }}></Avatar>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    async function fetchAllBrands() {
        var response = await getData('brands/display_all_brands')
        setBrands(response.data)
    }

    useEffect(function () {
        fetchAllBrands()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const showBrandDialogue = () => {
        return (<div>
            <Dialog
                open={open}
            >
                <DialogTitle>
                    {"Edit Brand"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {brandForm()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Edit Data</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>)
    }

    const handleOpen = (rowData) => {
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setBrandName(rowData.brandname)
        setImage({ bytes: '', filename: `${serverURL}/images/${rowData.image}` })
        setTempImage(`${serverURL}/images/${rowData.image}`)
        setBrandId(rowData.brandid)
        setOldPicture(rowData.image)
    }

    function DisplayBrand() {
        return (
            <MaterialTable
                title={
                    <div style={{ display: 'flex' }}>
                        <div>
                            <img src={categoryimg} alt="category" width="25"></img>
                        </div>
                        <div style={{ marginLeft: 5, fontFamily: 'consolas', fontSize: 22 }}>
                            Brand List
                        </div>
                    </div>
                }

                columns={[
                    { title: 'CategoryID/Category Name', render: (rowData) => <div>{rowData.categoryid}/{rowData.categoryname}</div> },
                    { title: 'Brand', render: (rowData) => <div>{rowData.brandid}/{rowData.brandname}</div> },
                    { title: 'Image', render: (rowData) => <img src={`${serverURL}/images/${rowData.image}`} width={40} height={40} alt="brands"></img> },
                ]}
                data={brands}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Brand',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Brand',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Brand',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/brands")
                    }
                ]}
            />
        )
    }


    return (<div className={classes.reportroot}>
        <div className={classes.reportbox}>
            {DisplayBrand()}
            {showBrandDialogue()}
        </div>
    </div>)
}

export default DisplayAllBrands