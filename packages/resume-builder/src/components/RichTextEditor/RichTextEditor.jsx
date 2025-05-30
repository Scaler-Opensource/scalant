import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

import styles from './RichTextEditor.module.scss';

const RichTextEditor = ({
  form,
  fieldName,
  placeholder = 'Enter text...',
  onValuesChange,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={styles.quill}
      value={form.getFieldValue(fieldName)}
      onChange={(content) => {
        form.setFieldsValue({ [fieldName]: content });
        if (onValuesChange) {
          onValuesChange({ [fieldName]: content }, form.getFieldsValue());
        }
      }}
    />
  );
};

RichTextEditor.propTypes = {
  form: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onValuesChange: PropTypes.func,
};

export default RichTextEditor;
