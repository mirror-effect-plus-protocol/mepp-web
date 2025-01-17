/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import IconEyeHide from '@assets/icons/eye-stroke.svg';
import IconEyeShow from '@assets/icons/eye.svg';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignLeft, FlexDisplay } from '@styles/tools';
import { FlexDirectionColumn } from '@styles/tools/flexs';
import { rem } from '@styles/utils/rem';

import { theme } from '@themes/index';

import { randomString } from '@utils/string';

import { Label } from '@components/generics/basics/Label';
import Button from '@components/generics/buttons/Button';

/**
 * Input types
 */
const InputTypes = {
  EMAIL: 'email',
  TEXT: 'text',
  PASSWORD: 'password',
  RADIO: 'radio',
};

/**
 * Input base declation
 * @return JSX.Element
 */
const Declaration = (Input, props) => {
  const { name, label, register, ...rest } = props;
  const registration = register ? register(name, props.validation) : {};

  return (
    <FlexDirectionColumn.Component>
      <InputLabel htmlFor={props.id ? props.id : name}>{label}</InputLabel>
      <Input {...registration} {...rest} name={name} />
    </FlexDirectionColumn.Component>
  );
};

/**
 * Input base declation
 * @return JSX.Element
 */
const DeclarationPwd = (Input, props) => {
  const { t } = useTranslation();
  const [showPwd, setShowPwd] = useState(false);

  const { name, label, register, ...rest } = props;
  const registration = register ? register(name, props.validation) : {};

  return (
    <FlexDirectionColumn.Component>
      <InputLabel htmlFor={props.id ? props.id : name}>{label}</InputLabel>
      <InputPasswordWrapper>
        <Input
          {...registration}
          {...rest}
          type={showPwd ? InputTypes.TEXT : InputTypes.PASSWORD}
        />
        <ButtonPasswordWrapper>
          <Button.Transparent
            as="div"
            tabIndex={0}
            aria-label={t('a11y:show_password')}
            icon={
              showPwd ? (
                <IconEyeHide width="100%" height="100%" />
              ) : (
                <IconEyeShow width="100%" height="100%" />
              )
            }
            selected={showPwd}
            onClick={() => setShowPwd(!showPwd)}
          />
        </ButtonPasswordWrapper>
      </InputPasswordWrapper>
    </FlexDirectionColumn.Component>
  );
};

/**
 * Input base declation
 * @return JSX.Element
 */
const DeclarationRadio = (Input, props) => {
  const { name, label, register, ...rest } = props;
  const registration = register ? register(name, props.validation) : {};

  return (
    <FlexAlignLeft.Component>
      <Input {...registration} {...rest} name={name} />
      <InputLabel htmlFor={props.id ? props.id : name}>{label}</InputLabel>
    </FlexAlignLeft.Component>
  );
};

/**
 * Input base with react-hook-form
 *
 * @example
 * <Input.Text
 *    name="email"
 *    placeholder={'placeholder'}
 *    required
 * />
 * @return JSX.Element
 */
const Text = memo((props) => {
  const { t } = useTranslation();

  return Declaration(InputDefault, {
    ...props,
    id: props.id ?? `${InputTypes.TEXT}_${randomString()}`,
    type: InputTypes.TEXT,
    label: props.label ?? t('form:field:password:placeholder'),
    'aria-invalid': props.errors ?? false,
    'aria-required': props.required ?? false,
    validation: {
      required: props.required && t('form:field:error:required'),
      ...props.validation,
    },
  });
});
Text.displayName = 'InputText';

/**
 * Input base with react-hook-form
 *
 * @example
 * <Input.Password
 *    name="email"
 *    placeholder={'placeholder'}
 *    required
 * />
 * @return JSX.Element
 */
const Password = React.memo((props) => {
  const { t } = useTranslation();
  return DeclarationPwd(InputDefault, {
    ...props,
    id: props.id ?? `${InputTypes.PASSWORD}_${randomString()}`,
    type: InputTypes.PASSWORD,
    label: props.label ?? t('form:field:password:label'),
    'aria-invalid': props.errors ?? false,
    'aria-required': props.required ?? false,
    validation: {
      required: props.required && t('form:field:error:required'),
      ...props.validation,
    },
  });
});
Password.displayName = 'InputPassword';

