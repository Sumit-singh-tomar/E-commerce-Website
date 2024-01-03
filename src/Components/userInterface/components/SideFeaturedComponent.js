import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

function SideFeaturedComponent() {
    return (
        <div style={{ width: '100%', background: 'violet' }}>
            <FormControl fullWidth>
                <InputLabel>Age</InputLabel>
                <Select
                    value={10}
                    label="Age"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SideFeaturedComponent