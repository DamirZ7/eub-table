import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const CreateEditRecord = ({ id, active, setActive }) => {
  const isAddMode = !id

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    return isAddMode ? createRecord(data) : updateRecord(id, data)
  }

  const createRecord = async (data) => {
    await fetch('https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res)
      alert(res['statusText'])
      if (res['status'] === 201) {
        window.location.href = '/'
      }
    })
    setActive(!active)
  }

  const updateRecord = async (id, data) => {
    await fetch(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      alert(res['statusText'])
      if (res['status'] === 200) {
        window.location.href = '/'
      }
    })

    setActive(!active)
  }

  useEffect(() => {
    if (!isAddMode) {
      axios
        .get(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${id}`)
        .then((record) => {
          const fields = ['RFCNumber', 'RFCLink', 'Description', 'ResultDescription', 'Status']
          fields.forEach((field) => setValue(field, record.data[field]))
        })
    }
  }, [])

  return (
    <div className='flex justify-between flex-col items-center'>
      <span className='font-bold text-lg'>{isAddMode ? 'Добавить запись' : 'Изменить запись'}</span>
      <form
        id='submitForm'
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col m-2 p-2 w-full mx-auto'
        onReset={reset}
        // method='POST'
      >
        <div>
          <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
            RFCNumber
          </label>
          <input
            {...register('RFCNumber')}
            className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-indigo-500 focus:ring'
          />
        </div>
        <div>
          <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
            RFCLink
          </label>
          <input
            {...register('RFCLink')}
            className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-indigo-500 focus:ring'
          />
        </div>
        <div>
          <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
            Description
          </label>
          <input
            {...register('Description')}
            className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-indigo-500 focus:ring'
          />
        </div>
        <div>
          <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
            ResultDescription
          </label>
          <input
            {...register('ResultDescription')}
            className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-indigo-500 focus:ring'
          />
        </div>
        <div>
          <label htmlFor='id' className='text-md block mb-3 mt-2 font-semibold'>
            Status
          </label>
          <input
            {...register('Status')}
            className='block box-border w-full p-2.5 mb-2.5 text-base border border-slate-100 rounded-xl bg-white shadow-md outline-none form-input ring-indigo-500 focus:ring'
          />
        </div>
        <input
          type='submit'
          className='bg-indigo-500 text-white rounded-lg px-8 py-2 mt-5 text-base font-medium hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-300'
          // onClick={() => setActive(!active)}
          value={isAddMode ? 'Создать' : 'Изменить'}
        />
      </form>
    </div>
  )
}

export default CreateEditRecord
