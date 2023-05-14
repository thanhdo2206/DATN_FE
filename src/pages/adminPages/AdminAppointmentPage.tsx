import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { useState } from 'react'

import {
  AdminTableColumn,
  TableAppointment
} from '../../interface/AdminTableInterface'
import { TableCellProfile } from '../../themes/profileStyle'
import AdminBreadCrumb from './adminBreadcrumb/AdminBreadCrumb'
import AdminAppointmentTableCell from './adminTable/AdminAppointmentTableCell'

const columns: AdminTableColumn[] = [
  { id: 'doctorName', label: 'Doctors', minWidth: 170 },
  { id: 'patientName', label: 'Patients', minWidth: 170 },
  { id: 'apptDate', label: 'Appointment Date', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 10 },
  { id: 'actions', label: 'Actions', minWidth: 70, align: 'right' }
]

function createDataTableAppointment(
  id: number,
  doctorName: string,
  profilePictureDoctor: string,
  patientName: string,
  profilePicturePatient: string,
  apptDate: string,
  startTime: string,
  endTime: string,
  status: number
): TableAppointment {
  return {
    id,
    doctorName,
    profilePictureDoctor,
    patientName,
    profilePicturePatient,
    apptDate,
    startTime,
    endTime,
    status
  }
}

const rowsPerPage = 5

const rowsDepartment = [
  createDataTableAppointment(
    1,
    'Darren Elder',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/doctors/doctor-thumb-02.jpg',
    'Travis Trimble',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'Monday - 4/17/2023',
    '11.00 AM',
    '11.35 AM',
    0
  ),
  createDataTableAppointment(
    2,
    'Darren Elder',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/doctors/doctor-thumb-02.jpg',
    'Travis Trimble',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'Monday - 4/17/2023',
    '11.00 AM',
    '11.35 AM',
    1
  ),
  createDataTableAppointment(
    3,
    'Darren Elder',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/doctors/doctor-thumb-02.jpg',
    'Travis Trimble',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'Monday - 4/17/2023',
    '11.00 AM',
    '11.35 AM',
    2
  )
]

const AdminAppointmentPage = () => {
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className='admin__appointment'>
      <div className='admin__appointment--header'>
        <AdminBreadCrumb breadcrumbTitle='Appointments' />
      </div>
      <div className='admin__appointment--body'>
        <div className='admin__appointment--table'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead className='admin__table--head'>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCellProfile
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCellProfile>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsDepartment
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <AdminAppointmentTableCell
                        columns={columns}
                        row={row}
                        key={row.id}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[6]}
            component='div'
            count={rowsDepartment.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminAppointmentPage
