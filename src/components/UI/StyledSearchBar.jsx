import { styled, alpha } from '@mui/material/styles'
import { Toolbar, Typography, OutlinedInput, InputAdornment } from '@mui/material'
import Iconify from './Iconify'

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
}))

const transparent = alpha('#919EAB', 0.16)
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 200,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: `0 8px 16px 0 ${transparent}`,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}))

const StyledSearchBar = ({ numSelected, filterName, onFilterName }) => {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}>
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder='Поиск'
          startAdornment={
            <InputAdornment position='start'>
              <Iconify
                icon='eva:search-fill'
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}
    </StyledRoot>
  )
}

export default StyledSearchBar
