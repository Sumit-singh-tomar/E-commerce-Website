import { makeStyles } from "@mui/styles"
import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material"
import Heading from "./ProjectComponent/Heading"
import categoryicon from "../assets/category.png"
import { useEffect, useMemo } from "react"
import { getData, postData } from "../services/FetchNodeServices"
import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2"
import { DropzoneArea } from "material-ui-dropzone"

const useStyles = makeStyles({
    productdetailsroot: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    productdetailsbox:
    {
        height: 'auto',
        width: '50%',
        padding: 15,
        marginTop: 10,
        background: '#f2f2f2'
    }
})
function ProductDetails() {
    const classes = useStyles()
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
    const [files, setFiles] = useState([])
    const [status, setStatus] = useState('')
    const [errors, setErrors] = useState({})
    const [productId, setProductId] = useState('')
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['image', 'link', 'video'],
                [{ color: [] }]
            ]
        }
    }), [])

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
        fetchAllProductsByBrand(event.target.value)
    }

    const fetchAllProductsByBrand = async (bid) => {
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
        if (files.length === 0) {
            error = true
            handleError('*Please Select Picture', 'picture')
        }
        if (description.length === 0) {
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
        if (error === false) {
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('brandid', brandId)
            formData.append('productid', productId)
            formData.append('modelnumber', modelNumber)
            formData.append('color', color)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('offerprice', offerPrice)
            formData.append('stock', stock)
            formData.append('status', status)
            formData.append('hsncode', hsnCode)
            files.map((file, index) => {
                formData.append('picture' + index, file)
            })
            console.log('fomdata', formData)
            var response = await postData('productdetails/submit_productdetails', formData)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: response.message,
                })
            }
        }
    }
    return (<div className={classes.productdetailsroot}>
        <div className={classes.productdetailsbox}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="Add Product Details" link="/dashboard/displayallproductdetails"></Heading>
                </Grid>

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
                        error={errors.color}
                        helperText={errors.color}
                        onFocus={() => handleError('', 'color')}
                        onChange={(event) => setColor(event.target.value)}
                    ></TextField>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth error={errors.description}>
                        <FormLabel sx={{ fontWeight: 'bold', marginBottom: 1, fontFamily: 'consolas' }}>Description</FormLabel>
                        <ReactQuill
                            placeholder="Enter Product Description"
                            onFocus={() => handleError('', 'description')}
                            onChange={(event) => setDescription(event)}
                            modules={modules}
                        ></ReactQuill>
                        <FormHelperText>{errors.description}</FormHelperText>
                    </FormControl>
                </Grid>


                <Grid item xs={6}>
                    <TextField
                        label="Price"
                        fullWidth
                        size="small"
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
                        error={errors.hsnCode}
                        helperText={errors.hsnCode}
                        onFocus={() => handleError('', 'hsnCode')}
                        onChange={(event) => setHsnCode(event.target.value)}
                    ></TextField>
                </Grid>

                <Grid item xs={6}>

                    <FormControl fullWidth size="small" error={errors.status}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            onFocus={() => handleError('', 'status')}
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

                <Grid item xs={6}></Grid>

                <Grid item xs={12}>
                    <FormControl error={errors.picture} fullWidth>
                        <DropzoneArea
                            filesLimit={7}
                            dropzoneText="Add Product Picture here"
                            onChange={(files) => setFiles(files)}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" fullWidth>Reset</Button>
                </Grid>

            </Grid>
        </div>
    </div>)
}

export default ProductDetails