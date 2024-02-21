// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { AddEventType, CalendarStoreType } from 'src/declarations/types/calendarTypes'
import { Training } from 'src/declarations/types/global'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async () => {
  const response = await axios.get('/apps/calendar/events', {})

  return response.data
})

// ** Add Event
export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event: AddEventType, { dispatch }) => {
  const response = await axios.post('/apps/calendar/add-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents())

  return response.data.event
})

// ** Update Event
export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event: Training, { dispatch }) => {
  const response = await axios.post('/apps/calendar/update-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents())

  return response.data.event
})

// ** Delete Event
export const deleteEvent = createAsyncThunk('appCalendar/deleteEvent', async (id: number | string, { dispatch }) => {
  const response = await axios.delete('/apps/calendar/remove-event', {
    params: { id }
  })
  await dispatch(fetchEvents())

  return response.data
})

const initialState: CalendarStoreType = {
  events: [],
  selectedEvent: null,
  isSelectedMyCalendar: true,
  selectedTrainersFilter: [],
  selectedClientsFilter: [],
  trainingOptions: [
    {
      id: 1,
      name: 'oneOnOne'
    },
    {
      id: 2,
      name: 'twoOnOne'
    },
    {
      id: 3,
      name: 'threeOnOne'
    },
    {
      id: 4,
      name: 'smallGroup'
    },
    {
      id: 6,
      name: 'diagnostics'
    },
    {
      id: 7,
      name: 'consultation'
    }
  ],
  trainers: [
    {
      id: 1,
      firstName: 'Patrik',
      lastName: 'Pytel'
    },
    {
      id: 2,
      firstName: 'Milan',
      lastName: 'Bališ'
    }
  ],
  clients: [
    {
      id: 1,
      firstName: 'Peter',
      lastName: 'Sekera'
    },
    {
      id: 2,
      firstName: 'Katka',
      lastName: 'Ďurková'
    }
  ],
  rooms: [
    {
      id: 1,
      name: 'Tréningovka'
    },
    {
      id: 2,
      name: 'Diagnostika'
    }
  ]
}

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState,
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleSelectMyCalendar: (state, action) => {
      state.isSelectedMyCalendar = action.payload
    },
    handleTrainerFilterUpdate: (state, action) => {
      const filterIndex = state.selectedTrainersFilter.findIndex(i => i === action.payload)
      if (state.selectedTrainersFilter.includes(action.payload)) {
        state.selectedTrainersFilter.splice(filterIndex, 1)
      } else {
        state.selectedTrainersFilter.push(action.payload)
      }
      if (state.selectedTrainersFilter.length === 0) {
        state.events.length = 0
      }
    },
    handleAllTrainerFilter: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedTrainersFilter = state.trainers.map(trainer => trainer.id)
      } else {
        state.selectedTrainersFilter = []
      }
    },
    handleClientFilterUpdate: (state, action) => {
      const filterIndex = state.selectedClientsFilter.findIndex(i => i === action.payload)
      if (state.selectedClientsFilter.includes(action.payload)) {
        state.selectedClientsFilter.splice(filterIndex, 1)
      } else {
        state.selectedClientsFilter.push(action.payload)
      }
      if (state.selectedClientsFilter.length === 0) {
        state.events.length = 0
      }
    },
    handleAllClientFilter: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedClientsFilter = state.clients.map(client => client.id)
      } else {
        state.selectedClientsFilter = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})
export const {
  handleSelectEvent,
  handleSelectMyCalendar,
  handleTrainerFilterUpdate,
  handleAllTrainerFilter,
  handleClientFilterUpdate,
  handleAllClientFilter
} = appCalendarSlice.actions

export default appCalendarSlice.reducer
