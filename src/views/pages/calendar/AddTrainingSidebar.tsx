// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { EventDateType, AddEventSidebarType } from 'src/declarations/types/calendarTypes'

interface PickerProps {
  label?: string
  error?: boolean
  registername?: string
}

interface DefaultStateType {
  startDate: Date | string
  endDate: Date | string
  isAllDay: boolean
  eventType: string
  trainerId: number
  trainerEarnings: number
  isSubstituted: boolean
  substituteTrainerId: number | undefined
  hasAssistant: boolean
  assistantTrainerId: number | undefined
  trainingGroupId: undefined
  clientIds: number[] | number | undefined
  clientCost: number
  note: string
}

const defaultState: DefaultStateType = {
  startDate: new Date(),
  endDate: new Date(),
  isAllDay: false,
  eventType: 'training',
  trainerId: 1,
  trainerEarnings: 20,
  isSubstituted: false,
  substituteTrainerId: undefined,
  hasAssistant: false,
  assistantTrainerId: undefined,
  trainingGroupId: undefined,
  clientIds: [],
  clientCost: 25,
  note: ''
}

const AddTrainingSidebar = (props: AddEventSidebarType) => {
  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle
  } = props

  const { t } = useTranslation()

  // ** States
  const [values, setValues] = useState<DefaultStateType>(defaultState)

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = () => {
    // const modifiedEvent = {
    //   url: values.url,
    //   display: 'block',
    //   title: data.title,
    //   end: values.endDate,
    //   allDay: values.allDay,
    //   start: values.startDate,
    //   extendedProps: {
    //     calendar: capitalize(values.calendar),
    //     guests: values.guests && values.guests.length ? values.guests : undefined,
    //     description: values.description.length ? values.description : undefined
    //   }
    // }
    // if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
    //   dispatch(addEvent(modifiedEvent))
    // } else {
    //   dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    // }
    // calendarApi.refetchEvents()
    // handleSidebarClose()
  }

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent(store.selectedEvent.id))
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const handleStartDate = (date: Date) => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent

      // setValues({
      //   endDate: event.end !== null ? event.end : event.start,
      //   startDate: event.start !== null ? event.start : new Date()
      // })
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])

  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
    return (
      <CustomTextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            {t('create')}
          </Button>
          <Button variant='tonal' color='secondary' onClick={resetToEmptyValues}>
            {t('cancel')}
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            {t('save')}
          </Button>
          <Button variant='tonal' color='secondary' onClick={resetToStoredValues}>
            {t('cancel')}
          </Button>
        </Fragment>
      )
    }
  }

  return (
    <Drawer
      anchor='right'
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h5'>
          {store.selectedEvent !== null && store.selectedEvent.title.length
            ? t('editTrainingOrEvent')
            : t('addTrainingOrEvent')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? (
            <IconButton
              size='small'
              onClick={handleDeleteEvent}
              sx={{ color: 'text.primary', mr: store.selectedEvent !== null ? 1 : 0 }}
            >
              <Icon icon='tabler:trash' fontSize='1.25rem' />
            </IconButton>
          ) : null}
          <IconButton
            size='small'
            onClick={handleSidebarClose}
            sx={{
              p: '0.375rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Box sx={{ mb: 4 }}>
              <DatePicker
                selectsStart
                id='event-start-date'
                endDate={values.endDate as EventDateType}
                selected={values.startDate as EventDateType}
                startDate={values.startDate as EventDateType}
                showTimeSelect={!values.isAllDay}
                dateFormat={!values.isAllDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label={t('startDate') ?? ''} registername='startDate' />}
                onChange={(date: Date) => setValues({ ...values, startDate: new Date(date) })}
                onSelect={handleStartDate}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <DatePicker
                selectsEnd
                id='event-end-date'
                endDate={values.endDate as EventDateType}
                selected={values.endDate as EventDateType}
                minDate={values.startDate as EventDateType}
                startDate={values.startDate as EventDateType}
                showTimeSelect={!values.isAllDay}
                dateFormat={!values.isAllDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label={t('endDate') ?? ''} registername='endDate' />}
                onChange={(date: Date) => setValues({ ...values, endDate: new Date(date) })}
              />
            </Box>
            <FormControl sx={{ mb: 4 }}>
              <FormControlLabel
                label={t('allDay')}
                control={
                  <Switch
                    checked={values.isAllDay}
                    onChange={e => setValues({ ...values, isAllDay: e.target.checked })}
                  />
                }
              />
            </FormControl>
            <CustomTextField
              select
              fullWidth
              sx={{ mb: 4 }}
              label={t('eventType')}
              SelectProps={{
                value: values.eventType,
                onChange: e => setValues({ ...values, eventType: e.target.value as string })
              }}
            >
              {store.eventTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {t(type)}
                </MenuItem>
              ))}
            </CustomTextField>
            <CustomTextField
              select
              fullWidth
              sx={{ mb: 4 }}
              label={t('trainer')}
              SelectProps={{
                value: values.trainerId,
                onChange: e => setValues({ ...values, trainerId: Number(e.target.value) as number })
              }}
            >
              {store.trainers.map(trainer => (
                <MenuItem key={trainer.id} value={trainer.id}>
                  {`${trainer.firstName} ${trainer.lastName}`}
                </MenuItem>
              ))}
            </CustomTextField>
            <CustomTextField
              fullWidth
              type='number'
              sx={{ mb: 4 }}
              label={t('trainerEarnings')}
              value={values.trainerEarnings}
              onChange={e => setValues({ ...values, trainerEarnings: Number(e.target.value) as number })}
            />
            <FormControl sx={{ mb: 4, display: 'block' }}>
              <FormControlLabel
                label={t('isSubstituted')}
                control={
                  <Switch
                    checked={values.isSubstituted}
                    onChange={e =>
                      setValues({ ...values, isSubstituted: e.target.checked, substituteTrainerId: undefined })
                    }
                  />
                }
              />
            </FormControl>
            {values.isSubstituted && (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label={t('substituteTrainer')}
                SelectProps={{
                  value: values.substituteTrainerId,
                  onChange: e => setValues({ ...values, substituteTrainerId: Number(e.target.value) as number })
                }}
              >
                {store.trainers.map(trainer => (
                  <MenuItem key={trainer.id} value={trainer.id}>
                    {`${trainer.firstName} ${trainer.lastName}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
            <FormControl sx={{ mb: 4, display: 'block' }}>
              <FormControlLabel
                label={t('hasAssistant')}
                control={
                  <Switch
                    checked={values.hasAssistant}
                    onChange={e =>
                      setValues({ ...values, hasAssistant: e.target.checked, assistantTrainerId: undefined })
                    }
                  />
                }
              />
            </FormControl>
            {values.hasAssistant && (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label={t('assistantTrainer')}
                SelectProps={{
                  value: values.assistantTrainerId,
                  onChange: e => setValues({ ...values, assistantTrainerId: Number(e.target.value) as number })
                }}
              >
                {store.trainers.map(trainer => (
                  <MenuItem key={trainer.id} value={trainer.id}>
                    {`${trainer.firstName} ${trainer.lastName}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}

            <CustomTextField
              select
              fullWidth
              sx={{ mb: 4 }}
              label={t('clients')}
              SelectProps={{
                value: values.clientIds,
                multiple: true,
                onChange: e => setValues({ ...values, clientIds: e.target.value as number | number[] | undefined })
              }}
            >
              {store.clients.map(client => (
                <MenuItem key={client.id} value={client.id}>
                  {`${client.firstName} ${client.lastName}`}
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomTextField
              rows={4}
              multiline
              fullWidth
              sx={{ mb: 6.5 }}
              label={t('note')}
              id='event-note'
              value={values.note}
              onChange={e => setValues({ ...values, note: e.target.value })}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  )
}

export default AddTrainingSidebar
