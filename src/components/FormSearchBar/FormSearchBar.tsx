/* 
Component: Searchbar Field
Version: 0.0.1
Prototyp: 
<FormSearchBar 
    color
    className
    type = "text"
    form_title = "title of field"
    placeholder = "displayed placeholder text"
    value
    setValue
/>
*/

import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as Search } from '../../images/icon-search.svg';

interface FormSearchBarProps {
  color: any;
  className?: string;
  type?: string;
  form_title?: string;
  placeholder?: string;
  value: any;
  setValue?: any;
}

const FormSearchBar: React.FC<FormSearchBarProps> = ({
  color,
  className,
  type = 'text',
  form_title = '',
  placeholder = '',
  value,
  setValue,
}) => {
  const debug = false;

  // FIELDS
  const form_name = 'formSearchBar' + type;

  if (debug) console.log('FormSearchBar/error: ', form_title);

  return (
    <div className="d-flex flex-row">
      <Search />
      <FormGroup className={className + ' form-group'} colores={color}>
        <div className={'label d-flex flex-row justify-content-between'}>
          <label htmlFor={form_name}>{form_title}</label>
        </div>
        <input
          type={type}
          className={'form-control'}
          id={form_name}
          aria-describedby="emailHelp"
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </FormGroup>
    </div>
  );
};

export default FormSearchBar;

// STYLING
interface CustomColores {
  colores: any;
}

const FormGroup = styled.div<CustomColores>`
  margin-left: 24px;

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
    font: normal normal 300 24px/24px 'Outfit';
    opacity: 0.75;
    padding: 0px 0px 17px;
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

  input,
  textarea {
    caret-color: ${({ colores }) => colores.cursor};
  }
`;
