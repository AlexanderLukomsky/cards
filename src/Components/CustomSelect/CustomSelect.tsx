import { FormControl, MenuItem, Select } from '@mui/material'
export const CustomSelect = ({ pageCount, onChange, ...props }: PropsType) => {
    return (
        <>
            <FormControl variant='outlined' size='small'>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageCount}
                    label="Age"
                    onChange={(e) => { onChange(+e.target.value) }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}
type PropsType = {
    pageCount: number,
    onChange: (pageCount: number) => void
}