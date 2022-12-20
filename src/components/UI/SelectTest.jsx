import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const SelectTest = ({ value, onChange, options, label, ...props }) => {
  return (
    <FormControl
      sx={{
        // width: '1/6',
        minWidth: 200,
        // padding: '0.5rem 2rem',
        // marginBottom: '0.625rem',
        // marginRight: '1.25rem',
        // background: 'white',
        '&.Mui-focused': {
          width: 320,
          boxShadow: `0 8px 16px 0 #919EAB`,
        },
        '& fieldset': {
          borderWidth: `1px !important`,
          borderColor: `'#919EAB' !important`,
        },
        // '.MuiSelectBase-root': {
        //   font: 'inherit',
        //   borderRadius: '6px',
        //   // boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
        // },
        // '.MuiInputLabel-root': {
        //   // lineHeight: '1rem',
        //   fontSize: '1rem',
        // },
        // '.MuiOutlinedInput-root': {
        //   '& fieldset': {
        //     // borderColor: '#430089',
        //   },
        //   '&:hover fieldset': {
        //     // borderWidth: '2px',
        //     // borderColor: '#430089',
        //   },
        //   '&.Mui-focused fieldset': {
        //     // borderColor: 'black',
        //     // borderWidth: '2px',
        //   },
        // },
        // '& label.Mui-focused': {
        //   // color: 'black',
        // },
      }}>
      <InputLabel id='select-test-small'>{label}</InputLabel>
      <Select
        labelId='simple-select-label'
        id='simple-select'
        value={value}
        label={label}
        {...props}
        onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ typography: 'body2' }}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectTest
