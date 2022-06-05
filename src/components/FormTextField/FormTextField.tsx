/* 
Component: Text Field w/ validation
Version: 0.0.1
Prototyp: 
<FormTextField 
    type = "email/text"
    form_title = "title of field"
    placeholder = "displayed placeholder text"
    warning_title = "text for warning"
    value
    setValue
    maxText = 100
    minText = 1
    maxNum = 10
    minNum = 1
/>
*/

import React from 'react';
import styled from '@emotion/styled';

interface FormTextFieldProps {
  color: any;
  className?: string;
  type?: string;
  form_title?: string;
  placeholder?: string;
  value: any;
  setValue?: any;
  error: boolean | number;
  setError?: any;
  warning_title?: string;
  maxText?: number;
  minText?: Number;
  maxNum?: Number;
  minNum?: Number;
  required?: Boolean;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  color,
  className,
  type = 'text',
  form_title = 'Form title',
  placeholder = '',
  value,
  setValue,
  error,
  setError,
  warning_title = "Can't be empty",
  maxText = 100,
  minText = 1,
  maxNum = 10,
  minNum = 1,
  required = false,
}) => {
  const debug = false;

  // METHOD
  const validate = (type: string, string: string) => {
    let result;
    if (type === 'email') {
      // validate email
      var re = /\S+@\S+\.\S+/;
      result = re.test(string);
    } else if (type === 'text' || type === 'password') {
      // validate text
      result = string.length >= minText && string.length <= maxText;
    } else if (type === 'number') {
      // validate number
      result = !isNaN(parseInt(string)) && string.length <= maxNum && string.length >= minNum;
    }

    // set error / true === valid
    //console.log('FTF/validate: ', result, required);

    !result && required ? setError(true) : setError(false);
  };

  // FIELDS
  const form_name = 'formTextField' + type;

  if (debug) console.log('FormTextField/error: ', form_title, error, required);

  return (
    <FormGroup className={className + ' form-group'} colores={color} autoComplete="off">
      <div
        className={
          error === true
            ? 'label d-flex flex-row justify-content-between textred'
            : 'label d-flex flex-row justify-content-between'
        }
      >
        <label htmlFor={form_name}>
          {form_title} <span>{required && '*'}</span>
        </label>
        <div
          id="textFieldHelp"
          className={
            error === true
              ? 'small form-text invalid-feedback content'
              : 'small form-text invalid-feedback'
          }
        >
          {warning_title}
        </div>
      </div>
      <input
        type={type}
        className={error === true ? 'borderred form-control' : 'form-control'}
        id={form_name}
        aria-describedby="emailHelp"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => validate(type, e.target.value)}
        value={value}
      />
    </FormGroup>
  );
};

export default FormTextField;

// STYLING
interface CustomColores {
  colores: any;
}

const FormGroup = styled.form<CustomColores>`
  label,
  .label,
  .small {
    font-size: 12px;
    text-transform: none;
    line-height: 1;
    position: relative;
    top: 24px;
  }

  .small {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  .form-control {
    box-sizing: border-box;
    font: normal normal 300 15px/15px 'Outfit';
    opacity: 0.75;
    padding: 0px 16px 17px;
    border-radius: 0px;
    color: ${({ colores }) => colores.font};
    background-color: ${({ colores }) => colores.bgFont};
    border-color: ${({ colores }) => colores.border};
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
  }

  .form-control:focus {
    border-color: ${({ colores }) => colores.borderActive};
    box-shadow: 0 0 0 0 ${({ colores }) => colores.shadow};
  }

  .content {
    display: contents;
    margin-top: -20px;
  }

  .textred {
    color: ${({ colores }) => colores.warning};
  }

  .borderred {
    border-color: ${({ colores }) => colores.warning};
  }

  span {
    color: ${({ colores }) => colores.asterix};
  }

  input,
  textarea {
    caret-color: ${({ colores }) => colores.cursor};
  }
`;
