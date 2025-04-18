// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import calendar from 'src/store/calendar'

export const store = configureStore({
  reducer: {
    calendar
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
