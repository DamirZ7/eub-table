import React, { forwardRef } from 'react'
import { TextField } from '@mui/material'

const InputTest = forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      variant='outlined'
      fullWidth={true}
      margin='normal'
      InputLabelProps={{
        shrink: props.value ? true : false,
      }}
      sx={{
        '.MuiInputBase-root': {
          font: 'inherit',
          borderRadius: '6px',
          background: 'white',
        },
        // '.MuiInputLabel-root': {
        //   fontSize: '1rem',
        // },
        // '.MuiOutlinedInput-root': {
        //   '& fieldset': {},
        //   '&:hover fieldset': {
        //     borderWidth: '2px',
        //   },
        //   '&.Mui-focused fieldset': {
        //     borderColor: 'black',
        //     borderWidth: '2px',
        //   },
        // },
        // '& label.Mui-focused': {
        //   color: 'black',
        // },
      }}

      // sx={{
      //   '.MuiInputBase-root': {
      //     font: 'inherit',
      //     borderRadius: '5px',
      //     // boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
      //   },
      //   '.MuiInputLabel-root': {
      //     // lineHeight: '1rem',
      //     fontSize: '1.1rem',
      //   },
      //   '.MuiOutlinedInput-root': {
      //     '& fieldset': {
      //       borderColor: '#1D3F88',
      //     },
      //     '&:hover fieldset': {
      //       borderWidth: '2px',
      //       borderColor: '#1D3F88',
      //     },
      //     '&.Mui-focused fieldset': {
      //       borderColor: '#1D3F88',
      //       borderWidth: '2px',
      //     },
      //   },
      //   '& label.Mui-focused': {
      //     color: '#1D3F88',
      //   },
      // }}
    />
  )
})

export default InputTest