/**
 * Input base with react-hook-form
 *
 * @example
 * <Input.Email
 *    name="email"
 *    placeholder={'placeholder'}
 *    required
 * />
 * @return JSX.Element
 */
const Email = memo((props) => {
  const { t } = useTranslation();

  return Declaration(InputDefault, {
    ...props,
    id: props.id ?? `${InputTypes.EMAIL}_${randomString()}`,
    type: InputTypes.EMAIL,
    label: props.label ?? t('form:field:email:label'),
    'aria-invalid': props.errors ?? false,
    'aria-required': props.required ?? false,
    validation: {
      required: props.required && t('form:field:error:required'),
      pattern: {
        value: /\b[\w-.+]+@[\w.-]+\.[a-z]{2,10}\b/gi, // to support xxx@mepp.local
        message: t('form:field:error:email_invalid'),
      },
      ...props.validation,
    },
  });
});
Email.displayName = 'InputEmail';

/**
 * Input radio base with react-hook-form
 *
 * @example
 * <Input.Radio
 *    name="radio"
 *    required
 * />
 * @return JSX.Element
 */
const Radio = memo((props) => {
  const { t } = useTranslation();

  return DeclarationRadio(InputRadio, {
    ...props,
    id: props.id ?? `${InputTypes.RADIO}_${randomString()}`,
    type: InputTypes.RADIO,
    label: props.label ?? '',
    'aria-invalid': props.errors ?? false,
    'aria-required': props.required ?? false,
    validation: {
      required: props.required && t('form:field:error:required'),
      ...props.validation,
    },
  });
});
Radio.displayName = 'InputRadio';

/**
 * Input default
 */
const Input = Text;

/**
 * Input style component
 */
const InputDefault = styled.input`
  border: 1px solid;
  border-radius: ${spacings.default / 2}px;
  border-color: #948f8f;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.black};
  font-weight: 400;
  margin-top: ${spacings.default / 2}px;
  margin-bottom: ${spacings.default * 2}px;
  padding: ${spacings.default}px ${spacings.default * 1.5}px;
  transition: background-color 0.5s ease, border-color 0.5s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const InputRadio = styled.input`
  position: absolute;
  left: -999999px;
  border: none;

  & + label {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: ${rem(18)};
    cursor: pointer;

    &:before {
      content: '';
      display: block;
      margin-right: ${spacings.default / 2}px;
      width: 30px;
      height: 30px;
      border: 1px solid #cbcbcb;
      border-radius: 100%;
      background: transparent;
      transition: all 0.3s ease-out;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      background: ${theme.colors.secondary};
      top: 7px;
      left: 7px;
      border-radius: 100%;
      transition: all 0.3s ease-out;
    }
  }

  &:checked + label {
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:not(:checked) + label {
    &:after {
      opacity: 0;
      transform: scale(0);
    }
  }

  &:focus-visible + label {
    outline-width: 2px;
    outline-offset: 4px;
    outline-style: dotted;
    outline-color: ${theme.colors.primary};
    box-shadow: 0px 0px 0px 2px ${theme.colors.white};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

/**
 * Input label style component
 */
const InputLabel = styled(Label)`
  margin-bottom: ${spacings.default / 2}px;

  ${media.xsOnly`
    margin-bottom: ${spacings.default / 4}px;
  `}
`;

/**
 * Input fieldSet group
 */
const FieldSet = styled.fieldset``;

/**
 * Input/Button password wrapper
 */
const ButtonPasswordWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: calc(50% - 30px);
  ${media.xsOnly`
    top: calc(50% - 40px);
  `}
`;

/**
 * Input/Button password wrapper
 */
const InputPasswordWrapper = styled(FlexDisplay.Component)`
  position: relative;
  input {
    width: 100%;
  }
`;

export { Input };
export default {
  Text,
  Password,
  Email,
  Radio,
  FieldSet,
};
