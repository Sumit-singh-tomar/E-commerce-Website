import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from '../../../services/FetchNodeServices';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';

var useStyles = makeStyles({
    carouselDots: {
        '& .slick-prev': {
            backgroundColor: '#191919'
        },
        '& .slick-next:before': {
            color: '#fff'
        }
    }
})

function Ads() {
    const classes = useStyles()
    const matches=useMediaQuery('(max-width:800px)')
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows:matches?false:true
    }

    var data = ["offer.webp", "offer2.webp", "offer3.webp", "offer.webp"]

    function showSlider() {
        return data.map((item) => {
            return (
                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%'}}>
                    <img src={`${serverURL}/images/${item}`} style={{ width: '99%', height: '100%', marginLeft: '0.5%' }} alt="offer"></img>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ width: matches?'95%':'80%' }}>
            <Slider {...settings} className={classes.carouselDots}>
                {showSlider()}
            </Slider>
        </div>
    )
}

export default Ads