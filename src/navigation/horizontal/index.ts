// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (t: any): HorizontalNavItemsType => [
  {
    title: t('pageTitleCalendar'),
    path: '/calendar',
    icon: 'tabler:calendar'
  },
  {
    title: t('pageTitleClients'),
    path: '/clients',
    icon: 'tabler:users'
  },
  {
    title: t('pageTitleTrainings'),
    path: '/trainings',
    icon: 'tabler:run'
  },
  {
    title: t('pageTitleStatistics'),
    path: 'statistics',
    icon: 'tabler:chart-bar'
  },
  {
    title: t('pageTitleTasksAndGoals'),
    path: '/task-and-goals',
    icon: 'tabler:checkbox'
  }
]

export default navigation
