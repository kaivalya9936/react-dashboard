import React from "react";
import './Dropdown.css'

const Dropdown = ({ label,options,value,onChange })=>{
    return (
        <label style={{color: 'rgba(84, 168, 118, 0.7)'}}>
          {label}
          <select className='ml2 custom-select' value={value} onChange={onChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>     
        </label>
     
      );
}

export default Dropdown;