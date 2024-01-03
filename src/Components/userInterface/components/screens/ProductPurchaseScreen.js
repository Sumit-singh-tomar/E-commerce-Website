import ProductVerticalImageSlider from "../ProductVerticalImageSlider"
import { useStyles } from "./ProjectCss"
import Header from "../Header"
import ProductDescription from "../ProductDescription"
import BuyNow from "../BuyNow"
import { useMediaQuery } from "@mui/material"
import { useState } from "react"
import Specification from "../Specification"
import { useLocation } from "react-router-dom"

function ProductPurchaseScreen() {
    const classes = useStyles()
    const matches = useMediaQuery('(max-width:800px)')
    const location = useLocation()
    const [down, setDown] = useState(false)
    const [productDetail, setProductDetail] = useState(location.state.product)
    const [refresh, setRefresh] = useState(false)

    return (
        <div className={classes.ProductPurchaseScreen_Root} id="scrolldiv">
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
            </div>

            <div className={classes.ProductScreen_Main_Box} style={{ flexDirection: matches ? 'column' : 'row' }}>
                <div className={classes.ProductPurchaseScreen_Left_Box} style={{ width: matches ? '100%' : '50%' }}>
                    <div style={{ width: '100%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                        <ProductVerticalImageSlider productDetail={productDetail} />
                    </div>
                </div>

                <div className={classes.ProductPurchaseScreen_Right_Box} style={{ width: matches ? '100%' : '50%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                    <ProductDescription setDown={setDown} setRefresh={setRefresh} refresh={refresh} setProductDetail={setProductDetail} productDetail={productDetail} />
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                <Specification />
            </div>

            {down ? <div style={{ width: '100%', position: 'sticky', bottom: 0 }}>
                <BuyNow refresh={refresh} setRefresh={setRefresh} productDetail={productDetail} />
            </div> : <></>
            }

        </div>
    )
}

export default ProductPurchaseScreen

    // const listenToScroll = () => {
    //     const divElement = document.getElementById('scrolldiv');
    //     var scrollPosition = divElement.scrollTop;
    //     if (scrollPosition > 400) {
    //         setDown(true)
    //     }
    //     else {
    //         setDown(false)
    //     }
    // }

    // useEffect(() => {
    //     const scrollableDiv = document.getElementById('scrolldiv');
    //     scrollableDiv.addEventListener('scroll', listenToScroll);
    //     return () => {
    //         scrollableDiv.removeEventListener('scroll', listenToScroll);
    //     };
    // }, [])

