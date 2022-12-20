import { Container } from '@mui/material'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <Container maxWidth={'xl'}>
      <div className={styles.root}>
        <img
          className={styles.logo}
          src='https://upload.wikimedia.org/wikipedia/ru/thumb/0/0d/Eurasian_Bank.svg/1200px-Eurasian_Bank.svg.png'
          alt=''
        />
      </div>
      {/* <div className={styles.pad}></div>
    // <hr className={styles.line} /> */}
    </Container>
  )
}

export default Header
