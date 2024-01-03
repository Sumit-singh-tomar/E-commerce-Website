import { useLocation } from "react-router-dom"
import OrderSummary from "./OrderSummary"
import { useStyles } from "./screens/ProjectCss"
import Header from "./Header"
import CartProduct from "./CartProduct"

function Shipping() {
    const location = useLocation()
    let productCart = location.state.productCart
    let userData = location.state.userData
    const classes = useStyles()

    return (
        <div className={classes.Shipping_Root}>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
            </div>

            <div className={classes.Shipping_Main_Box}>
                <div className={classes.Shipping_Left_Box}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'right', marginTop: '3%',fontFamily:'Arial' }}>
                        <div style={{ width: '80%', background: '#fff', display: 'flex', padding: '10px 20px',marginRight:'20px' }}>
                            <div style={{ width: '40%', fontWeight: 'bold', fontSize: '18px' }}>Delivery Address</div>
                            <div style={{ width: '30%' }}>
                                <div>+91 {userData.mobilenumber}</div>
                                <div>{userData.name}</div>
                                <div>{userData.address}</div>
                                <div>{userData.pincode}</div>
                            </div>
                            <div style={{ width: '30%',textAlign:'right',color:'#007185'}}>Change</div>
                        </div>
                    </div>

                    <div style={{width:'100%', display: 'flex', justifyContent: 'right', marginTop: '3%',}}>
                        <div style={{width: '80%', background: '#fff', display: 'flex', padding: '10px 20px',marginRight:'20px'}}>
                            <CartProduct productCart={productCart} screen={'shipping'}/>
                        </div>
                    </div>
                </div>

                <div className={classes.Shipping_Right_Box}>
                    <OrderSummary productCart={productCart} screen={"shipping"} />
                </div>
            </div>
        </div >
    )
}

export default Shipping