// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Collapse from '@mui/material/Collapse'

// ** Icons Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ExpandableCheckboxType } from 'src/declarations/types/calendarTypes'

const ExpandableCheckbox = (props: ExpandableCheckboxType) => {
  const { labelMasterCheckbox, handleClickCheckbox, selectedGroupItemsLength, expandContent } = props

  const [expand, setExpand] = useState<boolean>(false)

  const handleClickExpand = (e: any) => {
    e.preventDefault()
    setExpand(prevState => !prevState)
  }

  return (
    <>
      <FormControlLabel
        label={
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {labelMasterCheckbox}
            {expand ? (
              <Icon icon='tabler:chevron-up' onClick={handleClickExpand} />
            ) : (
              <Icon icon='tabler:chevron-down' onClick={handleClickExpand} />
            )}
          </Box>
        }
        sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
        control={
          <Checkbox
            checked={selectedGroupItemsLength === expandContent.length}
            onChange={e => handleClickCheckbox(e)}
          />
        }
      />
      <Collapse in={expand}>
        <Box sx={{ paddingLeft: 6, width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          {expandContent}
        </Box>
      </Collapse>
    </>
  )
}

export default ExpandableCheckbox
