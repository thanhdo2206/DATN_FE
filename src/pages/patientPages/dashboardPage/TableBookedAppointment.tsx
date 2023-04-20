import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { getListAppointment } from '../../../redux/thunk/appointmentThunk'
import { TableCellProfile } from '../../../themes/profileStyle'
import { convertVND } from '../../../utils/convertMoney'
import { addHoursToDate, formatDate, getTimeZone } from '../../../utils/date'

interface Column {
  id: 'doctorName' | 'apptDate' | 'startTime' | 'endTime' | 'price' | 'status'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  { id: 'doctorName', label: 'Doctor Name', minWidth: 170 },
  { id: 'apptDate', label: 'Appt Date', minWidth: 100 },
  { id: 'startTime', label: 'Start Time', minWidth: 100 },
  { id: 'endTime', label: 'End Time', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 }
]

interface Data {
  doctorName: string
  profilePicture: string
  departmentName: string
  apptDate: string
  startTime: string
  endTime: string
  price: string
  status: number
}

function createData(
  doctorName: string,
  profilePicture: string,
  departmentName: string,
  apptDate: string,
  startTime: string,
  endTime: string,
  price: string,
  status: number
): Data {
  return {
    doctorName,
    profilePicture,
    departmentName,
    apptDate,
    startTime,
    endTime,
    price,
    status
  }
}

const rowsPerPage = 6

function TableBookedAppointment() {
  const [page, setPage] = useState(0)
  const [appointmentRows, setAppointmentRows] = useState<Data[]>([])
  const dispatch = useAppDispatch()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const { listAppointments } = useAppSelector((state) => state.appointments)

  useEffect(() => {
    if (listAppointments.length === 0) {
      const fetchApiGetListAppointment = async () => {
        await dispatch(getListAppointment())
      }
      fetchApiGetListAppointment()
      return
    }

    const appointments = listAppointments.map((appointment) => {
      const date = new Date(appointment.startTime)
      return createData(
        `Dr. ${appointment.firstNameDoctor} ${appointment.lastNameDoctor}`,
        `${appointment.imageDoctor}`,
        `${appointment.nameDepartment}`,
        `${formatDate(date)}`,
        `${getTimeZone(appointment.startTime)}`,
        `${getTimeZone(addHoursToDate(date, appointment.duration))}`,
        `${convertVND.format(appointment.examinationPrice)}`,
        appointment.status
      )
    })
    setAppointmentRows(appointments)
  }, [])

  return (
    <>
      <div className='table__container'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCellProfile
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCellProfile>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.apptDate}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCellProfile
                            key={column.id}
                            align={column.align}
                          >
                            {value === row.doctorName ? (
                              <>
                                <div className='doctor__group--name'>
                                  <div className='doctor__profile--picture'>
                                    <Avatar src={`${row.profilePicture}`} />
                                  </div>
                                  <div className='doctor__name'>
                                    {row.doctorName}
                                    <span>{row.departmentName}</span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              value
                            )}
                          </TableCellProfile>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[6]}
          component='div'
          count={appointmentRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  )
}

export default TableBookedAppointment
