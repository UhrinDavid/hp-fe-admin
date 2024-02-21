// ** React Import
import { useEffect, useMemo, useRef } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import interactionPlugin from '@fullcalendar/interaction'
import skLocale from '@fullcalendar/core/locales/sk'

// ** Types
import { CalendarType } from 'src/declarations/types/calendarTypes'

// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css'

import i18n from 'i18next'

const Calendar = (props: CalendarType) => {
  // ** Props
  const {
    store,
    dispatch,
    direction,
    updateEvent,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props

  // ** Refs
  const calendarRef = useRef()

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi())
    }
  }, [calendarApi, setCalendarApi])

  const events = useMemo(() => {
    const calendarEvents = store.events.map(event => ({
      id: event.id,
      title: event.title,
      allDay: event.isAllDay,
      end: event.endDate,
      start: event.startDate,
      backgroundColor: event.backgroundColor
    }))

    return calendarEvents
  }, [store.events])

  if (store) {
    // ** calendarOptions(Props)
    const calendarOptions = {
      events,
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: 'sidebarToggle, prev, next, title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      views: {
        week: {
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
        }
      },

      /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
      editable: true,

      /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
      eventResizableFromStart: true,

      /*
        Automatically scroll the scroll-containers during event drag-and-drop and date selecting
        ? Docs: https://fullcalendar.io/docs/dragScroll
      */
      dragScroll: true,

      /*
        Max number of events within a given day
        ? Docs: https://fullcalendar.io/docs/dayMaxEvents
      */
      dayMaxEvents: 2,

      /*
        Determines if day names and week names are clickable
        ? Docs: https://fullcalendar.io/docs/navLinks
      */
      navLinks: true,

      eventClassNames({ event: calendarEvent }: any) {
        // @ts-ignore
        const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

        return [
          // Background Color
          `bg-${colorName}`
        ]
      },

      eventClick({ event: clickedEvent }: any) {
        dispatch(handleSelectEvent(clickedEvent))
        handleAddEventSidebarToggle()

        // * Only grab required field otherwise it goes in infinity loop
        // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
        // event.value = grabEventDataFromEventApi(clickedEvent)

        // isAddNewEventSidebarActive.value = true
      },

      customButtons: {
        sidebarToggle: {
          icon: 'bi bi-list',
          click() {
            handleLeftSidebarToggle()
          }
        }
      },

      /*
        Handle event drop (Also include dragged event)
        ? Docs: https://fullcalendar.io/docs/eventDrop
        ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
      */
      eventDrop({ event: droppedEvent }: any) {
        dispatch(updateEvent(droppedEvent))
      },

      /*
        Handle event resize
        ? Docs: https://fullcalendar.io/docs/eventResize
      */
      eventResize({ event: resizedEvent }: any) {
        dispatch(updateEvent(resizedEvent))
      },

      ref: calendarRef,

      // Get direction from app state (store)
      direction,

      // register all supported locales
      locales: [skLocale],

      // set default locale
      locale: i18n.language,

      height: '100%'
    }

    // @ts-ignore
    return <FullCalendar {...calendarOptions} />
  } else {
    return null
  }
}

export default Calendar
