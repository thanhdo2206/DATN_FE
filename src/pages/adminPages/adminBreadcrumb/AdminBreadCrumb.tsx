import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Breadcrumbs } from '@mui/material'
import { Link, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  breadcrumbs?: JSX.Element[]
  breadcrumbTitle: string
}

const AdminBreadCrumb = (props: Props) => {
  const { breadcrumbTitle } = props
  const location = useLocation()
  const path = location.pathname
  const segments = path.split('/')
  const navigate = useNavigate()

  const breadcrumbs = [
    <Link
      onClick={() => navigate('/admin/dashboard')}
      underline='hover'
      key='1'
      color='inherit'
      href='/'
    >
      Dashboard
    </Link>
  ]

  const removeSegments = segments.slice(2)
  removeSegments.forEach((segment, index) => {
    if (breadcrumbs.length <= removeSegments.length) {
      breadcrumbs.push(
        <Typography key={index + 2} color='text.primary'>
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Typography>
      )
    }
  })

  return (
    <div>
      <p className='admin__p--title'>{breadcrumbTitle}</p>
      <div className='admin__breadcrumds'>
        <Breadcrumbs
          separator={<FiberManualRecordIcon fontSize='small' />}
          aria-label='breadcrumb'
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
    </div>
  )
}

export default AdminBreadCrumb
