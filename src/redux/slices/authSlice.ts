import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AuthErrResponse } from '../../interface/AuthInterface'
import { UserInformation, UserResponse } from '../../interface/UsersInterface'
import { FormLoginValues } from '../../interface/ValidateInterface'
import { loginServices } from '../../services/loginService'
import { getCurrentUser } from '../../services/userServices'
import { checkResponseSuccess } from '../../utils/checkResponseStatus'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface UserState {
  isAuth: boolean
  message: String
  loading: boolean
  currentUser: UserInformation
  role?: String
  isCheckInitialStatus: boolean
}

const initialState: UserState = {
  isAuth: false,
  message: '',
  loading: false,
  currentUser: {},
  role: '',
  isCheckInitialStatus: true
}

export const authSlice = createSlice({
  name: 'auths',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, action: any) => {
        state.message = action.payload.message
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
          state.message = ''
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.loading = false
          state.isAuth = false
          state.isCheckInitialStatus = false
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action: any) => {
          state.loading = false
          state.isAuth = true
          state.message = ''
          state.currentUser = action.payload
          state.role = action.payload.role
          state.isCheckInitialStatus = false
        }
      )
  }
})

export const loginUser = createAsyncThunk(
  'auth/login',
  async (dataLogin: FormLoginValues, { rejectWithValue }) => {
    const response: UserResponse & AuthErrResponse = await loginServices(
      dataLogin
    )
    if (checkResponseSuccess(response.status)) {
      return response.user
    }
    const rejectResponse = {
      message: response.message
    }
    return rejectWithValue(rejectResponse)
  }
)

export const updateAuth = createAsyncThunk(
  'auth/update',
  async (_, { rejectWithValue }) => {
    const response: UserResponse = await getCurrentUser()
    if (checkResponseSuccess(response.status)) {
      return response.user
    }
    return rejectWithValue('')
  }
)

const authReducer = authSlice.reducer
export default authReducer
