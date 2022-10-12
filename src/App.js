import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import Table from './components/Table'
import Modal from './components/Modal'

const App = () => {
  const [modalActive, setModalActive] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
        setSubmitted(true)
      })
      .catch((err) => {
        console.error(err)
        setSubmitted(false)
      })
  }

  return (
    <div className='container mx-auto px-4 sm:px-4'>
      <div className='py-8'>
        <div className='py-2'>
          <h2 className='text-2xl font-semibold leading-tight'>Eurasian Bank table</h2>
        </div>
        <div className='py-3'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
            id='open-btn'
            onClick={() => setModalActive(!modalActive)}>
            Добавить запись
          </motion.button>
        </div>
        <Table />
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className='flex justify-between flex-col items-center'>
          <span className='font-bold text-lg'>Добавить запись</span>
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
              onClick={() => setModalActive(!modalActive)}
              value='Создать'
            />
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default App
