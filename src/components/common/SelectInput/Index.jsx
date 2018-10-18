import React from 'react';
import {
  string, func, arrayOf, shape, bool
} from 'prop-types';
import Loader from '../Loader/Index';

/**
 * @function SelectInput
 *
 * @param {object} props
 *
 * @returns {JSX}
 */
const SelectInput = ({
  name,
  label,
  defaultOption,
  onChange,
  value,
  error,
  options,
  loading,
  onFocus
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div className="field custom-field">
      <select
        name={name}
        className="form-control"
        onChange={onChange}
        onFocus={onFocus}
        value={value}
      >
        <option value="">{defaultOption}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
      {loading && <Loader size={20} />}
    </div>
    {error && (
      <div
        style={{ maxWidth: '93%', padding: '5px' }}
        className="alert alert-danger"
      >
        {error}
      </div>
    )}
  </div>
);

SelectInput.defaultProps = {
  value: '',
  error: ''
};

SelectInput.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  defaultOption: string.isRequired,
  onChange: func.isRequired,
  options: arrayOf(shape({})).isRequired,
  value: string,
  error: string,
  loading: bool.isRequired,
  onFocus: func.isRequired
};

export default SelectInput;
