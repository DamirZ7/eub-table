import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios'
import { Reorder } from 'framer-motion'
import Modal from './Modal'
import Select from './Select'
import Input from './Input'

const Table = () => {
  const [eubData, setEubData] = useState([])
  const [modalEditActive, setModalEditActive] = useState(false)
  const [send, setSend] = useState(false)
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

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
    await axios.delete(
      `https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${id}`,
    )
    setEubData(eubData.filter((line) => line.ID !== id))
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    await fetch('https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSend(true)
      })
      .catch((err) => {
        console.error(err)
        setSend(false)
      })
  }

  // const valueData = eubData.map((option) => {
  //   return {
  //     value: option.RFCNumber,
  //     name: option.Description,
  //   }
  // }, {})

  // console.log(valueData)

  const sortList = (sort) => {
    setSelectedSort(sort)
    console.log(sort)
    setEubData([...eubData].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <>
      <div>
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
        <Input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Поиск...'
        />
      </div>
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
          {/* <Reorder.Group values={eubData} onReorder={setEubData}> */}
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  RFCNumber
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  RFCLink
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Description
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  ResultDescription
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  CreatedAt
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Ниже eub надо заменить на eubData*/}
              {eubData.map((obj, i) => (
                // <Reorder.Item as='tr' key={obj.ID} value={obj.ID}>
                <tr key={i}>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
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
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
                      <span className='relative'>{obj.CreatedAt}</span>
                    </span>
                  </td>
                  <td>
                    <button onClick={() => setModalEditActive(!modalEditActive)}>
                      <AiFillEdit />
                      <Modal active={modalEditActive} setActive={setModalEditActive}>
                        <form
                          id='submitForm'
                          onSubmit={handleSubmit(onSubmit)}
                          className='flex flex-col m-2 p-2 w-full mx-auto'
                          method='POST'>
                          <div>
                            <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
                              RFCNumber
                            </label>
                            <input
                              {...register('RFCNumber')}
                              className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-emerald-500 focus:ring'
                            />
                          </div>
                          <div>
                            <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
                              RFCLink
                            </label>
                            <input
                              {...register('RFCLink')}
                              className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-emerald-500 focus:ring'
                            />
                          </div>
                          <div>
                            <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
                              Description
                            </label>
                            <input
                              {...register('Description')}
                              className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-emerald-500 focus:ring'
                            />
                          </div>
                          <div>
                            <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
                              ResultDescription
                            </label>
                            <input
                              {...register('ResultDescription')}
                              className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-emerald-500 focus:ring'
                            />
                          </div>
                          <div>
                            <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
                              Status
                            </label>
                            <input
                              {...register('Status')}
                              className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-emerald-500 focus:ring'
                            />
                          </div>

                          <input
                            type='submit'
                            className='bg-green-500 text-white rounded-lg px-8 py-2 mt-5 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
                            onClick={() => setModalEditActive(!modalEditActive)}
                            value='Создать'
                          />
                        </form>
                      </Modal>
                    </button>
                  </td>
                  <td>
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
      </div>
    </>
  )
}

export default Table
