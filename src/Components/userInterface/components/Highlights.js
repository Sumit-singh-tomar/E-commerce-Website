import Slider from "react-slick"
import { serverURL } from "../../../services/FetchNodeServices"
import { useMediaQuery } from "@mui/material"


function Highlights() {
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:400px)')
    
    var settings = {
        dots: false,
        slidesToShow: matches?1.5:3,
        slidesToScroll: 1,
        infinite: false,
        arrows: matches?false:true,
        focusOnSelect: true
    }

    var data = ["h1.webp", "h3.webp", "h4.webp", "h5.webp", "h6.webp", "h7.webp", "h8.webp"]
    var data2 = ["h9.webp", "h10.webp", "h12.webp", "h13.webp", "h15.webp", "h16.webp"]

    function showSlider() {
        return data.map((item) => {
            return (
                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img src={`${serverURL}/images/${item}`} height='95%' width='95%' style={{ borderRadius: '10px' }}></img>
                    </div>
                </div>
            )
        })
    }

    function showSlider2() {
        return data2.map((item) => {
            return (
                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img src={`${serverURL}/images/${item}`} height='95%' width='95%' style={{ borderRadius: '10px' }}></img>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ width: matches?'95%':'80%' }}>

            <div style={{ color: 'white', marginTop: '15px',marginBottom: '15px', fontSize: matches_sm?'4.5vw':matches ? '3.5vw' : '2vw', fontWeight: 450, marginLeft: '1%' }}>
                Highlights
            </div>

            <Slider {...settings}>
                {showSlider()}
            </Slider>

            <Slider {...settings} style={{ marginTop: '1%' }}>
                {showSlider2()}
            </Slider>

        </div>
    )
}

export default Highlights