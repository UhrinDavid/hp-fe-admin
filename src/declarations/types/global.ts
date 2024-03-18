export type Trainer = {
  id: number
  firstName: string
  lastName: string
}

export type TrainingGroup = {
  id: number
  groupLead: Client
  members: Client[]
}

export type InvoicingCompany = {
  companyName: string
  identityNumber: number
  taxPayerNumber: number
  taxNumber: number
  addressLine1: string
  postalCode: string
  invoiceContent: string
}

export type Client = {
  id: number

  // isActive: boolean
  firstName: string
  lastName: string

  // phone: string
  // email: string
  // birthDate: Date
  // company: string
  // reference: string
  // gdpr: string
  // note: string
  // paymentType: 'invoice' | 'terminal'
  // paymentMethod: 'spotreba' | 'kredit' | 'barter' | 'pausal'
  // trainer: Trainer
  // customRate: number
  // shouldIncludeEntry: boolean
  // customTrainerRate: number
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
  substituteTrainerId?: number | undefined
  assistantTrainerId?: number | undefined
  assistantTrainerEarnings?: number | undefined
}

export type SmallGroup = {
  id: number
  name: string
  trainerId: number
  clientIds: number[]
}
