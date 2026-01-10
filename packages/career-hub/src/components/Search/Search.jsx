import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { setKeyword } from '../../store/filterSlice';
import styles from './Search.module.scss';

function Search() {
  const dispatch = useDispatch();
  const keyword = useSelector(
    (state) => state.scalantCareerHub?.filter?.filters?.keyword || ''
  );
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState(keyword);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const handleIconClick = () => {
    setIsInputVisible(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear existing timer
    if (debounceTimerRef.current) {
      // eslint-disable-next-line no-undef
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounce
    // eslint-disable-next-line no-undef
    debounceTimerRef.current = setTimeout(() => {
      dispatch(setKeyword(value));
    }, 300);
  };

  const handleInputBlur = () => {
    // Only hide if input is empty
    if (!inputValue.trim()) {
      setIsInputVisible(false);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        // eslint-disable-next-line no-undef
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.search}>
      {isInputVisible || inputValue ? (
        <Input
          ref={inputRef}
          className={styles.input}
          placeholder="Search for job or Company Name"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          suffix={<SearchOutlined />}
        />
      ) : (
        <div className={styles.iconContainer} onClick={handleIconClick}>
          <SearchOutlined />
        </div>
      )}
    </div>
  );
}

export default Search;
