import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { serverURL } from '../../../services/FetchNodeServices'
import { makeStyles } from "@mui/styles";

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

function MainSlider({banners}) {
    const classes = useStyles()

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        focusOnSelect: true,
    }

   
    const showSlider = () => {
        return banners.map((item) => {
            return (
                <div>
                    <img src={`${serverURL}/images/${item}`} alt="banner" height="100%" width="100%" />
                </div>
            )
        })
    }

    return (
        <div style={{ width: '100%' }}>
            <Slider {...settings} className={classes.carouselDots}>
                {showSlider()}
            </Slider>
        </div>
    )
}

export default MainSlider