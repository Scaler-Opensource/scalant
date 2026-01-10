import React, { useMemo, useEffect, useCallback } from 'react';
import { Select, Row, Col, Space, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRatingFilterInput,
  deleteRatingFilterInput,
  updateRatingFilterInput,
} from '../../store/filterFormSlice';
import PropTypes from 'prop-types';

/**
 * ExpertMbeRating component for managing Expert Mock Interview Skills Required
 * Allows users to add multiple skill-rating pairs with add/remove functionality
 */
const ExpertMbeRating = ({ fieldName, subjectOptions, ratingOptions }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.scalantCareerHub.filterForm);

  const fieldValue = formData[fieldName];
  const fieldValues = useMemo(() => fieldValue || {}, [fieldValue]);

  // Memoize filterInputValues to avoid dependency issues
  const filterInputValues = useMemo(() => {
    return typeof fieldValues === 'object' && !Array.isArray(fieldValues)
      ? fieldValues
      : {};
  }, [fieldValues]);

  // Initialize field if it doesn't exist
  useEffect(() => {
    if (!fieldValues || Object.keys(filterInputValues).length === 0) {
      dispatch(addRatingFilterInput());
    }
  }, [fieldValues, filterInputValues, dispatch]);

  // Get selected subject keys to filter options
  const selectedSubjectKeys = useMemo(() => {
    return Object.values(filterInputValues)
      .map((item) => item?.subject?.key || item?.subject)
      .filter(Boolean);
  }, [filterInputValues]);

  // Filter out already selected subjects
  const filteredSubjectOptions = useMemo(() => {
    return subjectOptions.filter(
      (option) => !selectedSubjectKeys.includes(option.key)
    );
  }, [subjectOptions, selectedSubjectKeys]);

  const addNewInputField = useCallback(() => {
    dispatch(addRatingFilterInput());
  }, [dispatch]);

  const removeInputField = useCallback(
    (inputFieldKey) => {
      dispatch(deleteRatingFilterInput({ inputFieldKey }));
    },
    [dispatch]
  );

  const handleSubjectChange = useCallback(
    (inputFieldKey, value) => {
      const option = subjectOptions.find((opt) => opt.key === value);
      dispatch(
        updateRatingFilterInput({
          inputFilterSubKey: `${inputFieldKey}_subject`,
          value: option || value,
        })
      );
    },
    [subjectOptions, dispatch]
  );

  const handleRatingChange = useCallback(
    (inputFieldKey, value) => {
      dispatch(
        updateRatingFilterInput({
          inputFilterSubKey: `${inputFieldKey}_rating`,
          value,
        })
      );
    },
    [dispatch]
  );

  const inputKeys = Object.keys(filterInputValues);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      {inputKeys.map((inputFieldKey) => {
        const currentValue = filterInputValues[inputFieldKey];
        const subjectValue =
          currentValue?.subject?.key || currentValue?.subject;
        const ratingValue = currentValue?.rating;

        // Include selected subject in options for this field
        const availableSubjectOptions = [
          ...subjectOptions.filter((opt) => opt.key === subjectValue),
          ...filteredSubjectOptions,
        ];

        return (
          <Row key={inputFieldKey} gutter={16} align="middle">
            <Col span={10}>
              <Select
                placeholder="Select skill"
                value={subjectValue}
                onChange={(value) => handleSubjectChange(inputFieldKey, value)}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={availableSubjectOptions.map((opt) => ({
                  label: opt.value,
                  value: opt.key,
                }))}
              />
            </Col>
            <Col span={10}>
              <Select
                placeholder="Select rating"
                value={ratingValue}
                onChange={(value) => handleRatingChange(inputFieldKey, value)}
                options={ratingOptions.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            </Col>
            <Col span={4}>
              <Space>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={addNewInputField}
                  style={{ color: '#1890ff' }}
                />
                {inputKeys.length > 1 && (
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeInputField(inputFieldKey)}
                    danger
                  />
                )}
              </Space>
            </Col>
          </Row>
        );
      })}
    </Space>
  );
};

ExpertMbeRating.propTypes = {
  fieldName: PropTypes.string.isRequired,
  subjectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string,
    })
  ).isRequired,
  ratingOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ).isRequired,
};

export default ExpertMbeRating;
