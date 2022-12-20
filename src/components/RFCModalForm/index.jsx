import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import { Checkbox, Typography } from '@mui/material'
import InputTest from '../UI/InputTest'
import PrimaryButton from '../UI/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import { pink } from '@mui/material/colors'
import styles from './ModalForm.module.scss'

const fields = ['RFCNumber', 'RFCLink', 'Description', 'ResultDescription', 'Status']

const ModalForm = ({ id, active, setActive }) => {
  const isAddMode = !id
  const [loader, setLoader] = useState(false)

  const {
    // register,
    handleSubmit,
    reset,
    setValue,
    control,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      RFCNumber: '',
      RFCLink: '',
      Description: '',
      ResultDescription: '',
      Status: false,
    },
  })

  const onSubmit = (data) => {
    return isAddMode ? createRecord(data) : updateRecord(id, data)
  }

  const createRecord = async (data) => {
    // setActive(!active)
    setLoader(true)
    await fetch('https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setLoader(false)
      setActive(!active)
      // alert(res['statusText'])
      if (res['status'] === 201) {
        window.location.href = '/'
      }
    })
    // setActive(!active)
  }

  const updateRecord = async (id, data) => {
    // setActive(!active)
    setLoader(true)
    await fetch(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setLoader(false)
      setActive(!active)
      // alert(res['statusText'])
      if (res['status'] === 200) {
        window.location.href = '/'
      }
    })

    // setActive(!active)
  }

  useEffect(() => {
    if (!isAddMode) {
      axios
        .get(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${id}`)
        .then((record) => {
          fields.forEach((field) => setValue(field, record.data[field]))
        })
    }
  })

  return (
    <div className={styles.root}>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        {isAddMode ? 'Создать запись' : 'Изменить запись'}
      </Typography>
      {loader ? (
        <ColorRing
          visible={true}
          height='80'
          width='80'
          ariaLabel='blocks-loading'
          wrapperStyle={{}}
          wrapperClass='blocks-wrapper'
          colors={['#5C00A3', '#5C00A3', '#7500D1', '#8F00FF', '#A32EFF']}
        />
      ) : (
        <form
          id='submitForm'
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form_wrapper}
          onReset={reset}
          // method='POST'
        >
          <div>
            <Controller
              name='RFCNumber'
              control={control}
              render={({ field }) => <InputTest {...field} label='RFC Number' name='RFCNumber' />}
            />
          </div>
          <div>
            <Controller
              name='RFCLink'
              control={control}
              render={({ field }) => <InputTest {...field} label='RFC Link' multiline />}
            />
          </div>
          <div>
            <Controller
              name='Description'
              control={control}
              render={({ field }) => <InputTest {...field} label='Description' multiline />}
            />
          </div>
          <div>
            <Controller
              name='ResultDescription'
              control={control}
              render={({ field }) => (
                <InputTest {...field} label='Result Description' multiline maxRows='15' />
              )}
            />
          </div>
          <div>
            <Controller
              name='Status'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  value='Status'
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      sx={{
                        color: pink[600],
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label='Status'
                />
              )}
            />
          </div>
          <PrimaryButton
            onClick={handleSubmit}
            sx={{
              width: '100%',
              padding: '0.5rem 2rem',
              marginTop: '1.25rem',
              marginBottom: '0.325rem',
              marginRight: '1.25rem',
              background: '#ff006d',
              borderRadius: '1.875rem',
              border: '.0625rem solid #e1e6ed',
              fontSize: '1rem',
              transition: 'border-radius 0.4s',
              ':hover': {
                borderRadius: '.4rem',
                background: '#ff006d',
              },
            }}>
            {isAddMode ? 'Создать' : 'Изменить'}
          </PrimaryButton>
        </form>
      )}
    </div>
  )
}

export default ModalForm
