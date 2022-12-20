import React from 'react'
import PrimaryButton from '../UI/Button'
import SelectTest from '../UI/SelectTest'
import StyledSearchBar from '../UI/StyledSearchBar'
// import { PrimaryButton, SelectTest, StyledSearchBar } from './UI'
import styles from './SortSearch.module.scss'

const SortSearch = ({
  onClickModalHandle,
  selectedSort,
  sortList,
  searchQuery,
  onFilterNameHandle,
  eubData,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.navRow}>
        <PrimaryButton
          onClick={onClickModalHandle}
          sx={{
            width: '1/6',
            minHeight: '54px',
            padding: '0.2rem 2.625rem',
            marginRight: '1.25rem',
            background: '#ff006d',
            borderRadius: '1.875rem',
            border: '.0625rem solid #e1e6ed',
            fontSize: '1rem',
            transition: 'border-radius 0.4s',
            ':hover': {
              borderRadius: '.4rem',
              background: '#ff006d',
            },
          }}>
          Создать
        </PrimaryButton>
        <SelectTest
          value={selectedSort}
          label='Сортировка'
          onChange={sortList}
          options={[
            { value: '', name: 'Default' },
            { value: 'RFCNumber', name: 'По RFC номеру' },
            { value: 'CreatedAt', name: 'По дате' },
            { value: 'ResultDescription', name: 'По описанию' },
          ]}
        />
        <StyledSearchBar filterName={searchQuery} onFilterName={onFilterNameHandle} />
      </div>
      <div className={styles.recordsLength}>
        <span className={styles.recordsLength_text}>
          Всего записей: <b>{eubData.length}</b>
        </span>
      </div>
    </div>
  )
}

export default SortSearch
