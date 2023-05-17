import React from 'react'

import ButtonCustomize from '../../../components/ButtonCustomize'
import { IMedicalExamination } from '../../../interface/MedicalExaminationInterfaces'
import AdminDoctorOverviewInput from './AdminDoctorOverviewInput'
import AdminDoctorOverviewTextArea from './AdminDoctorOverviewTextArea'

type Props = {
  medical?: IMedicalExamination
}

const AdminDoctorOverview = (props: Props) => {
  const { medical } = props

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {}

  return (
    <div className='admin__doctor--overview'>
      <AdminDoctorOverviewInput title={medical?.title} />
      <AdminDoctorOverviewTextArea
        des={medical?.shortDescription}
        onChangeTextArea={handleChangeTextArea}
        rows={4}
        title='Short Description'
      />
      <div className='admim__btn--overview'>
        <ButtonCustomize text='Save' className='btn__department--add' />
      </div>
    </div>
  )
}

export default AdminDoctorOverview
