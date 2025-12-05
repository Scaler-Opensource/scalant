import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Search.module.scss';

function Search() {
  return (
    <div className={styles.search}>
      <SearchOutlined />
    </div>
  );
}

export default Search;

