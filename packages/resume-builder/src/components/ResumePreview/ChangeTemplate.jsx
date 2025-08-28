import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, FloatButton, Modal, Tooltip } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

import { Button } from '@components';
import { TEMPLATE_CONFIG, TEMPLATE_VS_IMG } from './constants';
import { setResumeData } from '../../store/resumeBuilderSlice';
import { useUpdateResumePreferencesMutation } from '../../services/resumeBuilderApi';
import {
  areResumeTemplatesVisited,
  markResumeTemplatesVisited,
  shouldShowResumeTemplateNudge,
} from '../../utils/onboardingUtils';
import styles from './ChangeTemplate.module.scss';

const ChangeTemplate = ({ resumeTemplateConfig }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [shouldShowNudge, setShouldShowNudge] = useState(false);
  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const [updateResumePreferences, { isLoading }] =
    useUpdateResumePreferencesMutation();

  const openModal = useCallback(() => {
    setOpen(true);
    markResumeTemplatesVisited();
    resumeTemplateConfig?.onModalOpen?.(resumeData?.resume_details?.id);
  }, [resumeTemplateConfig, resumeData]);

  const closeModal = () => {
    setOpen(false);
  };

  const handleIconClick = () => {
    openModal();
    resumeTemplateConfig?.onIconClick?.(resumeData?.resume_details?.id);
  };

  const handleSelectTemplate = async (templateKey) => {
    setSelectedTemplate(templateKey);
    const newTemplateStructure = {
      [templateKey]: TEMPLATE_CONFIG[templateKey],
    };
    dispatch(
      setResumeData({
        ...resumeData,
        scaler_resume_template_structure: newTemplateStructure,
      })
    );
    await updateResumePreferences({
      payload: {
        resume_id: resumeData?.resume_details?.id,
        scaler_resume_template_structure: newTemplateStructure,
      },
    });
    resumeTemplateConfig?.onTemplateChangeClick?.(
      templateKey,
      resumeData?.resume_details?.id
    );
  };

  useEffect(() => {
    setSelectedTemplate(
      Object.keys(resumeData?.scaler_resume_template_structure || {})[0]
    );
  }, [resumeData]);

  useEffect(() => {
    if (!areResumeTemplatesVisited()) {
      openModal();
      markResumeTemplatesVisited();
    }
  }, [openModal]);

  useEffect(() => {
    setShouldShowNudge(shouldShowResumeTemplateNudge());
  }, []);

  return (
    <>
      <Tooltip
        open={shouldShowNudge}
        onOpenChange={setShouldShowNudge}
        title="Change Template"
        placement="right"
      >
        <FloatButton icon={<BgColorsOutlined />} onClick={handleIconClick} />
      </Tooltip>
      <Modal
        classNames={{
          content: styles.modalContent,
          modal: styles.modalBody,
        }}
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        <div className={styles.modalTitle}>
          Please select a resume template!
        </div>
        <Carousel arrows infinite={false}>
          {Object.keys(TEMPLATE_CONFIG).reduce((acc, key, index) => {
            if (index % 3 === 0) {
              acc.push(
                <div className={styles.carouselSlide} key={`group-${index}`}>
                  <div className={styles.carouselItems}>
                    {Object.keys(TEMPLATE_CONFIG)
                      .slice(index, index + 3)
                      .map((templateKey) => (
                        <div
                          className={[
                            styles.carouselItem,
                            selectedTemplate === templateKey &&
                              styles.activeCarouselItem,
                          ].join(' ')}
                          key={templateKey}
                          style={{
                            backgroundImage: `url(${TEMPLATE_VS_IMG[templateKey]})`,
                          }}
                        >
                          <Button
                            className={styles.carouselItemButton}
                            onClick={() => handleSelectTemplate(templateKey)}
                            disabled={isLoading}
                          >
                            Select Template
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              );
            }
            return acc;
          }, [])}
        </Carousel>
      </Modal>
    </>
  );
};

export default ChangeTemplate;
