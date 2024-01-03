import StarIcon from '@mui/icons-material/Star';
import { Button, Divider, useMediaQuery } from '@mui/material';
import { postData, serverURL } from '../../../services/FetchNodeServices'
import { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser'
import PlusMinusComponent from './PlusMinusComponent';
import { useDispatch, useSelector } from 'react-redux';

function ProductDescription({ setDown, setRefresh, refresh, setProductDetail, productDetail }) {
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width:800px)')
    const [productData, setProductData] = useState([])
    const [color, setcolor] = useState(productDetail.color)
    const [productKeyFeature, setProductKeyFeature] = useState(productDetail.description)

    var product = productDetail
    var cart = useSelector(state => state.mycart)
    var keys = Object.keys(cart)

    const diveleRef = useRef(null);

    const listenToScroll = () => {
        const rect = diveleRef.current.getBoundingClientRect();
        if (rect.top <= 30) {
            setDown(true)
        }
        else {
            setDown(false)
        }
    }
    useEffect(() => {
        fetchproductDetail()
        const scrollableDiv = document.getElementById('scrolldiv');
        scrollableDiv.addEventListener('scroll', listenToScroll);
        return () => {
            scrollableDiv.removeEventListener('scroll', listenToScroll);
        };
    }, [])

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

    const fetchproductDetail = async () => {
        var result = await postData('userinterface/fetchproductDetails_by_product_id', { productid: productDetail.productid })
        setProductData(result.data)
    }

    const fetchProductOnColorChange = async (id) => {
        var result = await postData('userinterface/fetchProductOnColorChange', { productdetailsid: id })
        setProductDetail(result.data[0])
        setcolor(result.data[0].color)
    }


    const handleColorButtonClick = (id) => {
        fetchProductOnColorChange(id)
    }

    const showColor = () => {
        return productData.map((item) => {
            return <Button onClick={() => handleColorButtonClick(item.productdetailsid)} style={{ background: color === item.color ? '#000' : '#191919', color: '#fff', borderColor: color === item.color ? '#12daa8' : 'gray', fontSize: 12, padding: '8px 10px 8px', fontWeight: 'bold', textTransform: 'none' }} size='small' variant='outlined'>{item.color}</Button>
        })
    }

    const showKeyFeature = () => {
        var s = productKeyFeature
        s = s.split("<ul>")
        s.shift()
        s = s.toString()
        s = s.split("</ul>")
        s.pop()
        return s.map((item) => {
            return <div>{parse(item)}</div>
        })
    }

    const handleQtyChange = (value) => {
        if (value <= 0) {
            dispatch({ type:"REMOVE_PRODUCT", payload: [product.productdetailsid, product] })
            setRefresh(!refresh)
        }
        else {
            product['qty'] = value
            dispatch({ type: 'ADD_PRODUCT', payload: [product.productdetailsid, product] })
            setRefresh(!refresh)
        }
    }

    return (
        <div style={{ width: matches ? '95%' : '80%' }}>
            <div style={{ width: '100%', color: '#fff', fontWeight: 500, fontSize: '20px', marginTop: '20px' }}>
                {productDetail.productname} {productDetail.modelnumber}
            </div>

            <div style={{ width: '100%', marginTop: '2%' }}>
                <span style={{ borderRadius: '20px', color: '#088466', background: '#cffff3', padding: '6px 16px', fontWeight: 800, fontSize: '12px' }}>2000 off on payment otp page</span>
                <span style={{ borderRadius: '20px', color: '#088446', background: '#cffff3', padding: '6px 16px', fontWeight: 800, marginLeft: '10px', fontSize: '12px' }}>9 month cost EMI</span>
            </div>

            <div style={{ color: '#12daa8', marginTop: '2%', fontWeight: 400, fontSize: '14px' }}>
                4.5<StarIcon style={{ fontSize: '16px' }} />(<u>59 Rating & Reviews</u>)
            </div>

            <div style={{ width: '100%', color: 'white', fontSize: '25px', fontFamily: 'Switzer', fontWeight: 'bold', marginTop: '3%' }}>
                <div>&#8377;{productDetail.offerprice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
                <div style={{ fontSize: '12px' }}>(Incl. all Taxes)</div>
            </div>

            <div style={{ width: '100%', color: 'white', fontSize: '24px' }}>
                <span style={{ textDecoration: 'line-through', fontSize: '16px', color: "#9A9A9A" }}>MRP&#8377;{productDetail.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</span>
                <span style={{ fontSize: '16px', marginLeft: '1%', fontWeight: 500 }}>(Save &#8377;{productDetail.price - productDetail.offerprice}.00)</span>
            </div>


            <div style={{ width: '100%', color: 'white', fontSize: '12px', fontWeight: 'bold', marginTop: '3%' }}>
                Color
            </div>

            <div style={{ color: '#fff', fontSize: '12px', marginTop: '3%', display: 'flex', gap: '3%' }}>
                {showColor()}
            </div>


            <div style={{ width: '100%', color: '#fff', fontSize: '12px', marginTop: '3%' }} ref={diveleRef}>
                <PlusMinusComponent value={product.qty} onChange={handleQtyChange} screen="product" />
            </div>

            <div style={{ width: '100%', color: 'white', fontSize: '16px', fontWeight: 'bold', marginTop: '3%' }}>
                <div>Super Saving (2 OFFERS)</div>
                <Divider style={{ marginTop: '4px', border: '1px solid white' }} />
                <div style={{ marginTop: '10px' }}><img src={`${serverURL}/images/offer.webp`} height="100%" width="100%" alt='offerimage' /></div>
                <div style={{ color: 'white', fontSize: '14px', borderRadius: '10px', fontWeight: 'bold', marginTop: '3%', border: '2px solid #353535', padding: '20px 0px 5px 16px' }}>
                    <div style={{ fontWeight: 'bold' }}>Key Features</div>
                    <div style={{ marginTop: '3%' }}>
                        {showKeyFeature()}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ProductDescription