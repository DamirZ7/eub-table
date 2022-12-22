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
        '& textarea': {
          resize: 'both',
        },
      }}
    />
  )
})

export default InputTest
