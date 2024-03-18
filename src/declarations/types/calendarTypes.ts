// ** Types
import { ReactNode } from 'react'
import { Dispatch } from 'redux'

// ** Theme Type Import
import { ThemeColor } from 'src/@core/layouts/types'

import { Client, Room, SmallGroup, Trainer, Training } from './global'

export type CalendarFiltersType = 'Personal' | 'Business' | 'Family' | 'Holiday' | 'ETC'

export type EventDateType = Date | null | undefined

export type CalendarColors = {
  ETC: ThemeColor
  Family: ThemeColor
  Holiday: ThemeColor
  Personal: ThemeColor
  Business: ThemeColor
}

export type EventType = {
  id: number
  title: string
  allDay: boolean
  end: Date | string
  start: Date | string
  backgroundColor: string
}

export type AddEventType = {
  url: string
  title: string
  display: string
  allDay: boolean
  end: Date | string
  start: Date | string
  extendedProps: {
    calendar: string
    description: string | undefined
    guests: string[] | string | undefined
  }
}

export type EventStateType = {
  url: string
  title: string
  allDay: boolean
  guests: string[]
  description: string
  endDate: Date | string
  startDate: Date | string
  calendar: CalendarFiltersType | string
}

export type TrainingOption = {
  name: string
  id: number
}

export type CalendarStoreType = {
  events: Training[]
  selectedEvent: null | Training
  isSelectedMyCalendar: boolean
  selectedTrainersFilter: number[]
  selectedRoomsFilter: number[]
  selectedClientsFilter: number[]
  trainingOptions: TrainingOption[]
  trainers: Trainer[]
  clients: Client[]
  rooms: Room[]
  gymEntryRate: number
  smallGroups: SmallGroup[]
}

export type CalendarType = {
  calendarApi: any
  dispatch: Dispatch<any>
  store: CalendarStoreType
  direction: 'ltr' | 'rtl'
  calendarsColor: CalendarColors
  setCalendarApi: (val: any) => void
  handleLeftSidebarToggle: () => void
  updateEvent: (event: Training) => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: Training) => void
}

export type SidebarLeftType = {
  mdAbove: boolean
  calendarApi: any
  dispatch: Dispatch<any>
  leftSidebarWidth: number
  leftSidebarOpen: boolean
  store: CalendarStoreType
  calendarsColor: CalendarColors
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: null | Training) => void
  handleSelectMyCalendar: (val: boolean) => void
  handleTrainerFilterUpdate: (val: number) => void
  handleAllTrainerFilter: (val: boolean) => void
  handleRoomFilterUpdate: (val: number) => void
  handleAllRoomsFilter: (val: boolean) => void
  handleClientFilterUpdate: (val: number) => void
  handleAllClientFilter: (val: boolean) => void
}

export type AddEventSidebarType = {
  calendarApi: any
  drawerWidth: number
  dispatch: Dispatch<any>
  store: CalendarStoreType
  addEventSidebarOpen: boolean
  deleteEvent: (id: number) => void
  addEvent: (event: AddEventType) => void
  updateEvent: (event: Training) => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: null | Training) => void
}

export type ExpandableCheckboxType = {
  labelMasterCheckbox: string
  handleClickCheckbox: (e: any) => void
  selectedGroupItemsLength: number
  expandContent: ReactNode[]
}

export type ClientDetails = Client & {
  includeGymEntry: boolean
  gymEntryRate?: number
  paidAbsence: boolean
}

export type CalendarEvent = EventType & {
  extendedProps: Training
}
