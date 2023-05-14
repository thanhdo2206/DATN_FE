import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { Button } from '@mui/material'
import React, { useState } from 'react'

import AdminModelCustomize from '../../../utils/models/AdminModelCustomize'
import ModalAddDepartmentBody from '../../../utils/models/ModalAddDepartmentBody'
import AdminAppointmentDetail from '../adminAppointment/AdminAppointmentDetail'
import { FooterModalDelete } from './AdminDepartmentTableCell'

type Props = {
  departmentName?: string
  apptId?: number
}

interface openModelDepartment {
  openEdit: boolean
  openDelete: boolean
  openView: boolean
}

const AdminGroupBtnAction = (props: Props) => {
  const { departmentName, apptId } = props
  const [open, setOpen] = useState<openModelDepartment>({
    openEdit: false,
    openDelete: false,
    openView: false
  })

  const handleOpen = (status?: string) => {
    status === 'edit'
      ? setOpen({
          ...open,
          openEdit: true
        })
      : status === 'delete'
      ? setOpen({
          ...open,
          openDelete: true
        })
      : setOpen({
          ...open,
          openView: true
        })
  }

  const handleClose = (status?: string) => {
    status === 'edit'
      ? setOpen({
          ...open,
          openEdit: false
        })
      : status === 'delete'
      ? setOpen({
          ...open,
          openDelete: false
        })
      : setOpen({
          ...open,
          openView: false
        })
  }
  return (
    <>
      <div className='div__group--action'>
        {departmentName ? (
          <Button
            onClick={() => handleOpen('edit')}
            variant='contained'
            className='btn__edit btn__group--action'
            startIcon={<EditIcon />}
          />
        ) : (
          <></>
        )}

        {departmentName ? (
          <Button
            onClick={() => handleOpen('delete')}
            variant='contained'
            className='btn__delete btn__group--action'
            startIcon={<DeleteIcon />}
          />
        ) : (
          <></>
        )}

        {apptId ? (
          <Button
            onClick={() => handleOpen('view')}
            variant='contained'
            className='btn__view btn__group--action'
            startIcon={<RemoveRedEyeIcon />}
          />
        ) : (
          <></>
        )}
      </div>

      <div>
        {departmentName ? (
          <>
            <AdminModelCustomize
              classNameHeader='success'
              title='Edit Department'
              open={open.openEdit}
              handleClose={() => handleClose('edit')}
              bodyModal={<ModalAddDepartmentBody inputEdit={departmentName} />}
            />
            <AdminModelCustomize
              classNameHeader='danger'
              title='Delete Department'
              open={open.openDelete}
              handleClose={() => handleClose('delete')}
              titleDelete='You are about to delete this department'
              desDelete='This will delete this department. Are you sure?'
              footerModal={<FooterModalDelete />}
            />
          </>
        ) : (
          <></>
        )}

        {apptId ? (
          <AdminModelCustomize
            classNameHeader='success'
            classNameContainer='admin__modal--detailAppt'
            title='Detail Appointment'
            // open={true}
            open={open.openView}
            handleClose={() => handleClose('view')}
            bodyModal={<AdminAppointmentDetail idAppointment={apptId} />}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default AdminGroupBtnAction
