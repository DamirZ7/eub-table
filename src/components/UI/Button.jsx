import { Button } from '@mui/material'

const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button type='submit' variant='contained' {...props}>
      {children}
    </Button>
  )
}

export default PrimaryButton
