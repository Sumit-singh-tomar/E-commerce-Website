import { TextField, Grid, Button, Avatar, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import { getData, postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";
import Heading from "./ProjectComponent/Heading";
import categoryicon from '../../src/assets/category.png'

var useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        height: 'auto',
        width: 500,
        background: '#f1f2f6',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },

})
function Brands() {
    const useStyle = useStyles()
    const [brandName, setBrandName] = useState('')
    const [image, setImage] = useState({ bytes: '', filename: '' })
    const [errors, setError] = useState({})
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])

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
        if (categoryId.length === 0) {
            error = true
            handleError('Please Select CategoryId ', 'categoryId')
        }

        return error
    }

    const handleImage = (event) => {
        setImage({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const handleSubmit = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('brandname', brandName)
            formData.append('image', image.bytes)
            formData.append('categoryid', categoryId)
            var response = await postData('brands/submit_brands', formData)

            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Brands',
                    text: response.message,
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.message,
                })
            }
        }
    }

    const handleReset = () => {
        setBrandName('')
        setImage({ bytes: '', filename: '' })
        setCategoryId('')
    }
    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Heading image={categoryicon} caption="Add Brand" link="/dashboard/displayallbrands"></Heading>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth size="small" error={errors.categoryId}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={categoryId}
                                label="Category"
                                onChange={(event) => setCategoryId(event.target.value)}
                                onFocus={() => handleError('', 'categoryId')}
                            >
                                {fillAllCategory()}
                            </Select>
                            <FormHelperText>{errors.categoryId}</FormHelperText>
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

                    <Grid item xs={6}>
                        <FormControl fullWidth error={errors.image}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onFocus={() => handleError('', 'image')}>
                            <input type="file" required hidden accept="images/*" onChange={handleImage} />
                            Brand Image
                        </Button>
                        <FormHelperText>{errors.image}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} className={useStyle.center}>
                        <Avatar src={image.filename}></Avatar>
                    </Grid>

                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>

                    <Grid item xs={6} style={{ marginBottom: 10 }}>
                        <Button fullWidth variant="contained" onClick={handleReset}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Brands;