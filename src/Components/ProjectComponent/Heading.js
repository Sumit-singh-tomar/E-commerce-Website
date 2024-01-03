import list from '../../assets/list.png';
import { useNavigate } from 'react-router-dom';

function Heading(props) {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <img src={props.image} width="30" alt={props.caption}/>
            </div>
            <div style={{ fontFamily: 'consolas',fontSize: 22, marginLeft:5 }}>
                {props.caption}
            </div>
            <div style={{ marginLeft: 'auto' }}>
                <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => navigate(props.link)}>
                    <img src={list} width="35" alt={props.caption}/>
                </div>
            </div>
        </div>
    )
}

export default Heading