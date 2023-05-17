import React from 'react'

import ButtonCustomize from '../../../components/ButtonCustomize'
import { IMedicalExamination } from '../../../interface/MedicalExaminationInterfaces'
import AdminDoctorOverviewTextArea from './AdminDoctorOverviewTextArea'

type Props = {
  medical?: IMedicalExamination
}

function AdminDoctorExperience(props: Props) {
  const { medical } = props

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {}

  return (
    <div className='admin__doctor--experience'>
      <AdminDoctorOverviewTextArea
        des={medical?.description}
        onChangeTextArea={handleChangeTextArea}
        rows={15}
        title='Description'
      />
      <div className='admim__btn--overview'>
        <ButtonCustomize text='Save' className='btn__department--add' />
      </div>
    </div>
  )
}

export default AdminDoctorExperience
