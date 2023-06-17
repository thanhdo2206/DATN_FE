import React, { ChangeEvent, FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ProgressListener } from '../../components/Progress'
import { useAppDispatch } from '../../redux/hooks'
import {
  createDepartmentByAdmin,
  editDepartmentByAdmin
} from '../../redux/thunk/adminThunk/adminDepartmentThunk'

type Props = {
  inputEdit: string
  file: File | string
  id?: number
  handleClose: () => void
}

const ModalAddDepartmentBody = (props: Props) => {
  const { inputEdit, file, id, handleClose } = props
  const [textInput, setTextInput] = useState<string | undefined>(inputEdit)
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | string>(file)

  const dispatch = useAppDispatch()

  useEffect(() => {
    let isTextChange = false
    let isFileChange = false
    if (textInput !== inputEdit) {
      isTextChange = false
    }

    if (errorMsg && selectedFile !== file) {
      console.log(errorMsg)
      isFileChange = true
    }

    if (selectedFile === file) {
      isFileChange = true
    }

    if (isTextChange || isFileChange) {
      setDisabledBtn(true)
      return
    }
    setDisabledBtn(false)
  }, [textInput, errorMsg, selectedFile])

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setTextInput(value)
  }

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 10240
    const files = event.currentTarget.files
    if (files && files.length > 0) {
      const file = files[0]
      const fileSizeKiloBytes = file.size / 1024

      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setErrorMsg(
          'Your image is lager than maximum limit. Please choose a smaller image'
        )
        setSelectedFile(file)
        return
      }

      setErrorMsg('')
      setSelectedFile(file)
    }
  }

  const handleSubmitInput = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const dataDepartment = {
      name: textInput
    }
    const formData = new FormData()
    formData.append(
      'data',
      new Blob([JSON.stringify(dataDepartment)], {
        type: 'application/json'
      })
    )
    formData.append('file', selectedFile)

    const fetchCreateDepartmentApi = async () => {
      ProgressListener.emit('start')
      await dispatch(createDepartmentByAdmin(formData))
      ProgressListener.emit('stop')
      toast.success('Department created successfully!')
      handleClose()
    }

    const fetchEditDepartmentApi = async () => {
      ProgressListener.emit('start')
      await dispatch(editDepartmentByAdmin([formData, id as number]))
      toast.success('Department edited successfully!')
      ProgressListener.emit('stop')
      handleClose()
    }

    id ? fetchEditDepartmentApi() : fetchCreateDepartmentApi()
  }

  return (
    <form>
      <div className='department__form'>
        <div className='input__div--name'>
          <p className='department__form--label'>Department: </p>
          <input
            className='department__input'
            type='text'
            defaultValue={inputEdit}
            onChange={handleChangeInput}
          />
        </div>
        <div className='input__div--img'>
          <p className='input__p--title'>Choose Department Image:</p>
          <input
            type='file'
            id='avatar'
            name='avatar'
            accept='image/png, image/jpeg, image/jpg'
            max-size='1000'
            className='modal__input--avatar'
            onChange={handleFileChange}
          />
          <p className='modal__text--inform'>
            JPG, GIF or PNG. Max size of 10MB
          </p>
          <div className='input__div--error'>
            {errorMsg ? <p className='input__p--error'>{errorMsg}</p> : <></>}
          </div>
        </div>
      </div>

      <div className='department__div--btn'>
        <button
          className={`admin__btn ${disabledBtn ? 'admin__btn--disable' : ''}`}
          onClick={handleSubmitInput}
          disabled={disabledBtn}
        >
          Save Change
        </button>
      </div>
    </form>
  )
}

export default ModalAddDepartmentBody
