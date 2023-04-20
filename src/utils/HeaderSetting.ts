import {
  MenuSettingsInteface,
  PagesInteface
} from '../interface/HeaderInterface'

export const pages: PagesInteface[] = [
  {
    pageName: 'Home',
    link: '/home'
  },
  {
    pageName: 'Find a Doctor',
    link: '/search-doctor'
  }
]

export const settings: MenuSettingsInteface[] = [
  {
    menuItem: 'Profile Settings',
    link: '/user/profile-settings',
    action: false
  },
  {
    menuItem: 'Appointments',
    link: '/user/appointments',
    action: false
  },
  {
    menuItem: 'Logout',
    action: true
  }
]
