import Slider from 'react-slick'
import { serverURL } from '../../../services/FetchNodeServices'
import { Card, CardContent, Checkbox, Rating, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {useNavigate }from 'react-router-dom'


const useStyles = makeStyles({
    truncate: {
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
        '-moz-box-orient': 'vertical',
        '-ms-flex-direction': 'column',
        'flex-direction': 'column',
    }
});

function ProductComponet({data,title}) {
    const matches = useMediaQuery('(max-width:800px)')
    const matches_sm = useMediaQuery('(max-width:400px)');
    const navigate=useNavigate()

    const Classes = useStyles()
    var settings = {
        dots: false,
        slidesToShow: matches_sm ? 1.5 : matches ? 3.2 : 4,
        slidesToScroll: 1,
        infinite: false,
        arrows: matches ? false : true,
        focusOnSelect: true
    }

    const handleClick=(item)=>{
        navigate('/productpurchase',{state:{product:item}})
    }

    function showSlider() {
        return data.map((item) => {
            return (
                <div style={{ width: '100%' }}>
                    <div onClick={()=>handleClick(item)} style={{ width: '100%',cursor:'pointer', display: 'flex', justifyContent: 'center' }}>
                        <Card style={{ background: "#121212", width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <Checkbox style={{ position: 'absolute', top: matches ? 2 : 10, right: 0, color: '#fff' }} icon={<FavoriteBorder style={{ fontSize: matches_sm ? '6vw' : matches ? '3vw' : '2vw' }} />} checkedIcon={<Favorite style={{ fontSize: matches_sm ? '6vw' : matches ? '3vw' : '2vw' }}/>} />
                            <CardContent style={{ paddingTop: '7%', width: '80%', display: 'flex', justifyContent: 'center' }}>
                                <img src={`${serverURL}/images/${item.picture.split(",").shift()}`} height="100%" width="100%" alt="proudctimg" ></img>
                            </CardContent>

                            <CardContent style={{ color: '#fff', padding: 0, width: '90%' }}>
                                <div className={Classes.truncate} style={{ fontSize: matches_sm ? '3.5vw' : matches ? '2vw' : '1.3vw', fontWeight: 500 }}>{item.productname} {item.modelnumber}</div>
                            </CardContent>
                            <CardContent style={{ padding: 5, width: '90%', display: 'flex', alignItems: 'baseline' }}>
                                <div style={{ color: '#fff', fontSize: matches_sm ? '3.5vw' : matches ? '2vw' : '1.3vw', fontWeight: 500 }}>&#8377;{item.offerprice}</div>
                                <div style={{ color: '#9A9A9A', textDecoration: 'line-through', fontSize: matches_sm ? '3vw' : matches ? '1.5vw' : '1vw', }}>&#8377;{item.price}</div>
                            </CardContent>
                            <CardContent style={{width:'90%',padding:0}}>
                                <Rating value={item.rating} readOnly style={{fontSize:matches_sm?'4vw':matches?'3vw':'1.3vw'}}/>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ width: matches ? '95%' : '80%' }}>
            <div style={{ color: 'white', marginBottom: '15px',  fontSize: matches_sm?'4.5vw':matches ? '3.5vw' : '2vw', fontWeight: 450, marginLeft: '1%' }}>
                {title}
            </div>
            <Slider {...settings}>
                {showSlider()}
            </Slider>
        </div>
    )
}

export default ProductComponet