import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  icon,
  info,
  required,
  addons,
  type,
  onChange,
  error,
  disabled
}) => {
  return (
    <div className={classnames('field', { 'has-addons': addons })}>
      {info && <label className="label">{info}</label>}
      <div className="control is-expanded has-icons-left">
        <input
          className={classnames('input', { 'is-info': required })}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="icon is-small is-left">
          <i className={icon}></i>
        </span>
      </div>
      {error && <p className="help has-text-danger">{error}</p>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
