import React from 'react'

const Select = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className='w-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block mb-2.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 shadow-md mr-5'
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      <option disabled value=''>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Select
