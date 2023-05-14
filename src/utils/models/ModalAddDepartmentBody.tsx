import React, { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

type Props = {
  inputEdit: string
}

const ModalAddDepartmentBody = ({ inputEdit }: Props) => {
  const [textInput, setTextInput] = useState<string | undefined>(inputEdit)
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true)
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    value !== inputEdit ? setDisabledBtn(false) : setDisabledBtn(true)
    setTextInput(value)
  }

  const handleSubmitInput = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    alert(textInput)
  }

  return (
    <form>
      <div className='department__form'>
        <p className='department__form--label'>Department: </p>
        <input
          className='department__input'
          type='text'
          defaultValue={inputEdit}
          onChange={handleChangeInput}
        />
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
