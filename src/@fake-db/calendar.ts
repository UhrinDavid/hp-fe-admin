// ** Mock Adapter
import mock from 'src/@fake-db/mock'
import { CalendarEvent } from 'src/declarations/types/calendarTypes'

// ** Types

const date = new Date()
const nextHours = (date: Date, hours: number) => new Date(date.getTime() + 60 * 60 * 1000 * hours)
const nextDays = (date: Date, days: number) => new Date(date.getTime() + 24 * 60 * 60 * 1000 * days)

const data: { events: CalendarEvent[] } = {
  events: [
    {
      id: 1,
      title: 'Peter Sekera',
      backgroundColor: 'blue',
      startDate: date,
      endDate: nextHours(date, 1),
      isAllDay: false,
      trainingOption: 1,
      room: 1,
      trainerId: 1,
      trainerEarnings: 40,
      clientIds: [1],
      clientCost: 70,
      note: 'Trenujeme nohy',
      extendedProps: {
        substituteTrainerId: undefined,
        assistantTrainerId: 1,
        assistantTrainerEarnings: 10
      }
    },
    {
      id: 2,
      title: 'Katka Ďurková',
      backgroundColor: 'pink',
      startDate: nextHours(date, -3),
      endDate: nextHours(date, 2),
      isAllDay: false,
      trainingOption: 6,
      room: 2,
      trainerId: 1,
      trainerEarnings: 40,
      clientIds: [2],
      clientCost: 70,
      note: 'Som chory, dal som zaskok',
      extendedProps: {
        substituteTrainerId: 2
      }
    },
    {
      id: 3,
      title: 'Dovča',
      backgroundColor: 'red',
      startDate: nextDays(date, 1),
      endDate: nextDays(date, 1),
      isAllDay: true,
      trainingOption: 6,
      room: 2,
      trainerId: 1,
      trainerEarnings: 40,
      clientIds: [2],
      clientCost: 70,
      note: 'Som chory, dal som zaskok',
      extendedProps: {
        substituteTrainerId: 2
      }
    },
    {
      id: 4,
      title: 'Peter Strnisko',
      backgroundColor: 'green',
      startDate: nextHours(date, -3),
      endDate: nextHours(date, 1),
      isAllDay: false,
      trainingOption: 6,
      room: 2,
      trainerId: 1,
      trainerEarnings: 40,
      clientIds: [2],
      clientCost: 70,
      note: 'Som chory, dal som zaskok',
      extendedProps: {
        substituteTrainerId: 2
      }
    },
    {
      id: 5,
      title: 'Jozef Mrkva',
      backgroundColor: 'orange',
      startDate: nextHours(date, 2),
      endDate: nextHours(date, 4),
      isAllDay: false,
      trainingOption: 3,
      room: 1,
      trainerId: 2,
      trainerEarnings: 50,
      clientIds: [3],
      clientCost: 80,
      note: 'Posilňovňa',
      extendedProps: {
        substituteTrainerId: undefined,
        assistantTrainerId: 3,
        assistantTrainerEarnings: 15
      }
    },
    {
      id: 6,
      title: 'Lukáš Novák',
      backgroundColor: 'yellow',
      startDate: nextHours(date, -1),
      endDate: nextHours(date, 2),
      isAllDay: false,
      trainingOption: 4,
      room: 3,
      trainerId: 2,
      trainerEarnings: 50,
      clientIds: [4],
      clientCost: 80,
      note: 'Kardio tréning',
      extendedProps: {
        substituteTrainerId: 3
      }
    },
    {
      id: 7,
      title: 'Eva Kováčová',
      backgroundColor: 'purple',
      startDate: nextDays(date, 2),
      endDate: nextDays(date, 2),
      isAllDay: true,
      trainingOption: 1,
      room: 2,
      trainerId: 3,
      trainerEarnings: 60,
      clientIds: [5],
      clientCost: 90,
      note: 'Yoga',
      extendedProps: {
        substituteTrainerId: undefined
      }
    },
    {
      id: 8,
      title: 'Mária Hrušková',
      backgroundColor: 'cyan',
      startDate: nextHours(date, -2),
      endDate: nextHours(date, 1),
      isAllDay: false,
      trainingOption: 5,
      room: 2,
      trainerId: 3,
      trainerEarnings: 60,
      clientIds: [6],
      clientCost: 90,
      note: 'Pilates',
      extendedProps: {
        substituteTrainerId: undefined
      }
    },
    {
      id: 9,
      title: 'Martin Kučera',
      backgroundColor: 'brown',
      startDate: nextHours(date, 3),
      endDate: nextHours(date, 5),
      isAllDay: false,
      trainingOption: 2,
      room: 1,
      trainerId: 4,
      trainerEarnings: 70,
      clientIds: [7],
      clientCost: 100,
      note: 'Kettlebell tréning',
      extendedProps: {
        substituteTrainerId: undefined,
        assistantTrainerId: 5,
        assistantTrainerEarnings: 20
      }
    },
    {
      id: 10,
      title: 'Veronika Černá',
      backgroundColor: 'magenta',
      startDate: nextHours(date, 1),
      endDate: nextHours(date, 3),
      isAllDay: false,
      trainingOption: 3,
      room: 3,
      trainerId: 5,
      trainerEarnings: 80,
      clientIds: [8],
      clientCost: 110,
      note: 'TRX cvičenie',
      extendedProps: {
        substituteTrainerId: undefined
      }
    },
    {
      id: 11,
      title: 'Tomáš Malík',
      backgroundColor: 'blue',
      startDate: nextDays(date, 1),
      endDate: nextDays(date, 1),
      isAllDay: true,
      trainingOption: 6,
      room: 1,
      trainerId: 6,
      trainerEarnings: 80,
      clientIds: [9],
      clientCost: 110,
      note: 'Beh na bežiacom páse',
      extendedProps: {
        substituteTrainerId: undefined
      }
    },
    {
      id: 12,
      title: 'Miroslava Vítková',
      backgroundColor: 'pink',
      startDate: nextHours(date, -2),
      endDate: nextHours(date, 1),
      isAllDay: false,
      trainingOption: 1,
      room: 2,
      trainerId: 7,
      trainerEarnings: 90,
      clientIds: [10],
      clientCost: 120,
      note: 'Aerobik',
      extendedProps: {
        substituteTrainerId: undefined
      }
    },
    {
      id: 13,
      title: 'Ján Zelený',
      backgroundColor: 'red',
      startDate: nextHours(date, 4),
      endDate: nextHours(date, 6),
      isAllDay: false,
      trainingOption: 2,
      room: 3,
      trainerId: 8,
      trainerEarnings: 90,
      clientIds: [11],
      clientCost: 120,
      note: 'Kickbox',
      extendedProps: {
        substituteTrainerId: undefined
      }
    },
    {
      id: 14,
      title: 'Silvia Králová',
      backgroundColor: 'green',
      startDate: nextHours(date, -1),
      endDate: nextHours(date, 2),
      isAllDay: false,
      trainingOption: 4,
      room: 1,
      trainerId: 9,
      trainerEarnings: 100,
      clientIds: [12],
      clientCost: 130,
      note: 'Tabata cvičenie',
      extendedProps: {
        substituteTrainerId: undefined
      }
    }
  ]
}

// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
mock.onGet('/apps/calendar/events').reply(() => {
  return [200, data.events]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
mock.onPost('/apps/calendar/add-event').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data).data

  const { length } = data.events
  let lastIndex = 0
  if (length) {
    lastIndex = data.events[length - 1].id
  }
  event.id = lastIndex + 1

  data.events.push(event)

  return [201, { event }]
})

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
mock.onPost('/apps/calendar/update-event').reply(config => {
  const eventData = JSON.parse(config.data).data.event

  // Convert Id to number
  eventData.id = Number(eventData.id)

  const event = data.events.find(ev => ev.id === Number(eventData.id))

  if (event) {
    Object.assign(event, eventData)

    return [200, { event }]
  } else {
    return [400, { error: `Event doesn't exist` }]
  }
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete('/apps/calendar/remove-event').reply(config => {
  // Get event id from URL
  const { id } = config.params

  // Convert Id to number
  const eventId = Number(id)

  const eventIndex = data.events.findIndex(ev => ev.id === eventId)
  data.events.splice(eventIndex, 1)

  return [200]
})
