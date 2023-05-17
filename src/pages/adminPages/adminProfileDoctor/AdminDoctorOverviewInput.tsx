import React from 'react'

type Props = {
  title?: string
}

function AdminDoctorOverviewInput(props: Props) {
  const { title } = props
  return (
    <div className='overview__div--title'>
      <p className='overview__p--title'>Title</p>
      <input
        type='text'
        className='overview__input--title'
        defaultValue={title}
      />
    </div>
  )
}

export default AdminDoctorOverviewInput
