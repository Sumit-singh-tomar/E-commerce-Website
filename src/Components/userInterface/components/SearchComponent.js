import { TextField, InputAdornment,useMediaQuery } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

function SearchComponent() {
    const matches=useMediaQuery('(max-width:900px)')
    const matchesMedia=useMediaQuery('(max-width:800px)')

    return (
        <div style={{ width:matchesMedia?'100%':'35%', marginLeft:matchesMedia?'0':'10%' }}>
            <TextField
                sx={{
                    "& fieldset": { border: 'none' },"& input::placeholder": matches?{fontSize: 13}:{fontSize:15},
                }}
                style={{ background: 'white', borderRadius: 10 }}
                size="small"
                fullWidth
                placeholder="What are you looking for?"
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon style={{fontSize:matches?'18px':'24px'}}/></InputAdornment>
                }}
            >
            </TextField>
        </div>
    )
}

export default SearchComponent