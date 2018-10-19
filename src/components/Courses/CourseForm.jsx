import React from 'react';
import {
  string, shape, bool, arrayOf, func
} from 'prop-types';
import TextInput from '../common/TextInput/Index';
import SelectInput from '../common/SelectInput/Index';

/**
 * @function CourseForm
 *
 * @param {object} props
 *
 * @returns {JSX}
 */
const CourseForm = ({
  title,
  authorId,
  category,
  length,
  errors,
  saving,
  loading,
  authors,
  onChange,
  onSubmit,
  onFocus
}) => (
  <form onSubmit={onSubmit}>
    <TextInput
      name="title"
      label="Title"
      placeholder="React Fundamentals..."
      onChange={onChange}
      loading={loading}
      onFocus={onFocus}
      value={title}
      error={errors.title}
    />
    <SelectInput
      name="authorId"
      label="Author"
      defaultOption="Select Author"
      onChange={onChange}
      onFocus={onFocus}
      value={authorId}
      loading={loading}
      error={errors.authorId}
      options={authors}
    />
    <TextInput
      name="category"
      label="Category"
      placeholder="UI/UX, HTML, Graphql..."
      onChange={onChange}
      loading={loading}
      onFocus={onFocus}
      value={category}
      error={errors.category}
    />
    <TextInput
      name="length"
      label="Length"
      placeholder="5:12"
      onChange={onChange}
      onFocus={onFocus}
      loading={loading}
      value={length}
      error={errors.length}
    />
    <input
      type="submit"
      value={saving ? 'Saving...' : 'Save'}
      disabled={saving}
      className="btn btn-primary"
    />
  </form>
);

CourseForm.defaultProps = {
  title: '',
  authorId: '',
  category: '',
  length: '',
  errors: {},
  authors: []
};

CourseForm.propTypes = {
  title: string,
  authorId: string,
  category: string,
  length: string,
  errors: shape({}),
  authors: arrayOf(shape({})),
  saving: bool.isRequired,
  loading: bool.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  onFocus: func.isRequired
};

export default CourseForm;
