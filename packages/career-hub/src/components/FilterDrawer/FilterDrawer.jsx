import React from 'react';
import { Button, Drawer, Flex } from 'antd';
import { FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { closeFilterModal } from '../../store/dashboardSlice';
import { updateFiltersFromForm } from '../../store/filterSlice';
import { resetForm } from '../../store/filterFormSlice';
import FilterForm from './FilterForm';

import styles from './FilterDrawer.module.scss';

function FilterDrawerTitle({ onClose }) {
  return (
    <Flex vertical>
      <Flex justify="space-between">
        <Flex align="center" gap={5}>
          <FilterOutlined className={styles.filterIcon} />
          Filters
        </Flex>

        <CloseOutlined onClick={onClose} />
      </Flex>
      <div className={styles.drawerHeaderSubtitle}>
        Choose the kind of jobs you'd like to see displayed on this page
      </div>
    </Flex>
  );
}

function FilterDrawer() {
  const dispatch = useDispatch();
  const open = useSelector(
    (state) => state.scalantCareerHub.dashboard.filterModalOpen
  );
  const formData = useSelector((state) => state.scalantCareerHub.filterForm);

  const onClose = () => {
    dispatch(closeFilterModal());
  };

  const handleApply = () => {
    // Transform form data to filter format
    const filterData = {
      role_type: formData.role_type || undefined,
      company_ids: formData.company_ids?.length
        ? formData.company_ids
        : undefined,
      job_title: formData.job_title?.length ? formData.job_title : undefined,
      job_category: formData.job_category?.length
        ? formData.job_category
        : undefined,
      seniority_level: formData.seniority_level?.length
        ? formData.seniority_level
        : undefined,
      location: formData.location?.length ? formData.location : undefined,
      min_ctc: formData.min_ctc || undefined,
      min_stipend: formData.min_stipend || undefined,
      min_duration: formData.min_duration || undefined,
      notice_period: formData.notice_period || undefined,
      date_posted_on: formData.date_posted_on || undefined,
      mbe_skill_ids: formData.mbe_skill_ids?.length
        ? formData.mbe_skill_ids
        : undefined,
      experience_skill_ids: formData.experience_skill_ids?.length
        ? formData.experience_skill_ids
        : undefined,
      min_experience: formData.min_experience || undefined,
      max_experience: formData.max_experience || undefined,
      company_categories: formData.company_categories?.length
        ? formData.company_categories
        : undefined,
    };

    // Remove undefined values
    Object.keys(filterData).forEach((key) => {
      if (filterData[key] === undefined) {
        delete filterData[key];
      }
    });

    dispatch(updateFiltersFromForm(filterData));
    onClose();
  };

  const handleReset = () => {
    dispatch(resetForm());
    dispatch(updateFiltersFromForm({}));
  };

  return (
    <Drawer
      title={<FilterDrawerTitle onClose={onClose} />}
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width={550}
      className={styles.drawer}
    >
      <div className={styles.drawerContent}>
        <FilterForm />

        <div className={styles.buttonContainer}>
          <Button className={styles.resetButton} onClick={handleReset}>
            Reset Filters
          </Button>
          <Button
            type="primary"
            className={styles.applyButton}
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default FilterDrawer;
