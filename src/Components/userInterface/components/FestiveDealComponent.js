import Slider from 'react-slick';
import { serverURL } from '../../../services/FetchNodeServices';
import { useMediaQuery } from '@mui/material';

function FestiveDealComponent(){
    const matches=useMediaQuery('(max-width:800px)')
    const matches_sm=useMediaQuery('(max-width:400px)')

    var settings={
        dots:false,
        infinite:false,
        slidesToShow:matches?2.5:4,
        slidesToScroll:3,
        focusOnSelect:true,
        arrows:matches?false:true
    }

    var data=["f1.webp","f2.webp","f3.webp","f4.webp","f5.webp","f6.webp","f7.webp","f8.webp","f9.webp","f10.webp"]

    function showSlider()
    {
        return data.map((item)=>{
            return <div style={{width:'100%'}}>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                <img src={`${serverURL}/images/${item}`} height="95%" width="95%"></img>
                </div>
            </div>
        })
    }

    return(
    <div style={{width:matches?'95%':'80%'}}>
        <div style={{color:'white',marginBottom:'15px', fontSize: matches_sm?'4.5vw':matches ? '3.5vw' : '2vw',fontWeight:450,marginLeft:'1%'}}>
            Festive Fiesta Deals
        </div>
        <Slider {...settings}>
            {showSlider()}
        </Slider>
    </div>)
}

export default FestiveDealComponent