import React from 'react'
import Avatar from 'react-avatar'
import { NavLink } from 'react-router-dom'

import { IMedicalExamination } from '../../../interface/MedicalExaminationInterfaces'

type Props = {
  medical: IMedicalExamination
}

export default function ShortDescriptionDoctor(props: Props) {
  const { medical } = props

  return (
    <>
      <div className='container__description'>
        <div className=''>
          {medical.image ? (
            <img className='img__doctor' src={medical.image} alt='' />
          ) : (
            //TODO:
            <Avatar facebookId='100008343750912' size='120' round={true} />
          )}

          <div className='btn__detail'>
            <NavLink
              className='link__see-more'
              to={`/home/examination/detail/${medical?.id}`}
            >
              See detail
            </NavLink>
          </div>
        </div>
        <div className='container__infor'>
          <NavLink
            to={`/home/examination/detail/${medical?.id}`}
            className='title__doctor'
          >
            {medical.title}
          </NavLink>
          <div className='container__short__description'>
            {medical.shortDescription
              .split('\n')
              .map((item: string, index: number) => {
                return (
                  <span className='text_short' key={index}>
                    {item}
                  </span>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
