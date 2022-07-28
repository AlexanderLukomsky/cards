import { FormControl, MenuItem, Select } from '@mui/material'
export const CustomSelect = ({ value, onChange, items, ...props }: PropsType) => (
    <FormControl variant='outlined' size='small'>
        <Select value={value} label="Age" onChange={(e) => { onChange(+e.target.value) }}>
            {items.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
        </Select>
    </FormControl>
)
type PropsType = {
    items: number[]
    value: number,
    onChange: (value: number) => void
}