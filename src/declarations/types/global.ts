export type Trainer = {
  id: number
  firstName: string
  lastName: string
}

export type Client = {
  id: number
  firstName: string
  lastName: string
}

export type Room = {
  id: number
  name: string
}

export type Training = {
  id: number
  title: string
  backgroundColor: string
  startDate: Date | string
  endDate: Date | string
  isAllDay: boolean
  trainingOption: number
  room: number
  trainerId: number
  trainerEarnings: number
  clientIds: number[] | number | undefined
  clientCost: number
  note: string
  extendedProps: {
    substituteTrainerId?: number | undefined
    assistantTrainerId?: number | undefined
    assistantTrainerEarnings?: number | undefined
  }
}
