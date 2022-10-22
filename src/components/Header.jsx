const Header = () => {
  return (
    <>
      <div className='py-2'>
        <h2 className='text-2xl font-semibold leading-tight'>Eurasian Bank table</h2>
      </div>
      <div className='py-3'>
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          className='bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg px-8 py-2 shadow-lg text-base font-medium  focus:outline-none focus:ring-2 focus:ring-purple-300'
          id='open-btn'
          onClick={() => setModalActive(!modalActive)}>
          Добавить запись
        </motion.button> */}
      </div>
      <hr className='m-6' />
    </>
  )
}

export default Header
