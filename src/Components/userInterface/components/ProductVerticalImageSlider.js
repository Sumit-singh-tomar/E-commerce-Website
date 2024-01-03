import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeServices";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Checkbox, useMediaQuery } from "@mui/material";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    carouselDots: {
        '& .slick-dots li.slick-active button:before': {
            color: '#fff',
            opacity: 1
        },
        '& .slick-dots li button::before': {
            fontSize: '7px',
            color: '#fff',
            opacity: 0.4
        },
        '& .slick-dots li': {
            margin: '2% -2px'
        }
    }
});

function ProductVerticalImageSlider({ productDetail }) {
    const matches = useMediaQuery('(max-width:800px)')
    const [imgBorder,setImgBorder]=useState(0)
    const [mainImg,setMainImg]=useState('')
    const classes = useStyles()

    useEffect(function(){
        setMainImg(productDetail?.picture.split(",").shift())
        setImgBorder(0)
    },[productDetail])

    var settings = {
        dots: matches ? true : false,
        infinite: true,
        speed: 500,
        slidesToShow: matches ? 1 : 4,
        slidesToScroll: 1,
        focusOnSelect: false,
        arrows: matches ? false : true,
    }

    var data=productDetail?.picture.split(',')

    const handleVerticalImageClick=(item)=>{
        setMainImg(item)
    }

    const showSlider = () => {
        return data.map((item,index) => {
            return (<div style={{ width: '100%' }}>
                <div onClick={()=>handleVerticalImageClick(item)} onMouseEnter={()=>setImgBorder(index)} onMouseLeave={()=>setImgBorder(index)} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src={`${serverURL}/images/${item}`} style={{ borderRadius: '5px', border:matches ? '' :imgBorder===index?'2px solid #12daa8':'0.5px solid #9A9A9A', transform: matches ? '' : 'rotate(-90deg)' }} width="90%" height="90%" alt="verticalimg"></img>
                </div>
            </div >)
        })
    }


    return (
        <div style={{ width: matches ? '95%' : '100%', display: 'flex', flexDirection: matches ? 'column' : 'row', position: matches ? 'none' : 'sticky', top: 65 }}>

            <div style={{ width: matches ? '100%' : '60%', transform: matches ? 'rotate(0deg)' : 'rotate(90deg)', marginLeft: matches ? '' : 'auto', marginRight: matches ? '' : '5%', marginTop: matches ? '' : '5%' }}>

                {matches ? <div style={{ width: '100%', display: 'flex', marginTop: '3%' }}>
                    <div style={{ marginLeft: 'auto' }}><Checkbox style={{ color: '#fff' }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></div>
                    <div><ShareOutlinedIcon style={{ color: '#fff', marginLeft: '10px', marginTop: '10px' }} /></div>
                </div> : <></>
                }

                {matches ?
                    <></>
                    : <div style={{ transform: matches ? 'none' : 'rotate(-90deg)', width: '100%', display: 'flex', justifyContent: 'right' }}>
                        <img src={`${serverURL}/images/${mainImg}`} width="80%" height="80%" alt="mainimg"/>
                    </div>
                }

                <div style={{ width: '100%', display: matches ? 'flex' : '', justifyContent: matches ? 'center' : '' }}>
                    <Slider {...settings} className={classes.carouselDots} style={{ width: matches ? '50%' : '100%' }}>
                        {showSlider()}
                    </Slider>
                </div>
            </div>

            {matches ? <></> : <div style={{ width: '15%', display: 'flex', marginTop: '3%' }}>
                <div><Checkbox style={{ color: '#fff' }} icon={<FavoriteBorder style={{ fontSize: '2vw' }} />} checkedIcon={<Favorite style={{ fontSize: '2vw' }} />} /></div>
                <div><ShareOutlinedIcon style={{ color: '#fff', marginLeft: '10px', marginTop: '10px', fontSize: '2vw' }} /></div>
            </div>
            }
        </div>
    )
}

export default ProductVerticalImageSlider