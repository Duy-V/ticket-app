import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ticketService from "./ticketService";
import { extractErrorMessage } from '../../utils'

const initialState = {
    tickets: [],
    ticket:{},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createTicket = createAsyncThunk(
    //?? 'auth/register' string này có ý nghĩa gì
    'tickets/create',
    async (ticketData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        const data=  await ticketService.getTickets(token)
        return data
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
//http://localhost:3000/api/tickets/63dd444177ba0d7705fb0f8e
// Get user ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    console.log(ticketId)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const updateTicket = createAsyncThunk(
  'tickets/update',
  async (updateTicketData, thunkAPI) => {
    // console.log(ticketId)
    try {
      const token = thunkAPI.getState().auth.user.token
      const updateNote = await ticketService.updateTicket(updateTicketData, token)
      thunkAPI.dispatch(getTickets(token))
      return updateNote
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const deleteTicket = createAsyncThunk(
  'tickets/delete',
  async (ticketData, thunkAPI) => {
    console.log('slice', ticketData._id)
    try {
      const token = thunkAPI.getState().auth.user.token
      const ticket = await ticketService.deleteTicket( ticketData._id,token)
      thunkAPI.dispatch(getTickets(token))
      return ticket
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
      reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(getTickets.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getTickets.fulfilled, (state, action) => {        
            state.isLoading = false
            state.tickets = action.payload
          })
          .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getTicket.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getTicket.fulfilled, (state, action) => {        
            state.isLoading = false
            state.isSuccess = true
            state.ticket = action.payload
          })
          .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(deleteTicket.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteTicket.fulfilled, (state, action) => {        
            state.isLoading = false
          
          })
          .addCase(deleteTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(updateTicket.pending, (state) => {
            state.isLoading = true
          })
          .addCase(updateTicket.fulfilled, (state, action) => {        
            state.isLoading = false
          
          })
          .addCase(updateTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(closeTicket.pending, (state) => {
            state.isLoading = true
          })
          .addCase(closeTicket.fulfilled, (state, action) => {
            state.ticket = action.payload
            state.tickets = state.tickets.map((ticket) =>
              ticket._id === action.payload._id ? action.payload : ticket
            )
          })
          .addCase(closeTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    },
  })
  export const {reset} = ticketSlice.actions
  export default ticketSlice.reducer