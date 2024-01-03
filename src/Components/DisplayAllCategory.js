import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { makeStyles } from "@mui/styles";
import { getData, serverURL } from "../services/FetchNodeServices";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, FormHelperText } from "@mui/material";
import { TextField, Grid, Avatar } from "@mui/material";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import categoryimg from "../../src/assets/category.png"

var useStyles = makeStyles({
  reportroot: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  reportbox: {
    width: '70%',
    height: 'auto',
    margin: '10px'
  },
  box: {
    height: 'auto',
    width: 500,
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  right: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center'
  },
  myswal: {
    zIndex: 2000
  }
})

function DisplayAllCategory() {
  const navigate = useNavigate()
  const classes = useStyles()
  const [category, setCategory] = useState([])
  const [open, setOpen] = useState(false)

  ///////////////Category Edit Action /////////////////

  const [categoryName, setCategoryName] = useState('')
  const [image, setImage] = useState({ bytes: '', filename: '' })
  const [errors, setError] = useState({})
  const [statusCamera, setStatusCamera] = useState(false)
  const [saveCancelBtn, setSaveCancelBtn] = useState(false)
  const [tempImage, setTempImage] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [oldPicture,setOldPicture]=useState('')

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

  const handleSubmit = async () => {
    var error = validation()
    if (error === false) {
      var body = { categoryid: categoryId, categoryname: categoryName }
      var response = await postData('category/edit_category', body)

      if (response.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Category',
          text: response.message,
          toast: true,
          customClass: {
            container: classes.myswal
          }
        })
        fetchAllCategory()
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.message,
          toast: true,
          customClass: {
            container: classes.myswal
          }
        })
      }
    }
  }

  const handleImage = (event) => {
    setImage({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    setSaveCancelBtn(true)
  }

  const handleEditPicture = async () => {
    setSaveCancelBtn(false)
    var error = validation()
    if (error === false) {
      var formData = new FormData()
      formData.append('categoryid', categoryId)
      formData.append('categoryname', categoryName)
      formData.append('image', image.bytes)
      formData.append('oldpicture',oldPicture)
      var response = await postData('category/edit_category_picture', formData)

      if (response.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Category',
          text: response.message,
          toast: true,
          customClass: {
            container: classes.myswal
          }
        })
        fetchAllCategory()
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.message,
          toast: true,
          customClass: {
            container: classes.myswal
          }
        })
        fetchAllCategory()
      }
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
      confirmButtonText: 'yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await postData('category/delete_category', { categoryid: rowData.categoryid,oldpicture:rowData.image })
        if (response.status) {
          Swal.fire(
            'Deleted!',
            'your file has been deleted',
            'success'
          )
          fetchAllCategory()
        }
        else {
          Swal.fire(
            'Delete!',
            'Fail to delete Category',
            'error'
          )
        }
        fetchAllCategory()
      }
    })
  }
  /////////////////////////////////////////////////////

  async function fetchAllCategory() {
    var response = await getData('category/display_all_category')
    setCategory(response.data)
  }

  useEffect(function () {
    fetchAllCategory()
  }, [])

  const showCategoryDialog = () => {
    return (<div>
      <Dialog open={open}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {categoryForm()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Edit Data</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>)
  }

  const handleOpen = (rowData) => {
    setCategoryId(rowData.categoryid)
    setOpen(true)
    setCategoryName(rowData.categoryname)
    setImage({ bytes: '', filename: `${serverURL}/images/${rowData.image}` })
    setTempImage(`${serverURL}/images/${rowData.image}`)
    setOldPicture(rowData.image)
  }

  const handleCancel = () => {
    setSaveCancelBtn(false)
    setImage({ filename: tempImage, bytes: '' })
  }

  const SaveCancelBtn = () => {
    return (<div>
      <Button onClick={handleEditPicture}>Save</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>)
  }

  const categoryForm = () => {
    return (
      <div className={classes.box}>
        <Grid container spacing={2}>

          <Grid item xs={8} className={classes.right}>
            {saveCancelBtn ? <SaveCancelBtn></SaveCancelBtn> : <></>}
          </Grid>

          <Grid item xs={4} className={classes.right}>
            <Button
              style={{ position: 'relative' }}
              component="label"
              onMouseEnter={() => setStatusCamera(true)}
              onMouseLeave={() => setStatusCamera(false)}
              onFocus={() => handleError('', 'image')}
            >
              {statusCamera ?
                <div style={{ position: 'absolute', zIndex: 2, right: 10, bottom: 10, background: '#f2f2f2', height: 30, width: 30, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PhotoCameraIcon style={{ fontSize: "medium", color: 'black' }}></PhotoCameraIcon>
                </div>
                : <></>}
              <Avatar src={image.filename} style={{ height: 100, width: 100 }}></Avatar>
              <input type="file" required hidden accept="images/*" onChange={handleImage} />
            </Button>
            <FormHelperText>{errors.image}</FormHelperText>
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
        </Grid>
      </div>
    )
  }

  function DisplayCategory() {
    return (
      <MaterialTable
        title={
          <div style={{display:'flex'}}>
            <div>
              <img src={categoryimg} alt="category" width="25"></img>
            </div>
            <div style={{marginLeft:5,fontFamily:'consolas',fontSize:22}}>
              Category List
            </div>
          </div>
        }

        columns={[
          { title: 'CategoryID', field: 'categoryid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Image', render: (rowData) => <img src={`${serverURL}/images/${rowData.image}`} alt="category" width={40} height={40} /> }
        ]}
        data={category}

        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleOpen(rowData),
          },
          {
            icon: 'delete',
            tooltip: 'Delete Category',
            onClick: (event, rowData) => handleDelete(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/category")
          }
        ]}
        options={{ paging: false }}
      />
    )
  }

  return (
    <div className={classes.reportroot}>
      <div className={classes.reportbox}>
        {DisplayCategory()}
        {showCategoryDialog()}
      </div>
    </div>)
}


export default DisplayAllCategory;

//      options={{
//      paging:false,
//      pageSize:6,       // make initial page size
//      emptyRowsWhenPaging: false,   // To avoid of having empty rows
//     pageSizeOptions:[6,12,20,50],    // rows selection options
//    search:true,
//    searchFieldVariant: "outlined",
//    searchFieldStyle:{height:40},
// }} 