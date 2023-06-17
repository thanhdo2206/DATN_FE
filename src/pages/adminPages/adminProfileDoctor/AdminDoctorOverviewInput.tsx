import React from 'react'

import { useAppSelector } from '../../../redux/hooks'

type Props = {
  title?: string
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function AdminDoctorOverviewInput(props: Props) {
  const { title, onChangeTitle } = props
  const { doctorDetail } = useAppSelector((state) => state.admin)

  return (
    <div className='overview__div--title'>
      <p className='overview__p--title'>Title</p>
      <input
        type='text'
        className={`overview__input--title ${
          Boolean(doctorDetail.statusArchive) ? 'overview__input--disable' : ''
        }`}
        defaultValue={title}
        onChange={onChangeTitle}
        readOnly={Boolean(doctorDetail.statusArchive)}
      />
    </div>
  )
}

export default AdminDoctorOverviewInput
