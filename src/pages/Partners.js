import React from 'react'
import styles from './Partners.module.scss'
import Header from '../components/Header'
import PartnersTable from '../components/PartnersTable'

const Partners = () => {
  return (
    <div className={styles.root}>
      <Header />
      <PartnersTable />
    </div>
  )
}

export default Partners
