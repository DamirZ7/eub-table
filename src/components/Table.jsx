import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import '../index.css'

import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios'
import { Reorder } from 'framer-motion'
import Modal from './Modal'
import Select from './Select'
import Input from './Input'
import usePagination from '../hooks/usePagination'
import CreateEditRecord from './CreateEditRecord'

const Table = () => {
  const [eubData, setEubData] = useState([])
  const [modalEditActive, setModalEditActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({ contentPerPage: 10, count: eubData.length })

  const [idData, setIdData] = useState('')

  useEffect(() => {
    axiosData()
  }, [searchQuery])

  const axiosData = async () => {
    const search = searchQuery ? `&search=${searchQuery}` : ''

    const data = await axios
      .get(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items?${search}`)
      .then((response) => response.data)

    setEubData(data)
  }

  const dataDelete = async (id) => {
    await axios
      .delete(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${id}`)
      .then((data) => {
        console.log(data)
        data.status === 200 ? alert('Данные удалены') : alert(data.statusText)
      })
    axiosData()
    // setEubData(eubData.filter((line) => line.ID !== id))
  }

  const sortedList = useMemo(() => {
    if (selectedSort) {
      return [...eubData].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return eubData
  }, [selectedSort, eubData])

  const sortList = (sort) => {
    setSelectedSort(sort)
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col justify-start w-full'>
          <button
            className='w-1/6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg px-8 py-2 mb-2.5 shadow-md text-base font-medium  focus:outline-none focus:ring-2 focus:ring-purple-300'
            onClick={() => setModalActive(!modalActive)}>
            Создать
          </button>

          <Input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Поиск...'
          />
          <Select
            value={selectedSort}
            onChange={sortList}
            defaultValue='Сортировка'
            options={[
              { value: 'RFCNumber', name: 'По RFC номеру' },
              { value: 'CreatedAt', name: 'По дате' },
              { value: 'ResultDescription', name: 'По описанию' },
            ]}
          />
        </div>
        <div className='flex flex-row justify-end w-1/6'>
          <span className='font-medium text-xl'>
            Всего записей: <b>{eubData.length}</b>
          </span>
        </div>
      </div>
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
          {/* <Reorder.Group values={eubData} onReorder={setEubData}> */}
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-md font-semibold text-gray-700 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  RFCNumber
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  RFCLink
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  Description
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  ResultDescription
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  CreatedAt
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  Edit
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedList.slice(firstContentIndex, lastContentIndex).map((obj, i) => (
                // <Reorder.Item as='tr' key={obj.ID} value={obj.ID}>
                <tr key={i}>
                  <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex'>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>{obj.ID}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{obj.RFCNumber}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{obj.RFCLink}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{obj.Description}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{obj.ResultDescription}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    {obj.Status ? (
                      <span className='w-3 h-3 bg-emerald-500 rounded-full inline-block'></span>
                    ) : (
                      <span className='w-3 h-3 bg-red-500 rounded-full inline-block'></span>
                    )}
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                      <span
                        aria-hidden
                        className='absolute inset-0 bg-violet-200 opacity-50 rounded-full'></span>
                      <span className='relative'>{obj.CreatedAt}</span>
                    </span>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                      onClick={() => {
                        setIdData(obj.ID)
                        setModalEditActive(!modalEditActive)
                      }}>
                      <AiFillEdit />
                    </button>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button onClick={() => dataDelete(obj.ID)}>
                      <AiFillCloseCircle />
                    </button>
                  </td>
                </tr>
                // </Reorder.Item>
              ))}
            </tbody>
          </table>
          {/* </Reorder.Group> */}
        </div>
        <div className='flex items-center justify-center gap-4 my-6'>
          <p className='opacity-0.6 text-xl'>
            {page}/{totalPages}
          </p>
          {totalPages === 1 ? (
            <>
              <button onClick={() => setPage(1)} className={`page ${page === 1 && 'disabled'}`}>
                1
              </button>
            </>
          ) : (
            <>
              <button onClick={prevPage} className={`page ${page === 1 && 'disabled'}`}>
                &larr;
              </button>
              <button onClick={() => setPage(1)} className={`page ${page === 1 && 'disabled'}`}>
                1
              </button>
              {gaps.before ? '...' : null}
              {gaps.paginationGroup.map((el) => (
                <button
                  onClick={() => setPage(el)}
                  key={el}
                  className={`page ${page === el ? 'active' : ''}`}>
                  {el}
                </button>
              ))}
              {gaps.after ? '...' : null}
              <button
                onClick={() => setPage(totalPages)}
                className={`page ${page === totalPages && 'disabled'}`}>
                {totalPages}
              </button>
              <button onClick={nextPage} className={`page ${page === totalPages && 'disabled'}`}>
                &rarr;
              </button>
            </>
          )}
        </div>
        {modalActive && (
          <Modal active={modalActive} setActive={setModalActive}>
            <CreateEditRecord active={modalActive} setActive={setModalActive} />
          </Modal>
        )}
        {modalEditActive && (
          <Modal active={modalEditActive} setActive={setModalEditActive}>
            <CreateEditRecord id={idData} active={modalEditActive} setActive={setModalEditActive} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default Table
