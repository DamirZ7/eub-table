// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// export const fetchTable = createAsyncThunk(
//   'table/fetchTable',
//   async function (_, { rejectWithValue }) {
//     try {
//       const response = await fetch(
//         'https://63462c139eb7f8c0f875b17a.mockapi.io/rfcadmin/application/items',
//       )

//       if (!response.ok) {
//         throw new Error('Server error!')
//       }

//       const data = await response.json()
//       return data
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// const initialState = {
//   table: [],
//   status: null,
//   error: null,
// }

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: initialState,
//   reducers: {
//     setSort(state, action) {
//       state.sort = action.payload
//     },
//   },
//   extraReducers: {
//     [fetchTable.pending]: (state) => {
//       ;(state.status = 'loading'), (state.error = null)
//     },
//     [fetchTable.fulfilled]: (state, action) => {
//       ;(state.status = 'resolved'), (state.table = action.payload)
//     },
//     [fetchTable.rejected]: (state, action) => {
//       ;(state.status = 'rejected'), (state.error = action.payload)
//     },
//   },
// })

// export const { setSort } = tableSlice.actions
// export default tableSlice
