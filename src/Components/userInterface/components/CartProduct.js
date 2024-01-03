import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { serverURL } from '../../../services/FetchNodeServices';
import { Divider, Rating } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PlusMinusComponent from './PlusMinusComponent';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    truncate: {
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
        '-moz-box-orient': 'vertical',
        '-ms-flex-direction': 'column',
        'flex-direction': 'column',
    }
});
function CartProduct({ productCart, refresh, setRefresh, screen }) {
    const matches = useMediaQuery('(max-width:1050px)')
    const matches_sm = useMediaQuery('(max-width:800px)')
    const classes = useStyles()
    const dispatch = useDispatch()

    var data = productCart

    const handleQtyChange = (product, value) => {
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


    const showAllCartProducts = () => {
        return data.map((item) => {
            return (
                <div style={{ width: matches ? '100%' : '98%', background: '#fff', marginTop: screen=='shipping'?'0%':'5%', display: 'flex', padding: '30px 0px' }}>
                    <div style={{ width: matches_sm ? '40%' : '20%', display: 'flex', justifyContent: 'center' }}>
                        <img src={`${serverURL}/images/${item.picture.split(",").shift()}`} width="85%" height="85%" />
                    </div>
                    <div style={{ width: '60%' }}>
                        <div style={{ fontSize: '18px', fontWeight: 500 }} className={classes.truncate} >{item.productname} {item.modelnumber}</div>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}><Rating value='3' readOnly size='small' /></div>

                        {matches_sm ?
                            <>
                                <div style={{ fontSize: '22px', fontWeight: 'bold' }}>&#8377;{(item.offerprice * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
                                <div style={{ fontSize: '15px', marginTop: '2%', color: '#353535' }}>(Incl. all Taxes)</div>
                                <div style={{ fontSize: '14px', textDecoration: 'line-through', marginTop: '5%' }}>MRP &#8377;{(item.price * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
                                <div style={{ fontSize: '14px', color: '#353535', marginBottom: '5%' }}>(Save &#8377;{((item.price - item.offerprice) * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</div>
                            </>
                            : <></>}
                        {/* <Button variant='outlined' style={{ color: '#1D1D1D', borderColor: '#1D1D1D', borderRadius: '10px', textTransform: 'none', padding: "8px 35px 5px", fontWeight: 'bold', fontSize: 12 }}>Move to Wishlist</Button> */}
                        {screen=='shipping'?<></>:<PlusMinusComponent value={item?.qty} onChange={(value) => handleQtyChange(item, value)} screen="cart" />}
                    </div>

                    {matches_sm ? <></> : <div style={{ width: '18%', paddingRight: '2%' }}>
                        <div style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'right' }}>&#8377;{(item.offerprice * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
                        <div style={{ fontSize: '15px', textAlign: 'right', marginTop: '2%', color: '#353535' }}>(Incl. all Taxes)</div>
                        <Divider style={{ background: '#000', marginTop: '5%' }} />
                        <div style={{ fontSize: '14px', textAlign: 'right', textDecoration: 'line-through', marginTop: '5%' }}>MRP &#8377;{(item.price * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        <div style={{ fontSize: '14px', color: '#353535', textAlign: 'right', marginBottom: '5%' }}>(Save &#8377;{((item.price - item.offerprice) * item.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00)</div>
                        <Divider style={{ background: '#000' }} />
                    </div>}
                </div>)
        })
    }
    return (
        <div style={{ width: matches ? '95%' :screen=='shipping'?'100%':'90%' }}>
            {screen == 'shipping' ? <></> :
                <> <div style={{ width: '100%', fontSize: '20px', fontWeight: 'bold', marginTop: '5%' }}>YOUR CART</div>
                    <div style={{ width: matches ? '91%' : '89%', display: 'flex', background: '#fff', padding: '25px 4.5%', marginTop: '5%' }}>
                        <div style={{ borderRadius: '50%', border: '2px solid #000', height: '23px', width: '23px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14 }}>%</div>
                        <div style={{ fontWeight: 'bold', marginLeft: '10px', fontSize: '20px' }}>Apply Coupon</div>
                        <div style={{ marginLeft: 'auto' }}><NavigateNextIcon /></div>
                    </div>
                </>
            }

            {showAllCartProducts()}
        </div>
    )
}

export default CartProduct