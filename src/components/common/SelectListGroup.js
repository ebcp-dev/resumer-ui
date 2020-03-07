import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="field">
      <label className="label">{info}</label>
      <div className="select is-fullwidth">
        <select name={name} value={value} onChange={onChange}>
          {selectOptions}
        </select>
      </div>
      {error && <p className="help has-text-danger">{error}</p>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
