import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import React from 'react'

import '../../../assets/css/pages/doctorPages/schedule_timing.css'
import ModalSchedule from './ModalSchedule'

type Props = {}

const arrDayOfWeek = ['1', '2', '3']

export default function ScheduleTiming({}: Props) {
  const [value, setValue] = React.useState(arrDayOfWeek[1])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // console.log(newValue)
    setValue(newValue)
  }
  return (
    <div>
      <div className='container__schedule'>
        <div className='container__title'>
          <h3>Schedule Timing</h3>
        </div>

        <div className='schedule__widget'>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box className='schedule__header'>
                <TabList
                  onChange={handleChange}
                  aria-label='lab API tabs example'
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: 'transparent'
                    }
                  }}
                  className='tab__list'
                >
                  <Tab className='tab__header-item' label='SUNDAY' value='1' />
                  <Tab className='tab__header-item' label='MONDAY' value='2' />
                  <Tab className='tab__header-item' label='TUESDAY' value='3' />
                  <Tab
                    className='tab__header-item'
                    label='WEDNESDAY'
                    value='4'
                  />
                  <Tab
                    className='tab__header-item'
                    label='THURSDAY'
                    value='5'
                  />
                  <Tab className='tab__header-item' label='FRIDAY' value='6' />
                  <Tab
                    className='tab__header-item'
                    label='SATURDAY'
                    value='7'
                  />

                  {/* {arrDayOfWeek.map((item, index) => {
                    return (
                      <Tab
                        className='tab__header-item'
                        label={`tab${item}`}
                        value={item}
                      />
                    )
                  })}  */}
                </TabList>
              </Box>

              <div className='tab__content-title'>
                <h3>Time Slots</h3>
                <ModalSchedule day={value}/>
              </div>

              {arrDayOfWeek.map((item, index) => {
                return (
                  <TabPanel className='tab__content-item' value={item}>
                    <p>item of {item}</p>
                  </TabPanel>
                )
              })}

              {/* <TabPanel className='tab__content-item' value='1'>
                <div className='tab__content-title'>
                  <h3>Time Slots</h3>
                  <ModalSchedule />
                </div>
                <div className='tab__content-times'>
                  <div className='time__slot-item'>
                    8:00 pm - 11:30 pm
                    <CloseIcon className='delete__time-icon' />
                  </div>

                  <div className='time__slot-item'>
                    8:00 pm - 11:30 pm
                    <CloseIcon className='delete__time-icon' />
                  </div>
                </div>
              </TabPanel>

              <TabPanel className='tab__content-item' value='2'>
                Item Two
              </TabPanel>

              <TabPanel className='tab__content-item' value='3'>
                <div className='tab__content-title'>
                  <h3>Time Slots</h3>
                  <ModalSchedule />
                </div>
                <span>Not Available</span>
              </TabPanel> */}
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  )
}
