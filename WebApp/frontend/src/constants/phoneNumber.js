import React from "react";
import { IMaskInput } from "react-imask";
export const TextMaskCustom = React.forwardRef(function TextMaskCustom(
  props,
  ref
) {
  const { onChange, value, ...other } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      value={value}
      onChange={handleChange}
      overwrite
    />
  );
  
});

export const TextMaskCustomReg = React.forwardRef(function TextMaskCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});