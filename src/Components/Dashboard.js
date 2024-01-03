import { makeStyles } from "@mui/styles";
import { Grid, Avatar, Paper, Button, ListItemButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import InboxIcon from '@mui/icons-material/Inbox';
import GridViewIcon from '@mui/icons-material/GridView';
import BrandingWatermarkTwoToneIcon from '@mui/icons-material/BrandingWatermarkTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import ViewCarouselTwoToneIcon from '@mui/icons-material/ViewCarouselTwoTone';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import AddToQueueTwoToneIcon from '@mui/icons-material/AddToQueueTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { serverURL } from "../services/FetchNodeServices";
import Category from "./Category"
import DisplayAllCategory from "./DisplayAllCategory";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Brands from "./Brands";
import DisplayAllBrands from "./DisplayAllBrands";
import Products from "./Products";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetails from "./DisplayAllProdcutsDetails";
import Banner from "./Banner";
import CategoryBanner from "./CategoryBanner";
import DisplayAllBanner from "./DisplayAllBanner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles({
    DashboardRoot: {
        height: '100vh',
        width: '100vw',
        display: 'flex'
    },
    sideBox: {
        height: '100%',
        overflowX: 'hidden',
        width: '20%',
    },
    mainBox: {
        height: '100%',
        width: '80%',
        overflow: 'auto',
    }
})

function Dashboard() {
    var admin = JSON.parse(localStorage.getItem("ADMIN"))
    const classes = useStyles()
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <div className={classes.DashboardRoot}>
            <div className={classes.sideBox}>
                <Paper elevation={3} style={{ height: '100%', overflow: 'hidden', width: '95%' }}>
                    <Grid container style={{ marginTop: '20px', marginLeft: '10px' }}>

                        <Grid item xs={11} style={{ background: '#f2f2f2', height: 80, display: 'flex', alignItems: 'center', borderRadius: 10 }}>
                            <span style={{ marginLeft: '10px' }}><Avatar src={`${serverURL}/images/${admin.picture}`}></Avatar></span>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <span style={{ marginLeft: 10, fontWeight: 500 }}>{admin.username}</span>
                                <span style={{ marginLeft: 10 }}>{admin.emailid}</span>
                            </div>
                        </Grid>

                        <Grid item xs={11} style={{ marginTop: '20px' }}>
                            <List id="dashboard">
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/dashboard")
                                            setSelectedIndex(1)
                                        }}
                                        selected={selectedIndex === 1}
                                    >
                                        <ListItemIcon>
                                            <LeaderboardTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard"></ListItemText>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        navigate("/dashboard/displayallcategory")
                                        setSelectedIndex(2)
                                    }}
                                        selected={selectedIndex === 2}
                                    >
                                        <ListItemIcon>
                                            <GridViewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Category"></ListItemText>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/dashboard/displayallbrands")
                                            setSelectedIndex(3)
                                        }}
                                        selected={selectedIndex === 3}
                                    >
                                        <ListItemIcon>
                                            <BrandingWatermarkTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Brands"></ListItemText>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/dashboard/displayallproducts")
                                            setSelectedIndex(4)
                                        }}
                                        selected={selectedIndex === 4}
                                    >
                                        <ListItemIcon>
                                            <Inventory2TwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Product"></ListItemText>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/dashboard/displayallproductdetails")
                                            setSelectedIndex(5)
                                        }}
                                        selected={selectedIndex === 5}
                                    >
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Specification"></ListItemText>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/dashboard/banner")
                                            setSelectedIndex(6)
                                        }}
                                        selected={selectedIndex === 6}
                                    >
                                        <ListItemIcon>
                                            <ViewCarouselTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Banner"></ListItemText>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/dashboard/categorybanner")
                                            setSelectedIndex(7)
                                        }}
                                        selected={selectedIndex === 7}
                                    >
                                        <ListItemIcon>
                                            <AddToQueueTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Category Banner"></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={11} style={{ marginTop: '120px', display: 'flex', justifyContent: 'center' }}>
                            <Button startIcon={<ExitToAppTwoToneIcon />} color="error" fullWidth variant="contained">Logout</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>

            <div className={classes.mainBox}>
                <Grid container>
                    <Grid item xs={12}>
                        <Routes>
                            <Route path="/category" element={<Category />}></Route>
                            <Route path="/displayallcategory" element={<DisplayAllCategory />}></Route>
                            <Route path="/brands" element={<Brands />}></Route>
                            <Route path="/displayallbrands" element={<DisplayAllBrands />}></Route>
                            <Route path="/products" element={<Products />}></Route>
                            <Route path="/displayallproducts" element={<DisplayAllProducts />}></Route>
                            <Route path="/productdetails" element={<ProductDetails />}></Route>
                            <Route path="/displayallproductdetails" element={<DisplayAllProductDetails />}></Route>
                            <Route path="/banner" element={<Banner />}></Route>
                            <Route path="/categorybanner" element={<CategoryBanner />}></Route>
                            <Route path="/displayallbanner" element={<DisplayAllBanner />}></Route>
                        </Routes>
                    </Grid>
                </Grid>
            </div>

        </div >)

}

export default Dashboard