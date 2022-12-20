import { navData } from '../../lib/navData'
import styles from './SideNav.module.scss'
import { NavLink as RouterLink } from 'react-router-dom'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ListItemIcon, ListItemButton } from '@mui/material'

const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  }),
)

const SideNav = () => {
  const [open, setopen] = useState(false)
  const toggleOpen = () => {
    setopen(!open)
  }
  return (
    <Box className={open ? styles.sidenav : styles.sidenavClosed}>
      {/* <img
        className={styles.logo}
        src='https://upload.wikimedia.org/wikipedia/ru/thumb/0/0d/Eurasian_Bank.svg/1200px-Eurasian_Bank.svg.png'
        alt=''
      /> */}
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
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
