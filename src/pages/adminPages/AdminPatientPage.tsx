import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import React, { useState } from 'react'

import {
  AdminTableColumn,
  TablePatient
} from '../../interface/AdminTableInterface'
import { TableCellProfile } from '../../themes/profileStyle'
import AdminBreadCrumb from './adminBreadcrumb/AdminBreadCrumb'
import AdminPatientTableCell from './adminTable/AdminPatientTableCell'

const columns: AdminTableColumn[] = [
  { id: 'patientName', label: 'patients', minWidth: 170 },
  { id: 'gmail', label: 'gmail', minWidth: 170 },
  { id: 'phoneNumber', label: 'phone number', minWidth: 170 },
  { id: 'address', label: 'address', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' }
]

function createDataTablePatient(
  id: number,
  patientName: string,
  profilePicturePatient: string,
  gmail: string,
  phoneNumber: string,
  address: string
): TablePatient {
  return {
    id,
    patientName,
    profilePicturePatient,
    gmail,
    phoneNumber,
    address
  }
}

const rowsPerPage = 5

const rowsPatient = [
  createDataTablePatient(
    1,
    'patient name',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'patient@gmail.com',
    '0987112345',
    '20 Ton Duc Thang, quan Lien Chieu, Da Nang'
  ),
  createDataTablePatient(
    2,
    'patient name',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'patient@gmail.com',
    '0987112345',
    '20 Ton Duc Thang, quan Lien Chieu, Da Nang'
  ),
  createDataTablePatient(
    3,
    'patient name',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'patient@gmail.com',
    '0987112345',
    '20 Ton Duc Thang, quan Lien Chieu, Da Nang'
  ),
  createDataTablePatient(
    4,
    'patient name',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'patient@gmail.com',
    '0987112345',
    '20 Ton Duc Thang, quan Lien Chieu, Da Nang'
  ),
  createDataTablePatient(
    5,
    'patient name',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'patient@gmail.com',
    '0987112345',
    '20 Ton Duc Thang, quan Lien Chieu, Da Nang'
  ),
  createDataTablePatient(
    6,
    'patient name',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/patients/patient2.jpg',
    'patient@gmail.com',
    '0987112345',
    '20 Ton Duc Thang, quan Lien Chieu, Da Nang'
  )
]

const AdminPatientPage = () => {
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className='admin__patients--contianer'>
      <div className='admin__table--header'>
        <AdminBreadCrumb breadcrumbTitle='Patients' />
      </div>
      <div className='admin__table--body'>
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
              {rowsPatient
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <AdminPatientTableCell
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
          count={rowsPatient.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  )
}

export default AdminPatientPage
