import RFCTable from '../components/RFCTable'
import Header from '../components/Header'
import SideNav from '../components/SideNav'
import styles from './Rfc.module.scss'

const Rfc = () => {
  return (
    <div className={styles.root}>
      <Header />
      <RFCTable />
    </div>
  )
}

export default Rfc
