import { AppBar, Box, Button, Toolbar, useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { getData, postData } from '../../../services/FetchNodeServices';

export default function MenuComponent() {
    const matches = useMediaQuery('(max-width:800px)')
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([])
    const open = Boolean(anchorEl);
    const [zoom, setZoom] = useState(null)
    const [products, setProducts] = useState([])

    const handleClick = (event, categoryid, i) => {
        setAnchorEl(event.currentTarget)
        setZoom(i)
        fetchAllProducts(categoryid)
    }

    const fetchAllProducts = async (categoryid) => {
        var result = await postData('userinterface/display_all_products_for_menu', { categoryid: categoryid })
        setProducts(result.data)
    }
    const handleClose = () => {
        setAnchorEl(null);
        setZoom(null)
    };

    const fetchCategory = async () => {
        var result = await getData('userinterface/display_all_category')
        setCategories(result.data)
    }

    useEffect(function () {
        fetchCategory()
    }, [])

    const showMenu = () => {
        return categories.map((item, i) => {
            if (i >= 1 && i <= 8) {
                return <div>
                    <Button onClick={(event) => handleClick(event, item.categoryid, i)} style={{ color: zoom==i?'#12daa8':'#fff', fontSize: '1vw', transform: zoom === i ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease-in-out', marginLeft: '5px' }}>{item.categoryname}</Button>
                </div >
            }
        })
    }

    const showMenuItem = () => {
        return products.map((item) => {
            return <div>
                <MenuItem onClick={handleClose}>{item.productname}</MenuItem>
            </div >
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#191919', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <Toolbar>
                    {showMenu()}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{
                            "& .MuiMenu-paper": {
                                backgroundColor: "#191919",
                                color:'#fff'
                            },
                            "& .MuiMenuItem-root:hover": {
                                backgroundColor: "#12daa8",
                                color:'black',
                                fontWeight:'bold'
                            },
                            '& .MuiMenuItem-root': {
                                fontSize: '12px',
                            }
                        }}
                    >
                        {showMenuItem()}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}