import { Avatar, TableRow } from '@mui/material'

import {
  AdminTableColumn,
  TableDepartment
} from '../../../interface/AdminTableInterface'
import { TableCellProfile } from '../../../themes/profileStyle'
import AdminGroupBtnAction from './AdminGroupBtnAction'

interface Props {
  columns: AdminTableColumn[]
  row: TableDepartment
}

const AdminDepartmentTableCell = (props: Props) => {
  const { columns, row } = props

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      {columns.map((column: AdminTableColumn) => {
        if (column.id === 'actions') {
          return (
            <TableCellProfile key={column.id}>
              <AdminGroupBtnAction departmentName={row.departmentName} />
            </TableCellProfile>
          )
        }
        const columnId = column.id as keyof typeof row
        const value = row[columnId]
        return (
          <TableCellProfile key={column.id} align={column.align}>
            {value === row.departmentName ? (
              <>
                <div className='department__group--name'>
                  <div className='department__picture'>
                    <Avatar src={row.departmentPicture} />
                  </div>
                  <div className='department__name'>{row.departmentName}</div>
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
}

export const FooterModalDelete = () => {
  return (
    <div className='footer__group--delete'>
      <button className='admin__btn admin__btn--cancle'>Cancle</button>
      <button className='admin__btn admin__btn-delete'>Delete</button>
    </div>
  )
}

export default AdminDepartmentTableCell
