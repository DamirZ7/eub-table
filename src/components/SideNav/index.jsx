import { navData } from '../../lib/navData'
import styles from './SideNav.module.scss'
import { NavLink as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ListItemButton } from '@mui/material'
import Iconify from '../UI/Iconify'

const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 58,

    position: 'relative',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.success,
  }),
)

const SideNav = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }
  return (
    <Box className={open ? styles.sidenav : styles.sidenavClosed}>
      <img
        className={styles.logo}
        src='https://cdn6.aptoide.com/imgs/1/8/4/1842e9ca3da74313bf57cae42095eb07_icon.png'
        alt=''
      />

      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? (
          <Iconify icon={'material-symbols:keyboard-double-arrow-left-rounded'} />
        ) : (
          <Iconify icon={'material-symbols:keyboard-double-arrow-right-rounded'} />
        )}
        {/* <Typography className={styles.linkText}>EubBank</Typography> */}
        {/* {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />} */}
      </button>

      {navData.map((item) => {
        return (
          <StyledNavItem
            component={RouterLink}
            key={item.id}
            className={styles.sideitem}
            to={item.link}>
            {item.icon}
            <Typography className={styles.linkText}>{item.text}</Typography>
          </StyledNavItem>
        )
      })}
    </Box>
  )
}

export default SideNav
