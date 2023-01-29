// import React from 'react'
import { Modal } from '@mui/material'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'hidden',
  width: 550,
  borderRadius: '1.875rem',
  boxShadow: 24,
  p: 3,
  backgroundColor: 'white',
}

const ModalWindow = ({ active, setActive, children }) => {
  const onClick = () => {
    setActive(false)
  }

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      onClose={onClick}
      open={active}
      closeAfterTransition
      keepMounted
      // sx={{ backdropFilter: 'blur(2px)' }}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}

export default ModalWindow
