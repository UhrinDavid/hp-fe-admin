// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import DatePicker from 'src/@core/components/datepicker'

// ** Third Party Imports
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { SidebarLeftType } from 'src/declarations/types/calendarTypes'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ExpandableCheckbox from './ExpandableCheckbox'

const SidebarLeft = (props: SidebarLeftType) => {
  const {
    store,
    mdAbove,
    dispatch,
    calendarApi,
    leftSidebarOpen,
    leftSidebarWidth,
    handleSelectEvent,
    handleSelectMyCalendar,
    handleTrainerFilterUpdate,
    handleAllTrainerFilter,
    handleRoomFilterUpdate,
    handleAllRoomsFilter,
    handleClientFilterUpdate,
    handleAllClientFilter,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props

  const { t } = useTranslation()

  const renderTrainerFilters = store.trainers.map(trainer => {
    return (
      <FormControlLabel
        key={trainer.id}
        label={`${trainer.firstName} ${trainer.lastName}`}
        sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
        control={
          <Checkbox
            checked={store.selectedRoomsFilter.includes(trainer.id)}
            onChange={() => dispatch(handleTrainerFilterUpdate(trainer.id))}
          />
        }
      />
    )
  })

  const renderClientFilters = store.clients.map(client => {
    return (
      <FormControlLabel
        key={client.id}
        label={`${client.firstName} ${client.lastName}`}
        sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
        control={
          <Checkbox
            checked={store.selectedClientsFilter.includes(client.id)}
            onChange={() => dispatch(handleClientFilterUpdate(client.id))}
          />
        }
      />
    )
  })

  const renderRoomFilters = store.rooms.map(room => {
    return (
      <FormControlLabel
        key={room.id}
        label={`${room.name}`}
        sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
        control={
          <Checkbox
            checked={store.selectedRoomsFilter.includes(room.id)}
            onChange={() => dispatch(handleRoomFilterUpdate(room.id))}
          />
        }
      />
    )
  })

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    dispatch(handleSelectEvent(null))
  }

  return (
    <Drawer
      open={leftSidebarOpen}
      onClose={handleLeftSidebarToggle}
      variant={mdAbove ? 'permanent' : 'temporary'}
      ModalProps={{
        disablePortal: true,
        disableAutoFocus: true,
        disableScrollLock: true,
        keepMounted: true // Better open performance on mobile.
      }}
      sx={{
        zIndex: 3,
        display: 'block',
        position: mdAbove ? 'static' : 'absolute',
        '& .MuiDrawer-paper': {
          borderRadius: 1,
          boxShadow: 'none',
          width: leftSidebarWidth,
          borderTopRightRadius: 0,
          alignItems: 'flex-start',
          borderBottomRightRadius: 0,
          zIndex: mdAbove ? 2 : 'drawer',
          position: mdAbove ? 'static' : 'absolute'
        },
        '& .MuiBackdrop-root': {
          borderRadius: 1,
          position: 'absolute'
        }
      }}
    >
      <Box sx={{ p: 6, width: '100%' }}>
        <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleSidebarToggleSidebar}>
          <Icon icon='tabler:plus' fontSize='1.125rem' />
          {t('addTrainingButton')}
        </Button>
      </Box>

      <Divider sx={{ width: '100%', m: '0 !important' }} />
      <DatePickerWrapper
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' }
        }}
      >
        <DatePicker inline onChange={date => calendarApi.gotoDate(date)} locale={i18n.language} />
      </DatePickerWrapper>
      <Divider sx={{ width: '100%', m: '0 !important' }} />
      <div
        style={{
          overflowY: 'auto',
          maxHeight: '100%'
        }}
      >
        <Box
          sx={{
            p: 6,
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column'
          }}
        >
          <Typography variant='body2' sx={{ mb: 2, color: 'text.disabled', textTransform: 'uppercase' }}>
            {t('calendarFilterTitle')}
          </Typography>
          <FormControlLabel
            label={t('calendarMyCalendarCheckbox')}
            sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            control={<Checkbox onChange={() => dispatch(handleSelectMyCalendar(!store.isSelectedMyCalendar))} />}
          />
          <ExpandableCheckbox
            labelMasterCheckbox={t('calendarOtherTrainersCheckbox')}
            handleClickCheckbox={() =>
              dispatch(handleAllTrainerFilter(!(store.selectedRoomsFilter.length === store.trainers.length)))
            }
            selectedGroupItemsLength={store.selectedRoomsFilter.length}
            expandContent={renderTrainerFilters}
          />
          <Divider sx={{ width: '100%', m: '0 !important' }} />
          <ExpandableCheckbox
            labelMasterCheckbox={t('calendarRoomsCheckbox')}
            handleClickCheckbox={() =>
              dispatch(handleAllRoomsFilter(!(store.selectedRoomsFilter.length === store.rooms.length)))
            }
            selectedGroupItemsLength={store.selectedRoomsFilter.length}
            expandContent={renderRoomFilters}
          />
          <Divider sx={{ width: '100%', m: '0 !important' }} />
          <ExpandableCheckbox
            labelMasterCheckbox={t('calendarAllClientsCheckbox')}
            handleClickCheckbox={() =>
              dispatch(handleAllClientFilter(!(store.selectedClientsFilter.length === store.clients.length)))
            }
            selectedGroupItemsLength={store.selectedClientsFilter.length}
            expandContent={renderClientFilters}
          />
        </Box>
      </div>
    </Drawer>
  )
}

export default SidebarLeft
