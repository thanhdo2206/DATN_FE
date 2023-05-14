import AddIcon from '@mui/icons-material/Add'
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

import '../../assets/css/pages/adminPage/admin_department_page.css'
import ButtonCustomize from '../../components/ButtonCustomize'
import {
  AdminTableColumn,
  TableDepartment
} from '../../interface/AdminTableInterface'
import { TableCellProfile } from '../../themes/profileStyle'
import AdminModelCustomize from '../../utils/models/AdminModelCustomize'
import ModalAddDepartmentBody from '../../utils/models/ModalAddDepartmentBody'
import AdminBreadCrumb from './adminBreadcrumb/AdminBreadCrumb'
import AdminDepartmentTableCell from './adminTable/AdminDepartmentTableCell'

const urology = require('../../assets/img/departments/urology.png')

const columns: AdminTableColumn[] = [
  { id: 'id', label: '#', minWidth: 70 },
  { id: 'departmentName', label: 'Departments', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' }
]

function createDataTableDepartment(
  id: number,
  departmentName: string,
  departmentPicture: string
): TableDepartment {
  return {
    id,
    departmentName,
    departmentPicture
  }
}

const rowsPerPage = 5

const rowsDepartment = [
  createDataTableDepartment(1, 'Urology', urology),
  createDataTableDepartment(2, 'Urology', urology),
  createDataTableDepartment(3, 'Urology', urology),
  createDataTableDepartment(4, 'Urology', urology),
  createDataTableDepartment(5, 'Urology', urology),
  createDataTableDepartment(6, 'Urology', urology),
  createDataTableDepartment(7, 'abc', urology)
]

const AdminDepartmentPage = () => {
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const handleOpenAdd = () => setOpenAdd(true)
  const handleCloseAdd = () => setOpenAdd(false)

  return (
    <div className='admin__department'>
      <div className='department__header'>
        <AdminBreadCrumb breadcrumbTitle='Departments' />
        <ButtonCustomize
          text='Add'
          className='btn__department--add'
          onClickBtn={() => handleOpenAdd()}
          icon={<AddIcon />}
        />
      </div>
      <div className='department__body'>
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
                .map((row, index) => {
                  return (
                    <AdminDepartmentTableCell
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
      <AdminModelCustomize
        classNameHeader='success'
        title='Add Department'
        open={openAdd}
        handleClose={() => handleCloseAdd()}
        bodyModal={<ModalAddDepartmentBody inputEdit='' />}
      />
    </div>
  )
}
export default AdminDepartmentPage
