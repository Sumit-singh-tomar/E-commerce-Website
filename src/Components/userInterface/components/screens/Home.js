import Ads from "../Ads";
import CircleComponent from "../CircleComponent";
import FestiveDealComponent from "../FestiveDealComponent";
import Header from "../Header";
import Highlights from "../Highlights";
import MainSlider from "../MainSlider";
import ProductComponet from "../ProductComponent";
import { useStyles } from "./ProjectCss";
import { getData, postData } from "../../../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import TopBrand from "../TopBrand";
import MenuComponent from "../MenuCompoenent";
import { useMediaQuery } from "@mui/material";

export default function Home() {
    const classes = useStyles()
    const [banners, setBanners] = useState([])
    const [categories, setCategories] = useState([])
    const [productDeals, setProductDeals] = useState([])
    const [topBrands, setTopBrands] = useState([])
    const matches = useMediaQuery('(max-width:800px)')


    const fetchBanners = async () => {
        var result = await getData('userinterface/fetch_all_banner')
        setBanners(result.data[0].files.split(","))
    }

    const fetchCategory = async () => {
        var result = await getData('userinterface/display_all_category')
        setCategories(result.data)

    }

    const fetchDeals = async () => {
        var result = await postData('userinterface/display_all_productdetails', { status: 'Deal of the Day' })
        setProductDeals(result.data)
    }

    const fetchTopBrands= async ()=>{
        var result =await getData('userinterface/display_all_topbrands')
        setTopBrands(result.data)
    }
    useEffect(
        function () {
            fetchBanners()
            fetchCategory()
            fetchDeals()
            fetchTopBrands()
        }, [])

    return (
        <div className={classes.home_root}>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
                {matches?<></>:<MenuComponent />}
            </div>

            <div style={{ width: '100%' }}>
                <MainSlider banners={banners} />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <Ads />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                <CircleComponent categories={categories} />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1%' }}>
                <FestiveDealComponent />
            </div>


            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
                <ProductComponet data={productDeals} title={'Deals of the Day'} />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
                <Highlights />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
                <TopBrand data={topBrands}/>
            </div>
        </div>
    )
}