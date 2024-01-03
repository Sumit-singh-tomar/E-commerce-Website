import { useStyles } from "./ProjectCss";
import Header from "../Header"
import CartProduct from "../CartProduct";
import OrderSummary from "../OrderSummary";
import {  useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { serverURL } from "../../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";


function Cart() {
    const classes = useStyles()
    const matches = useMediaQuery('(max-width:1050px)')
    let cart = useSelector(state => state.mycart)
    const [refresh, setRefresh] = useState(false)
    const navigate=useNavigate()

    let productCart = Object.values(cart)

    const handleContinueShopping=()=>{
        navigate('/home')
    }
    return (
        <div className={classes.Cart_Root}>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
            </div>

            {productCart.length == 0 ? 
            <div style={{ width: '100%', display: 'flex', alignItems: 'center',flexDirection:'column',background:'' }}>
                <div style={{width:'80%',fontWeight:'bold',marginTop:'2%',fontSize:'20px'}}>YOUR CART</div>
                <div style={{ width: '15%' }}>
                    <img src={`${serverURL}/images/emptyCart.gif`} height="100%" width="100%" />
                </div>

                <div style={{width:'100%',textAlign:'center',fontWeight:'bold',fontSize:'18px',marginTop:'2%'}}>
                    Your Cart is Empty
                </div>

                <div style={{width:'100%',textAlign:'center',color:'#008846',textDecoration:'underline',marginTop:'1%',fontWeight:'bold'}}>
                    <span onClick={handleContinueShopping} style={{cursor:'pointer'}}>Continue shopping</span>
                </div>
            </div>
                :
                <div className={classes.Cart_Main_Box} style={{ display: 'flex', flexDirection: matches ? 'column' : 'row' }}>
                    <div className={classes.Cart_Left_Box} style={{ width: matches ? '100%' : '65%', background: '', display: 'flex', justifyContent: matches ? 'center' : 'right' }}>
                        <CartProduct productCart={productCart} refresh={refresh} setRefresh={setRefresh} screen={'cart'} />
                    </div>

                    <div className={classes.Cart_Right_Box} style={{ width: matches ? '100%' : '35%', background: '', display: 'flex', justifyContent: matches ? 'center' : '' }}>
                        <OrderSummary productCart={productCart} screen={"cart"} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart