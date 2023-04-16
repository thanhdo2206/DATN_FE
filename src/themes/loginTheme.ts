import { createTheme } from '@mui/material'

export const customFontLoginTheme = createTheme({
  typography: {
    fontSize: 12
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0',
          fontSize: 13
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#000'
        }
      }
    }
  }
})
