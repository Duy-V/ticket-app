import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'
import { extractErrorMessage } from '../../utils'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    console.log(ticketId)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const createNote = createAsyncThunk(
  'notes/create',
  async ({ ticketId, noteText }, thunkAPI) => {
    console.log(ticketId)
    try {
      const token = thunkAPI.getState().auth.user.token
      const note = await noteService.createNote(noteText, ticketId, token)
      thunkAPI.dispatch(getNotes(ticketId))
      return note
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)



export const getNote = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    console.log(ticketId)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNote(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const updateNote = createAsyncThunk(
  'notes/update',
  async (note, thunkAPI) => {
    // console.log(ticketId)
    try {
      const token = thunkAPI.getState().auth.user.token
      const updateNote = await noteService.updateNote(note.text, note.ticket, note._id, token)
      thunkAPI.dispatch(getNotes(note.ticket))
      return updateNote
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (noteData, thunkAPI) => {
    console.log(noteData.ticket, noteData._id)
    try {
      const token = thunkAPI.getState().auth.user.token
      const note = await noteService.deleteNote( noteData.ticket, noteData._id,token)
      thunkAPI.dispatch(getNotes(note.ticket))
      return note
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)


export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        
        //state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false
        
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false
        
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
