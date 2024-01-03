import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeServices";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

function CircleComponent({categories}) {
    const matches=useMediaQuery('(max-width:800px)')
    const [zoom,setZoom]=useState(null)

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: matches?4.5:8,
        slidesToScroll: 6,
        focusOnSelect: true,
        arrows:matches?false:true,
        rows:matches?2:1
    }

    function showSlider() {
        return categories.map((item,i) => {
            return (
                <div>
                    <div onMouseEnter={()=>setZoom(i)} onMouseLeave={()=>setZoom(null)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width:'100%',height:'100%'}}>
                        <img src={`${serverURL}/images/${item.image}`} style={{width:matches?'100%':zoom==i?'95%':'100%'}} height='100%' alt="category"></img>
                        <div style={{ color: '#fff',textAlign:'center',width:'80%',fontSize:matches?'2vw':'1vw',height:'45px'}}>{item.categoryname}</div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div style={{ width: matches?'95%':'80%' }}>
            <Slider {...settings}>
                {showSlider()}
            </Slider>
        </div>
    )
}

export default CircleComponent