import { TextField, Grid, Button, Avatar } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import { postData } from "../services/FetchNodeServices";
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
function Category() {
    const useStyle = useStyles()
    const [categoryName, setCategoryName] = useState('')
    const [image, setImage] = useState({ bytes: '', filename: '' })
    const [errors, setError] = useState({})

    const handleError = (error, label) => {
        setError((prev) => ({ ...prev, [label]: error }))
    }

    function validation() {
        var error = false
        if (categoryName.length === 0) {
            error = true
            handleError('Please Input Category Name...', 'categoryName')
        }
        if (image.filename.length === 0) {
            error = true
            handleError('Please Select Image ', 'image')
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
            formData.append('categoryname', categoryName)
            formData.append('image', image.bytes)
            var response = await postData('category/submit_category', formData)

            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Category',
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
        setCategoryName('')
        setImage({ bytes: '', filename: '' })
    }
    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={2}>
 
                   <Grid item xs={12}>
                    <Heading image={categoryicon} caption="New Category" link="/dashboard/displayallcategory"></Heading>
                   </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={errors.categoryName}
                            fullWidth
                            helperText={errors.categoryName}
                            label="Category Name"
                            size="small"
                            value={categoryName}
                            onChange={(event) => setCategoryName(event.target.value)}
                            onFocus={() => handleError('', 'categoryName')}>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <Button component="label" fullWidth variant="contained" startIcon={<CloudUploadIcon />} onFocus={() => handleError('', 'image')}>
                            <input type="file" required hidden accept="images/*" onChange={handleImage} />
                            Category Image
                        </Button>
                        <div style={{ color: '#b32f2f', fontSize: 13, marginLeft: 15, fontFamily: 'consolas' }}>{errors.image}</div>
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

export default Category;