import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import { notifySuccess } from '../RFCTable'
import LoadingButton from '@mui/lab/LoadingButton'

export default function AlertDialog({ active, setActive, id, axiosData }) {
  const [loader, setLoader] = useState(false)

  const dataDelete = async (arg) => {
    setLoader(true)
    await axios
      .delete(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${arg}`)
      .then((data) => {
        setLoader(false)
        setActive(!active)
        data.status === 200 ? notifySuccess('Запись успешно удалена!') : alert(data.statusText)
      })
    axiosData()
    // setEubData(eubData.filter((line) => line.ID !== id))
  }

  const handleClose = () => {
    setActive(!active)
  }

  return (
    <div>
      <Dialog
        open={active}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Удаление записи'}</DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          {
            <DialogContentText id='alert-dialog-description'>
              Удалить данную запись?
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <LoadingButton loading={loader} onClick={() => dataDelete(id)}>
            Да
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
