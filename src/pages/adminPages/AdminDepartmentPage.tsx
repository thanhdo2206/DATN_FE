import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Button,
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
import { TableCellProfile } from '../../themes/profileStyle'

interface Column {
  id: 'id' | 'departmentName' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  { id: 'id', label: '#', minWidth: 70 },
  { id: 'departmentName', label: 'Departments', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' }
]

interface TableDepartment {
  id: number
  departmentName: string
  departmentPicture: string
}

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

const rowsPerPage = 6

const rowsDepartment = [
  createDataTableDepartment(
    1,
    'Urology',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/specialities/specialities-01.png'
  ),
  createDataTableDepartment(
    2,
    'Urology',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/specialities/specialities-01.png'
  ),
  createDataTableDepartment(
    3,
    'Urology',
    'https://doccure.dreamguystech.com/html/template/admin/assets/img/specialities/specialities-01.png'
  )
]
const AdminDepartmentPage = () => {
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className='admin__department'>
      <div className='department__header'>
        <p className='department__p--title'>Departments</p>
        <ButtonCustomize
          text='Add Department'
          className='btn__department--add'
        />
      </div>
      <div className='department__body'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
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
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        if (column.id !== 'actions') {
                          const value = row[column.id]
                          return (
                            <TableCellProfile
                              key={column.id}
                              align={column.align}
                            >
                              {value === row.departmentName ? (
                                <>
                                  <div className='department__group--name'>
                                    <div className='department__picture'>
                                      <Avatar src={row.departmentPicture} />
                                    </div>
                                    <div className='department__name'>
                                      {row.departmentName}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                value
                              )}
                            </TableCellProfile>
                          )
                        }
                        return (
                          <TableCellProfile key={row.id}>
                            <div className='div__group--action'>
                              <Button
                                variant='contained'
                                className='btn__edit btn__group--action'
                                startIcon={<EditIcon />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant='contained'
                                className='btn__delete btn__group--action'
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button>
                            </div>
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
          count={rowsDepartment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  )
}

export default AdminDepartmentPage
