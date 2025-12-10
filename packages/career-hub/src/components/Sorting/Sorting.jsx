import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { setSortings } from '../../store/filterSlice';
import { SORTING_OPTIONS } from '../../utils/constants';
import { getCurrentSortingValue } from '../../utils/filter';
import styles from './Sorting.module.scss';

function Sorting() {
  const dispatch = useDispatch();
  const sortings = useSelector(
    (state) => state.scalantCareerHub?.filter?.sortings || []
  );

  // Determine current selected value based on sortings array
  const currentValue = useMemo(() => {
    return getCurrentSortingValue(sortings);
  }, [sortings]);

  const handleChange = (value) => {
    const selectedOption = SORTING_OPTIONS[value];
    if (selectedOption) {
      // Update sortings array with the selected mapping
      dispatch(setSortings([selectedOption.mapping]));
    }
  };

  const options = Object.values(SORTING_OPTIONS).map((option) => ({
    value: option.value,
    label:
      option.value === currentValue
        ? `Sorted By: ${option.label}`
        : option.label,
  }));

  // Render options in dropdown without prefix
  const optionRender = (option) => {
    const originalOption = SORTING_OPTIONS[option.value];
    return originalOption ? originalOption.label : option.label;
  };

  return (
    <Select
      className={styles.sorting}
      value={currentValue}
      onChange={handleChange}
      suffixIcon={<DownOutlined />}
      options={options}
      optionRender={optionRender}
    />
  );
}

export default Sorting;
