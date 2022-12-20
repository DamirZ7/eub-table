import * as React from 'react'
import { Modal } from '@mui/material'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  // bgcolor: 'background.paper',
  borderRadius: '1.875rem',
  boxShadow: 24,
  p: 3,
  // backgroundColor: '#f0f2f5',
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
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}>
      <Fade in={active}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
    // <div
    //   className={
    //     active
    //       ? 'h-screen w-screen bg-black/[0.3] fixed top-0 left-0 flex items-center justify-center scale-1 backdrop-blur-sm'
    //       : 'h-screen w-screen bg-black/[0.3] fixed top-0 left-0 flex items-center justify-center scale-0 backdrop-blur-sm'
    //   }
    //   onClick={onClick}>
    //   <div
    //     className='p-5 rounded-xl bg-white w-1/3 shadow-2xl'
    //     onClick={(e) => e.stopPropagation()}>
    //     {children}
    //   </div>
    // </div>
  )
}

export default ModalWindow
