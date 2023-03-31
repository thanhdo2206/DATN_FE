import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useDispatch } from 'react-redux'

import Button from '../../../components/ButtonCustomize'
import { ICategory } from '../../../interface/CategoryInterfaces'
import { IMedicalExaminationFilter } from '../../../interface/MedicalExaminationInterfaces'
import { DispatchType } from '../../../redux/configStore'
import {
  filterMedicalExaminationTimeThunkByCategory,
  filterMedicalExaminationTimeThunkByCategoryAndPrice
} from '../../../redux/reducers/medicalExaminationReducer'
import { getAllCategoryService } from '../../../service/categoryService'

type Props = {}

type checkOptions = {
  [key: string]: boolean
}

export default function FilterDoctor(props: Props) {
  const dispatch: DispatchType = useDispatch()

  const [categories, setCategories] = useState<ICategory[]>()
  const getAllCategories = async () => {
    const arrCategory = await getAllCategoryService()
    setCategories(arrCategory)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  const createInitialCategoryCheck = () => {
    const arrNameCategory = categories?.map((item) => item.name)
    const initialCategoryCheck: checkOptions = {}
    arrNameCategory?.forEach((item) => {
      initialCategoryCheck[item] = false
    })
    return initialCategoryCheck
  }

  const [categoryCheck, setCategoryCheck] = useState<checkOptions>(
    createInitialCategoryCheck()
  )

  const formik = useFormik<IMedicalExaminationFilter>({
    initialValues: {
      category: [],
      minPrice: 0,
      maxPrice: 0
    },
    onSubmit: (values) => {
      let { category, minPrice, maxPrice } = values

      dispatch(
        filterMedicalExaminationTimeThunkByCategoryAndPrice(
          category,
          minPrice,
          maxPrice
        )
      )

      setFieldValue('minPrice', 0)
      setFieldValue('maxPrice', 0)
    }
  })

  const { handleChange, handleSubmit, setFieldValue, values } = formik

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event)
    const objCategoryCheck = { ...categoryCheck }
    objCategoryCheck[event.target.value] = event.target.checked
    const arrCategory = Object.keys(objCategoryCheck).filter(
      (item) => objCategoryCheck[item]
    )
    dispatch(filterMedicalExaminationTimeThunkByCategory(arrCategory))

    setCategoryCheck(objCategoryCheck)
  }

  return (
    <div className='filter__container'>
      <form action='' className='form__filter' onSubmit={handleSubmit}>
        <div className='select__form-object filter__doctor'>
          <div className='filter__header'>
            <h3>Categories</h3>
          </div>
          <div className='filter__widget filter__checkbox'>
            {categories?.map((category, index) => {
              return (
                <div key={index}>
                  <label className='custom_check'>
                    <input
                      onChange={handleChangeCheckbox}
                      type='checkbox'
                      name='category'
                      value={category.name}
                    />
                    <span className='checkmark' /> {category.name}
                  </label>
                </div>
              )
            })}
          </div>
        </div>

        <div className='form__price__range filter__doctor'>
          <div className='filter__header'>
            <h3> Examination Price Range</h3>
          </div>
          <div className='container__price__range filter__widget'>
            <CurrencyInput
              placeholder='From'
              name='minPrice'
              className='input__price min__price'
              intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
              groupSeparator='.'
              onValueChange={(value) => {
                !value
                  ? setFieldValue('minPrice', 0)
                  : setFieldValue('minPrice', Number(value))
              }}
              defaultValue={0}
              value={values.minPrice}
            />
            <span className='separator__symbol'>-</span>

            <CurrencyInput
              placeholder='To'
              onValueChange={(value) => {
                !value
                  ? setFieldValue('maxPrice', 0)
                  : setFieldValue('maxPrice', Number(value))
              }}
              defaultValue={0}
              name='maxPrice'
              className='input__price max__price'
              intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
              groupSeparator='.'
              value={values.maxPrice}
            />
          </div>
          <Button text='Apply' className='btn__apply' />
        </div>
      </form>
    </div>
  )
}
