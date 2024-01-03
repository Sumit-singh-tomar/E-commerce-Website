import { makeStyles } from "@mui/styles"
import { useEffect } from "react"
import { useState } from "react"
import MaterialTable from "@material-table/core"
import categoryimg from '../assets/category.png'
import { useNavigate } from "react-router-dom"
import { getData, serverURL, postData } from "../services/FetchNodeServices"
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from "@mui/material"
import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, FormHelperText } from "@mui/material"
import ReactQuill from "react-quill"
import Swal from "sweetalert2"
import { DropzoneArea } from "material-ui-dropzone"
import parse from 'html-react-parser';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        height: 'auto',
        width: '95%',
        marginTop:'10px'
    },
    productdetailsroot: {
        display: 'flex',
        justifyContent: 'center',
    },
    productdetailsbox:
    {
        height: 'auto',
        padding: 15,
        marginTop: 10,
    }
})

function DisplayAllProductDetails() {
    const classes = useStyles()
    const [productDetails, setProductDetails] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const fetchAllProductDetails = async () => {
        var response = await getData('productdetails/display_all_productdetails')
        setProductDetails(response.data)
    }

    useEffect(function () {
        fetchAllProductDetails()
    }, [])

    const handleOpen = (rowData) => {
        fetchBrandsByCategory(rowData.categoryid)
        fetchProductsByBrand(rowData.brandid)
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setBrandId(rowData.brandid)
        setProductId(rowData.productid)
        setModelNumber(rowData.modelnumber)
        setColor(rowData.color)
        setDescription(rowData.description)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setHsnCode(rowData.hsncode)
        setStatus(rowData.status)
        setProductDetailsId(rowData.productdetailsid)
    }

    //////////product details from actions/////////

    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [modelNumber, setModelNumber] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [stock, setStock] = useState('')
    const [hsnCode, setHsnCode] = useState('')
    const [status, setStatus] = useState('')
    const [errors, setErrors] = useState({})
    const [productId, setProductId] = useState('')
    const [files, setFiles] = useState([])
    const [productdetailsId, setProductDetailsId] = useState('')
    const [openFile, setOpenFile] = useState(false)


    const fetchAllCategory = async () => {
        var response = await getData('category/display_all_Category')
        setCategoryList(response.data)
    }

    const fillAllCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    async function fetchBrandsByCategory(cid) {
        var response = await postData('brands/display_all_brands_by_category', { cid: cid })
        setBrandList(response.data)
    }

    const fillAllBrands = () => {
        return brandList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value)
        fetchBrandsByCategory(event.target.value)
    }

    const handleBrandChange = (event) => {
        setBrandId(event.target.value)
        fetchProductsByBrand(event.target.value)
    }

    const fetchProductsByBrand = async (bid) => {
        var response = await postData('products/display_all_products_by_brand', { brandid: bid })
        setProductList(response.data)
    }

    const fillAllProducts = () => {
        return productList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const handleError = (val, label) => {
        setErrors((prev) => ({ ...prev, [label]: val }))
        console.log(errors)
    }

    const validation = () => {
        var error = false
        if (categoryId.length === 0) {
            error = true
            handleError('*Please Select Category', 'categoryId')
        }
        if (brandId.length === 0) {
            error = true
            handleError('*Please Select Brand', 'brandId')
        }
        if (productId.length === 0) {
            error = true
            handleError('*Please Enter Product Name', 'productId')
        }
        if (description.length === 11) {
            error = true
            handleError('*Please Enter Description', 'description')
        }
        if (modelNumber.length === 0) {
            error = true
            handleError('*Please Enter Model Number', 'modelNumber')
        }
        if (color.length === 0) {
            error = true
            handleError('*Please Enter color', 'color')
        }

        if (price.length === 0) {
            error = true
            handleError('*Please Enter Price', 'price')
        }
        if (offerPrice.length === 0) {
            error = true
            handleError('*Please Enter OfferPrice', 'offerPrice')
        }
        if (stock.length === 0) {
            error = true
            handleError('*Please Enter Stock', 'stock')
        }
        if (hsnCode.length === 0) {
            error = true
            handleError('*Please Enter hsnCode', 'hsnCode')
        }
        if (status.length === 0) {
            error = true
            handleError('*Please Select Status', 'status')
        }
        return error
    }

    const handleSubmit = async () => {
        var error = validation()
        console.log('errrororoor',errors)
        if (error === false) {
            setOpen(false)
            var body = { categoryid: categoryId, brandid: brandId, productid: productId, modelnumber: modelNumber, color: color, description: description, price: price, offerprice: offerPrice, stock: stock, hsncode: hsnCode, status: status, pid: productdetailsId }
            var response = await postData('productdetails/edit_productdetails', body)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: response.data,
                    toast: true
                })
                fetchAllProductDetails()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: response.data,
                    toast: true
                })
            }
        }
    }

    const handleEditPicture = async () => {
        setOpen(false)
        var formData = new FormData()
        formData.append('pid', productdetailsId)
        var response = await postData('productdetails/edit_productdetails_picture', formData)
        if (response.status === true) {
            Swal.fire({
                icon: 'success',
                title: response.data,
                toast: true
            })
            fetchAllProductDetails()
        }
        else {
            Swal.fire({
                icon: 'error',
                title: response.data,
                toast: true
            })
        }
    }

    const handleOpenPicture = (rowData) => {
        setProductDetailsId(rowData.productdetailsid)

        var pictures = rowData.picture.split(",").map((item) => {
            return `${serverURL}/images/${item}`
        })
        setFiles(pictures)
        setOpenFile(true)
    }

    const showPictureEditDialog =() => {
        return (<div>
            <Dialog open={openFile}>
                <DialogTitle>Edit Pictures</DialogTitle>
                <DialogContent>
                    <DropzoneArea
                        initialFiles={files}
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop files here"}
                        filesLimit={7}
                        onChange={(files) => setFiles(files)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFile(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>)
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
                var response = await postData('productdetails/delete_productdetails', { pid: rowData.productdetailsid, oldpicture: rowData.picture })
                if (response.status) {
                    Swal.fire(
                        'Deleted!',
                        'Your Record has been deleted.',
                        'success'
                    )
                    fetchAllProductDetails()
                }
                else {
                    Swal.fire(
                        'Failed!',
                        'Your Record has not been deleted.',
                        'error'
                    )
                }
            }
        })
    }

    const handleCloseDialogue = () => {
        setOpen(false)
        setErrors({})
    }
    ////////////////////////////////////////////////

    const productdetailsForm = () => {
        return (<div className={classes.productdetailsroot}>
            <div className={classes.productdetailsbox}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small" error={errors.categoryId}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                value={categoryId}
                                onFocus={() => handleError('', 'categoryId')}
                                onChange={handleCategoryChange}
                            >
                                {fillAllCategory()}
                            </Select>
                            <FormHelperText>{errors.categoryId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small" error={errors.brandId}>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                label="Brand"
                                value={brandId}
                                onFocus={() => handleError('', 'brandId')}
                                onChange={handleBrandChange}
                            >
                                {fillAllBrands()}
                            </Select>
                            <FormHelperText>{errors.brandId}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small" error={errors.productId}>
                            <InputLabel>Product</InputLabel>
                            <Select
                                label="Product"
                                value={productId}
                                onFocus={() => handleError('', 'productId')}
                                onChange={(event) => setProductId(event.target.value)}
                            >
                                {fillAllProducts()}
                            </Select>
                            <FormHelperText>{errors.productId}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Model Number"
                            fullWidth
                            size="small"
                            value={modelNumber}
                            error={errors.modelNumber}
                            helperText={errors.modelNumber}
                            onFocus={() => handleError('', 'modelNumber')}
                            onChange={(event) => setModelNumber(event.target.value)}
                        ></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="color"
                            fullWidth
                            size="small"
                            value={color}
                            error={errors.color}
                            helperText={errors.color}
                            onFocus={() => handleError('', 'color')}
                            onChange={(event) => setColor(event.target.value)}
                        ></TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth error={errors.description} onFocus={() => handleError('', 'description')} >
                            <FormLabel sx={{ fontWeight: 'bold', marginBottom: 1 }}>Description</FormLabel>
                            <ReactQuill
                                value={description}
                                placeholder="Enter Product Description"
                                onChange={(event) => setDescription(event)}
                            ></ReactQuill>
                            <FormHelperText>{errors.description}</FormHelperText>
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <TextField
                            label="Price"
                            fullWidth
                            size="small"
                            value={price}
                            error={errors.price}
                            helperText={errors.price}
                            onFocus={() => handleError('', 'price')}
                            onChange={(event) => setPrice(event.target.value)}
                        ></TextField>
                    </Grid>


                    <Grid item xs={6}>
                        <TextField
                            label="OfferPrice"
                            fullWidth
                            size="small"
                            value={offerPrice}
                            error={errors.offerPrice}
                            helperText={errors.offerPrice}
                            onFocus={() => handleError('', 'offerPrice')}
                            onChange={(event) => setOfferPrice(event.target.value)}
                        ></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="stock"
                            fullWidth
                            size="small"
                            value={stock}
                            error={errors.stock}
                            helperText={errors.stock}
                            onFocus={() => handleError('', 'stock')}
                            onChange={(event) => setStock(event.target.value)}
                        ></TextField>
                    </Grid>


                    <Grid item xs={6}>
                        <TextField
                            label="hsnCode"
                            fullWidth
                            size="small"
                            value={hsnCode}
                            error={errors.hsnCode}
                            helperText={errors.hsnCode}
                            onFocus={() => handleError('', 'hsnCode')}
                            onChange={(event) => setHsnCode(event.target.value)}
                        ></TextField>
                    </Grid>

                    <Grid item xs={12}>
                    <FormControl fullWidth size="small" error={errors.status}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            onFocus={() => handleError('', 'status')}
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <MenuItem value="Offer">Offer</MenuItem>
                            <MenuItem value="Deal of the Day">Deal of the Day</MenuItem>
                            <MenuItem value="Highlights">Highlights</MenuItem>
                            <MenuItem value="Trending">Trending</MenuItem>
                            <MenuItem value="Festive Deal">Festive Deal</MenuItem>
                            <MenuItem value="Sale">Sale</MenuItem>
                            <MenuItem value="New Arrival">New Arrival</MenuItem>
                            <MenuItem value="Discontinue">Discontinue</MenuItem>
                        </Select>
                        <FormHelperText>{errors.status}</FormHelperText>
                    </FormControl>
                    </Grid>
                </Grid>
            </div>
        </div>)
    }

    function showproductdetailsDialogue() {
        return (<Dialog open={open}>
            <DialogTitle>Edit Product Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {productdetailsForm()}
                </DialogContentText>
            </DialogContent>
            <DialogActions >
                <Button onClick={handleSubmit}>Edit Data</Button>
                <Button onClick={handleCloseDialogue}>Close</Button>
            </DialogActions>
        </Dialog>)
    }

    function DisplayProductDetails() {
        return (<div>
            <MaterialTable
                title={
                    <div style={{ display: 'flex' }}>
                        <div>
                            <img src={categoryimg} alt="category" width="25"></img>
                        </div>
                        <div style={{ marginLeft: 5, fontFamily: 'consolas', fontSize: 22 }}>
                            Specification
                        </div>
                    </div>
                }

                columns={[
                    { title: 'CategoryID /CategoryName', render: (rowData) => <div>{rowData.categoryid}/{rowData.categoryname}</div> },
                    { title: 'Brand', render: (rowData) => <div>{rowData.brandid}/{rowData.brandname}</div> },
                    { title: 'product', render: (rowData) => <div>{rowData.productid}/{rowData.productname}</div> },
                    { title: 'Model Number', field: 'modelnumber' },
                    { title: 'Description', render:(rowData)=><div style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{parse(rowData.description)}</div> },
                    { title: 'Price /Offer Price', render: (rowData) => <div>&#8377;<s>{rowData.price}</s>/&#8377;{rowData.offerprice}</div> },
                    { title: 'Stock', field: 'stock' },
                    { title: 'hsnCode', render: (rowData) => <div>{`${rowData.hsncode}%`}</div> },
                    { title: 'status', field: 'status' },
                ]}
                data={productDetails}
                actions={[
                    {
                        icon: 'photo',
                        tooltip: 'Edit Files',
                        onClick: (event, rowData) => handleOpenPicture(rowData)
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product Details',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product Details',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Product',
                        isFreeAction: true,
                        onClick: (event) => navigate("/dashboard/productdetails")
                    }
                ]}
            />
        </div>)
    }

    return (<div className={classes.root}>
        <div className={classes.box}>
            {DisplayProductDetails()}
            {showproductdetailsDialogue()}
            {showPictureEditDialog()}
        </div>
    </div>)
}

export default DisplayAllProductDetails