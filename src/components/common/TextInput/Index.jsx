import React from 'react';
import { string, func, bool } from 'prop-types';
import Loader from '../Loader/Index';

/**
 * @function TextInput
 *
 * @param {object} props
 *
 * @returns {JSX}
 */
const TextInput = ({
  name,
  label,
  placeholder,
  onChange,
  onFocus,
  value,
  error,
  loading
}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field custom-field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
        />
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
};

TextInput.defaultProps = {
  placeholder: '',
  value: '',
  error: ''
};

TextInput.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  onChange: func.isRequired,
  onFocus: func.isRequired,
  placeholder: string,
  value: string,
  error: string,
  loading: bool.isRequired
};

export default TextInput;
