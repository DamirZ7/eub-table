import React, { useState, useEffect, useMemo } from 'react'
import '../../index.scss'
import axios from 'axios'
import ModalWindow from '../Modal'
import RFCModalForm from '../RFCModalForm'
import PrimaryButton from '../UI/Button'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import { Typography } from '@mui/material'
import Iconify from '../UI/Iconify'
import Label from '../UI/label'
import useDebounce from '../../hooks/useDebounce'
import SortSearch from '../SortSearch'
import { Container } from '@mui/system'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const title = [
  'ID',
  'RFC Number',
  'RFC Link',
  'Description',
  'Result Description',
  'Status',
  'Created At',
  'Edit',
  'Delete',
]

const RFCTable = () => {
  dayjs.extend(calendar)
  const [eubData, setEubData] = useState([])
  const [modalEditActive, setModalEditActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loader, setLoader] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = React.useState(0)
  const [idData, setIdData] = useState('')
  const debSearchQuery = useDebounce(searchQuery, 2000)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    axiosData()
  }, [debSearchQuery])

  const axiosData = async () => {
    const search = debSearchQuery ? `&search=${debSearchQuery}` : ''
    const data = await axios
      .get(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items?${search}`)
      .then((response) => response.data)

    setEubData(data)
  }

  const dataDelete = async (id) => {
    setLoader(true)
    await axios
      .delete(`https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items/${id}`)
      .then((data) => {
        setLoader(false)
        data.status === 200 ? alert(data.statusText) : alert(data.statusText)
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

  const onClickModalHandle = () => {
    setModalActive(!modalActive)
  }

  const onFilterNameHandle = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <Container maxWidth={'xl'}>
        <SortSearch
          onClickModalHandle={onClickModalHandle}
          selectedSort={selectedSort}
          sortList={sortList}
          eubData={eubData}
          onFilterNameHandle={onFilterNameHandle}
          searchQuery={searchQuery}
        />
        <TableContainer
          component={Paper}
          sx={{
            minWidth: 850,
            borderRadius: '12px',
            boxShadow:
              '0 2px 0 rgb(90 97 105 / 11%), 0 4px 8px rgb(90 97 105 / 12%), 0 10px 10px rgb(90 97 105 / 6%), 0 7px 70px rgb(90 97 105 / 10%)',
          }}>
          <Table>
            <TableHead>
              <TableRow>
                {title.map((line, i) => (
                  <StyledTableCell key={i}>
                    <Typography
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      {line}
                    </Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <StyledTableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component='th' scope='row' width={40}>
                      {row.ID}
                    </StyledTableCell>
                    <StyledTableCell align='left' width={120}>
                      {row.RFCNumber}
                    </StyledTableCell>
                    <StyledTableCell align='left'>{row.RFCLink}</StyledTableCell>
                    <StyledTableCell align='left'>
                      <Typography
                        sx={{
                          maxWidth: 200,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '13px',
                        }}>
                        {row.Description}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      <Typography
                        sx={{
                          maxWidth: 200,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '13px',
                        }}>
                        {row.ResultDescription}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align='left' width={40}>
                      <Label color={row.Status ? 'success' : 'error'}>
                        {row.Status ? 'Done' : 'Pending'}
                      </Label>
                    </StyledTableCell>
                    <StyledTableCell align='left' width={40}>
                      {dayjs(row.CreatedAt).format('DD.MM.YYYY HH:mm')}
                    </StyledTableCell>
                    <StyledTableCell align='left' width={40}>
                      <PrimaryButton
                        sx={{ minWidth: 40 }}
                        size='small'
                        onClick={() => {
                          setIdData(row.ID)
                          setModalEditActive(!modalEditActive)
                        }}>
                        <Iconify icon={'eva:edit-fill'} />
                      </PrimaryButton>
                    </StyledTableCell>
                    <StyledTableCell align='left' width={40}>
                      <PrimaryButton
                        sx={{ minWidth: 40, background: '#ff006d' }}
                        size='small'
                        onClick={() => dataDelete(row.ID)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </PrimaryButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component='div'
          count={sortedList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Записей на страницу'
        />

        {modalActive && (
          <ModalWindow active={modalActive} setActive={setModalActive}>
            <RFCModalForm active={modalActive} setActive={setModalActive} />
          </ModalWindow>
        )}
        {modalEditActive && (
          <ModalWindow active={modalEditActive} setActive={setModalEditActive}>
            <RFCModalForm id={idData} active={modalEditActive} setActive={setModalEditActive} />
          </ModalWindow>
        )}
      </Container>
    </>
  )
}

export default RFCTable
