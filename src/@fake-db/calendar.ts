// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { Training } from 'src/declarations/types/global'

const date = new Date()
const nextHours = (date: Date, hours: number) => new Date(date.getTime() + 60 * 60 * 1000 * hours)
const nextDays = (date: Date, days: number) => new Date(date.getTime() + 24 * 60 * 60 * 1000 * days)

const data: { events: Training[] } = {
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
