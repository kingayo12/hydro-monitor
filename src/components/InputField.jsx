// components/InputField.jsx
import React from "react";

const InputField = ({ label, icon: Icon, type, value, onChange, error, toggleVisibility }) => (
  <label className='input-group'>
    <h4>{label}</h4>
    <div className='inputs'>
      <input type={type} value={value} onChange={onChange} className='input-w' required />
      <div className='icon'>
        <Icon className='icond' />
      </div>
      {toggleVisibility && (
        <div className='icon2' onClick={toggleVisibility.onClick}>
          {toggleVisibility.visible ? toggleVisibility.showIcon : toggleVisibility.hideIcon}
        </div>
      )}
    </div>
    {error && <div className='err'>{error}</div>}
  </label>
);

export default InputField;
