import RemoveIcon from '@mui/icons-material/Remove'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import '../../assets/css/pages/adminPage/admin_doctor_profile.css'
import ButtonCustomize from '../../components/ButtonCustomize'
import HeaderNav from '../../components/header/HeaderNav'
import {
  NavListInterface,
  NavListStatus
} from '../../interface/HeaderInterface'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getDetailMedicalExaminationTimeThunk } from '../../redux/slices/medicalExaminationSlice'
import AdminModelCustomize from '../../utils/models/AdminModelCustomize'
import AdminBreadCrumb from './adminBreadcrumb/AdminBreadCrumb'
import AdminDoctorExperience from './adminProfileDoctor/AdminDoctorExperience'
import AdminDoctorOverview from './adminProfileDoctor/AdminDoctorOverview'
import AdminDoctorReview from './adminProfileDoctor/AdminDoctorReview'
import AdminDoctorSettings from './adminProfileDoctor/AdminDoctorSettings'
import { FooterModalDelete } from './adminTable/AdminDepartmentTableCell'

type Props = {}

export const navList: NavListInterface[] = [
  {
    name: 'Overview',
    status: 'overview',
    isActive: true
  },
  {
    name: 'Experience',
    status: 'experience',
    isActive: false
  },
  {
    name: 'Review',
    status: 'review',
    isActive: false
  },
  {
    name: 'Settings',
    status: 'settings',
    isActive: false
  }
]

const AdminProfileDoctorPage = (props: Props) => {
  const [navListActive, setNavListActive] =
    useState<NavListInterface[]>(navList)

  const dispatch = useAppDispatch()

  const params = useParams()

  const getDetailExamination = async () => {
    const id: string | undefined = params.id
    dispatch(getDetailMedicalExaminationTimeThunk(id as string))
  }

  useEffect(() => {
    getDetailExamination()
  }, [navListActive])

  const { medicalExaminationDetail } = useAppSelector(
    (state) => state.medicalExaminationReducer
  )

  const medical = medicalExaminationDetail?.medicalExamination
  const handleClickNavItem = (status: NavListStatus) => {
    const navListClone = [...navListActive]
    navListClone.forEach((item) => {
      item.status === status ? (item.isActive = true) : (item.isActive = false)
    })
    setNavListActive(navListClone)
  }

  const [openModel, setOpenModel] = useState<boolean>(false)

  const handleCloseModel = () => {
    setOpenModel(false)
  }

  const hadleOpenModel = () => {
    setOpenModel(true)
  }

  return (
    <div className='admin__doctor--profile'>
      <div className='admin__table--header'>
        <AdminBreadCrumb breadcrumbTitle='Profile Doctor' />
        <ButtonCustomize
          onClickBtn={hadleOpenModel}
          text='Archive'
          className='btn__department--add btn__archive'
          icon={<RemoveIcon />}
        />
      </div>
      <div className='admin__table--body'>
        <div className='doctor__profile--container'>
          <div className='doctor__profile--header'>
            <div className='profile__box--banner'></div>
            <div className='profile__box--avatar'>
              <Avatar
                src='https://shreethemes.in/doctris/layouts/assets/images/doctors/01.jpg'
                className='profile__img'
              />
              <div className='profile__box--des'>
                <div className='profile__p--name'>Dr. Calvin Carlo</div>
                <div className='profile__span--department'>Orthopedic</div>
              </div>
            </div>
            <div className='profile__box--nav'>
              <HeaderNav
                navList={navListActive}
                onClickNavItem={handleClickNavItem}
              />
            </div>
          </div>
          <div className='doctor__profile--body'>
            {navListActive.map((item) => {
              if (item.isActive === true && item.status === 'overview') {
                return <AdminDoctorOverview key={item.name} medical={medical} />
              }
              if (item.isActive === true && item.status === 'experience') {
                return (
                  <AdminDoctorExperience key={item.name} medical={medical} />
                )
              }
              if (item.isActive === true && item.status === 'review') {
                return <AdminDoctorReview key={item.name} />
              }
              if (item.isActive === true && item.status === 'settings') {
                return (
                  <AdminDoctorSettings
                    key={item.name}
                    id={params.id ? parseInt(params.id) : undefined}
                  />
                )
              }
              return <div key={item.name}></div>
            })}
          </div>
        </div>
      </div>
      <AdminModelCustomize
        classNameHeader='danger'
        title='Archive Doctor'
        open={openModel}
        handleClose={handleCloseModel}
        titleDelete='You are about to delete this doctor'
        desDelete='This will archive this doctor. Are you sure?'
        footerModal={<FooterModalDelete />}
      />
    </div>
  )
}

export default AdminProfileDoctorPage
