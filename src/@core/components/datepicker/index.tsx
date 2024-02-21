import React from 'react'

// ** Third Party Imports
import DatePickerDefault, { ReactDatePickerProps } from 'react-datepicker'
import i18n from 'i18next'

const DatePicker: React.FC<ReactDatePickerProps> = props => {
  return <DatePickerDefault locale={i18n.language} {...props} />
}

export default DatePicker
