import React from 'react'

const Input = (props) => {
  return (
    <div className='relative w-1/6'>
      <input
        className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 mb-2.5 mr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 shadow-md'
        type='text'
        {...props}
      />
      {props.value ? (
        <svg
          className='absolute w-5 h-5 opacity-30 right-2 top-3 hover:opacity-80 cursor-pointer'
          data-name='Capa 1'
          id='Capa_1'
          viewBox='0 0 20 19.84'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z' />
        </svg>
      ) : (
        ''
      )}
    </div>
  )
}

export default Input
