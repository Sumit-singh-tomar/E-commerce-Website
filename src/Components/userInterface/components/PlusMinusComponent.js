import { Button, Fab } from "@mui/material"
import { useEffect, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function PlusMinusComponent(props) {
    const [count, setCount] = useState(0)

    useEffect(function () {
        setCount(props.value)
    }, [props])

    const handleAdd = () => {
        var c = count + 1
        setCount(c)
        props.onChange(c)
    }

    const handleMinus = () => {
        var c = count - 1
        if (c >= 0) {
            setCount(c)
        }
        props.onChange(c)
    }

    return (
        <div style={{ width: '100%' }}>
            {count == 0 ?
                <div style={{ width: '100%' }}>
                    <Button style={{ color: '#191919', borderColor: '#353535', background: '#12daa8', borderRadius: 10, fontWeight: 'bold', padding: '6px 40px 6px 40px', textTransform: 'none' }} variant="outlined">Buy Now</Button>
                    <Button onClick={handleAdd} style={{ color: '#fff', borderRadius: 10, marginLeft: '3%', background: '#353535', borderColor: '#fff', padding: '5px 35px', textTransform: 'none', fontWeight: 'bold' }} variant="outlined">Add to Cart</Button>
                </div>
                :
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Fab onClick={handleMinus} style={{ background:props.screen=='cart'?'#12daa8':'#353535', color:props.screen=='cart'? '#fff':'#12daa8', zIndex: 0 }} size="small">
                        <RemoveIcon />
                    </Fab>
                    <span style={{ fontSize: 18 }}>{count}</span>
                    <Fab onClick={handleAdd} style={{ background: props.screen=='cart'?'#12daa8':'#353535', color: props.screen=='cart'? '#fff':'#12daa8', zIndex: 0 }} size="small">
                        <AddIcon />
                    </Fab>
                    {props.screen=='cart'?<></>:<Button style={{ color: '#fff', borderRadius: 10, marginLeft: '3%', background: '#353535', borderColor: '#fff', padding: '5px 35px', textTransform: 'none', fontWeight: 'bold' }} variant="outlined">Continue Shoping</Button>}
                </div>
            }
        </div>
    )
}

export default PlusMinusComponent