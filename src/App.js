import React, { createContext } from 'react'
import Table from './components/Table'
import Header from './components/Header'

// export const SearchContext = createContext('')

const App = () => {
  return (
    <div className='mx-auto px-8'>
      {/* <SearchContext.Provider> */}
      <div className=' w-full p-2'>
        <Header />
        <Table />
      </div>
      {/* </SearchContext.Provider> */}
    </div>
  )
}

export default App
