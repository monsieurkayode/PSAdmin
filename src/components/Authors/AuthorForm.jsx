import React from 'react';
import {
  shape, string, func, bool
} from 'prop-types';
import TextInput from '../common/TextInput/Index';

const AuthorForm = ({
  firstName,
  lastName,
  errors,
  onChange,
  onSubmit,
  onFocus,
  saving,
  loading
}) => (
  <form onSubmit={onSubmit}>
    <TextInput
      name="firstName"
      label="First Name"
      placeholder="Kent"
      onChange={onChange}
      onFocus={onFocus}
      loading={loading}
      value={firstName}
      error={errors.firstName}
    />
    <TextInput
      name="lastName"
      label="Last Name"
      placeholder="Dodds"
      onChange={onChange}
      onFocus={onFocus}
      loading={loading}
      value={lastName}
      error={errors.lastName}
    />
    <input
      type="submit"
      value={saving ? 'Saving...' : 'Save'}
      disabled={saving}
      className="btn btn-primary"
    />
  </form>
);

AuthorForm.defaultProps = {
  firstName: '',
  lastName: '',
  errors: {},
};

AuthorForm.propTypes = {
  firstName: string,
  lastName: string,
  errors: shape({}),
  saving: bool.isRequired,
  loading: bool.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  onFocus: func.isRequired
};

export default AuthorForm;
