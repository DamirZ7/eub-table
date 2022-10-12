import React from 'react'

const Modal = ({ active, setActive, children }) => {
  const onClick = () => {
    setActive(false)
  }

  return (
    <div
      className={
        active
          ? 'h-screen w-screen bg-black/[0.4] fixed top-0 left-0 flex items-center justify-center scale-1'
          : 'h-screen w-screen bg-black/[0.4] fixed top-0 left-0 flex items-center justify-center scale-0'
      }
      onClick={onClick}>
      <div className='p-5 rounded-xl bg-white w-1/3' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
