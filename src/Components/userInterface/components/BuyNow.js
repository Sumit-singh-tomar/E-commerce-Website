import { Button, useMediaQuery } from "@mui/material"
import { serverURL } from "../../../services/FetchNodeServices"
import PlusMinusComponent from "./PlusMinusComponent"
import { useSelector, useDispatch } from "react-redux"

function BuyNow({ refresh, setRefresh, productDetail }) {
    const matches = useMediaQuery('(max-width:800px)')
    var product = productDetail
    const dispatch = useDispatch()

    var product = productDetail
    var cart = useSelector(state => state.mycart)
    var keys = Object.keys(cart)

    if (keys.length == 0) {
        product['qty'] = 0
    }
    else {
        if (keys.includes(product.productdetailsid + '')) {
            product = cart[product.productdetailsid + '']
        }
        else {
            product['qty'] = 0
        }
    }

    const handleQtyChange = (value) => {
        if (value <= 0) {
            dispatch({ type: "REMOVE_PRODUCT", payload: [product.productdetailsid, product] })
            setRefresh(!refresh)
        }
        else {
            product['qty'] = value
            dispatch({ type: 'ADD_PRODUCT', payload: [product.productdetailsid, product] })
            setRefresh(!refresh)
        }
    }

    return (
        <div style={{ width: '100%', height: matches ? '' : '10vh', color: 'white', background: '#191919', display: 'flex', alignItems: 'center', boxShadow: '0 6px 20px 0 gray' }}>
            {matches ? <></>
                : <div style={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5%' }}>
                    <img src={`${serverURL}/images/${productDetail.picture.split(",").shift()}`} height="50%" width="50%" alt="buynow product"></img>
                </div>
            }

            {matches ? <></>
                : <div style={{ width: '40%' }}>
                    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '100%', fontSize: '14px' }}>{productDetail.productname} {productDetail.modelnumber}</div>
                    <div>&#8377;{productDetail.offerprice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
                </div>}

            {matches ? <></>
                :
                <div style={{ width: '45%' }}><PlusMinusComponent value={product.qty} onChange={handleQtyChange} screen="BuyNow" /></div>
            }

            {matches ?
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '50%' }}><Button style={{ textTransform: 'none', background: '#12daa8', color: "#191919", fontWeight: 'bolder', fontSize: '14px', height: '10vh' }} fullWidth>Buy Now</Button></div>
                    <div style={{ width: '50%' }}><Button style={{ textTransform: 'none', background: '#353535', color: '#fff', height: '10vh', fontSize: '14px', fontWeight: 'bold' }} fullWidth>Add to Cart</Button></div>
                </div>
                : <></>}
        </div>
    )
}

export default BuyNow