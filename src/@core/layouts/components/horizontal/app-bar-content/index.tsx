// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

interface Props {
  hidden: LayoutProps['hidden']
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  appBarContent: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['content']
  appBarBranding: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['branding']
}

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const AppBarContent = (props: Props) => {
  // ** Props
  const { appBarContent: userAppBarContent, appBarBranding: userAppBarBranding } = props

  // ** Hooks

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userAppBarBranding ? (
        userAppBarBranding(props)
      ) : (
        <LinkStyled href='/'>
          <svg width='45' height='24' viewBox='0 0 45 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <mask id='mask0_4943_3492' maskUnits='userSpaceOnUse' x='0' y='0' width='45' height='24'>
              <path
                d='M26.7303 1.55409C25.8619 2.04469 25.0818 2.62671 24.384 3.29101C22.7689 4.75978 24.5637 7.01777 26.1117 6.30777C26.2885 6.09446 26.7852 5.75622 26.9893 5.5551C28.6653 3.87608 30.2925 3.42509 32.648 3.42509C35.0036 3.42509 37.0147 4.26308 38.6846 5.9421C40.3545 7.61808 41.1864 9.63535 41.1864 11.9909C41.1864 14.3464 40.3514 16.3606 38.6846 18.0396C37.0147 19.7156 35.0036 20.5536 32.648 20.5536C30.2925 20.5536 28.2783 19.7156 26.5993 18.0396C25.03 16.4703 24.3108 15.4281 24.0518 12.8167C24.0518 12.8167 23.9147 11.1498 23.9147 11.1193C23.7166 9.61097 23.61 8.19705 22.2692 5.82935V5.82631C22.2661 5.82021 22.2631 5.81412 22.257 5.81107C22.257 5.81107 22.257 5.80802 22.2539 5.80802C21.1844 4.0132 19.7339 2.60234 17.9055 1.57237C16.0681 0.536313 14.0965 0.0182832 11.9909 0.0182832C8.69071 0.0182832 5.86592 1.19147 3.51955 3.53784C1.17318 5.8842 0 8.70594 0 12.0061C0 15.3062 1.17318 18.131 3.51955 20.4774C5.86592 22.8268 8.69071 24 11.9909 24C14.0965 24 16.0681 23.482 17.9055 22.4459C18.774 21.9553 19.5541 21.3733 20.2519 20.709C21.8669 19.2372 20.0721 16.9822 18.5241 17.6922C18.3443 17.9055 17.8476 18.2438 17.6465 18.4449C15.9705 20.1239 14.3433 20.5719 11.9878 20.5719C9.6323 20.5719 7.62113 19.7369 5.95124 18.0579C4.28136 16.3819 3.44947 14.3647 3.44947 12.0091C3.44947 9.65668 4.28136 7.63941 5.95124 5.96039C7.62113 4.28441 9.6323 3.44642 11.9878 3.44642C14.3433 3.44642 16.3606 4.28441 18.0366 5.96039C19.6028 7.52971 20.4561 9.14779 20.6359 11.2687C20.6359 11.2687 20.7395 12.8654 20.7395 12.8959C20.8492 14.1757 21.0015 15.9797 22.58 18.5119L22.6166 18.5637C23.6587 20.1818 25.03 21.4738 26.7303 22.4307C28.5678 23.4637 30.5394 23.9848 32.645 23.9848C35.9451 23.9848 38.7699 22.8116 41.1163 20.4622C43.4627 18.1188 44.6359 15.2941 44.6359 11.9939C44.6359 8.69375 43.4627 5.86897 41.1163 3.5226C38.7699 1.17318 35.9451 0 32.645 0C30.5394 0 28.5678 0.518029 26.7303 1.55409Z'
                fill='white'
              />
            </mask>
            <g mask='url(#mask0_4943_3492)'>
              <path d='M44.6355 0H-0.00341797V24H44.6355V0Z' fill='url(#paint0_linear_4943_3492)' />
            </g>
            <defs>
              <linearGradient
                id='paint0_linear_4943_3492'
                x1='-0.00293041'
                y1='12.0014'
                x2='44.6368'
                y2='12.0014'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#00A79D' />
                <stop offset='1' stop-color='#27AAE1' />
              </linearGradient>
            </defs>
          </svg>

          <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
            {themeConfig.templateName}
          </Typography>
        </LinkStyled>
      )}
      {userAppBarContent ? userAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
