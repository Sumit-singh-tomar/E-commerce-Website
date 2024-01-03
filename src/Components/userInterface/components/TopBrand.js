import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";

function TopBrand({data}) {
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:400px)')

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: matches ? 4.5 : 8,
        slidesToScroll: 6,
        focusOnSelect: true,
        arrows: matches ? false : true,
        rows: matches ? 2 : 1
    }

    function showSlider() {
        return data.map((item) => {
            return (
                <div style={{ width: '100%' }}>
                    <img src={`${serverURL}/images/${item.image}`} width='100%' height='100%' alt="category"></img>
                </div>
            )
        })
    }
    return (
        <div style={{ width: matches ? '95%' : '80%' }}>
              <div style={{ color: 'white', marginBottom: '15px',  fontSize: matches_sm?'4.5vw':matches ? '3.5vw' : '2vw', fontWeight: 450, marginLeft: '1%' }}>
                Top Brands
            </div>
        
            <Slider {...settings}>
                {showSlider()}
            </Slider>
        </div>
    )
}

export default TopBrand