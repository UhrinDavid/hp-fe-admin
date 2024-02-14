// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (t: any): HorizontalNavItemsType => [
  {
    title: t('pageTitleCalendar'),
    path: '/calendar',
    icon: 'tabler:calendar'
  }
]

export default navigation
