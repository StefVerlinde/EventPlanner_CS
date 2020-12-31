import React from "react";
import Select from "react-select";

function CustomSelect({ onChange, options, value, className, onBlur }) {
    const defaultValue = (options, value) => {
        return options ? options.find((options) => options.value === value) : "";
      };
    
      return (
        <Select
          placeholder=""
          value={defaultValue(options, value)}
          onChange={(value) => onChange(value)}
          options={options}
          onBlur={(value) => onBlur(value)}
          className={className}
        />
      );
}

export default CustomSelect
