import AddIcon from '@mui/icons-material/Add'
import { TablePagination } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'

import '../../assets/css/pages/adminPage/admin_doctor_page.css'
import ButtonCustomize from '../../components/ButtonCustomize'
import { TableDoctor } from '../../interface/AdminTableInterface'
import AdminBreadCrumb from './adminBreadcrumb/AdminBreadCrumb'

function createDataTableDoctor(
  id: number,
  doctorname: string,
  profilePictureDoctor: string,
  departmentName: string
): TableDoctor {
  return {
    id,
    doctorname,
    profilePictureDoctor,
    departmentName
  }
}

const rowsPerPage = 10

const rowsPatient = [
  createDataTableDoctor(
    1,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/01.jpg',
    'department'
  ),
  createDataTableDoctor(
    2,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/02.jpg',
    'department'
  ),
  createDataTableDoctor(
    3,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/03.jpg',
    'department'
  ),
  createDataTableDoctor(
    4,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/04.jpg',
    'department'
  ),
  createDataTableDoctor(
    5,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/05.jpg',
    'department'
  ),
  createDataTableDoctor(
    6,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/06.jpg',
    'department'
  ),
  createDataTableDoctor(
    7,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/07.jpg',
    'department'
  ),
  createDataTableDoctor(
    8,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/08.jpg',
    'department'
  ),
  createDataTableDoctor(
    9,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/09.jpg',
    'department'
  ),
  createDataTableDoctor(
    10,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/10.jpg',
    'department'
  ),
  createDataTableDoctor(
    11,
    'doctor name',
    'https://shreethemes.in/doctris/layouts/assets/images/doctors/10.jpg',
    'department'
  )
]

function AdminDoctorPage() {
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className='admin__doctors--container'>
      <div className='admin__table--header'>
        <AdminBreadCrumb breadcrumbTitle='Doctors' />
        <ButtonCustomize
          text='Add'
          className='btn__department--add'
          icon={<AddIcon />}
        />
      </div>
      <div className='admin__table--body'>
        <Grid container spacing={2} className='admin__grid--doctor'>
          {rowsPatient
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <Grid item xs={2.3} key={row.id} className='doctor__div--box'>
                  <div className='doctor__div--container'>
                    <div className='doctor__div--header'>
                      <img
                        src={row.profilePictureDoctor}
                        alt=''
                        className='doctor__img'
                      />
                    </div>
                    <div className='doctor__div--body'>
                      <p className='doctor__p--name'>{row.doctorname}</p>
                      <span className='doctor__span--department'>
                        {row.departmentName}
                      </span>
                    </div>
                  </div>
                </Grid>
              )
            })}
        </Grid>
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

export default AdminDoctorPage
