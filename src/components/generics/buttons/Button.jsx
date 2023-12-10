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
import React from 'react';
import styled, { css } from 'styled-components';



import { media } from '@styles/configs/breakpoints';
import { HoverOrActive } from '@styles/utils/HoverOrActive';
import { rem } from '@styles/utils/rem';


/**
 * BUTTON SIDE LABEL TYPES ALLOWED
 */
const ButtonSideLabelTypes = {
  LEFT: 'left',
  RIGHT: 'right',
};

/**
 * Button default
 */
const ButtonFactory = (Button) => {
  const Component = (props) => {
    const { label, icon } = props;
    return (
      <Button
        {...props}
        {...(props.selected === false || props.selected === true
          ? {
              'aria-checked': props.selected,
              'role': 'switch',
            }
          : {})}
        disabled={props.disabled}
      >
        {label && label}
        {icon && icon}
      </Button>
    );
  };

  Component.displayName = Button.displayName;
  return Component;
};

/**
 * Button base CSS
 */
const button = css`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 35px;

  padding: 15px 50px;
  ${({ icon, label }) => icon && !label && `padding: 0 0;`};

  cursor: pointer;
  min-width: 35px;
  min-height: 55px;

  font-weight: 700;
  font-size: ${rem(17)};
  font-style: normal;

  svg {
    width: 25px;
    height: 25px;
    fill: ${({ theme }) => theme.colors.white};
    transition: fill 0.2s ease-out;
    padding: 0px 14px;
    box-sizing: initial;
  }

  ${media.xsOnly`
    padding: 10px 25px;
    ${({ icon, label }) => icon && !label && `padding: 0 0;`};
    font-size: ${rem(15)};
    font-style: normal;
    min-height: 42px;
  `}

  ${({ sideLabelType }) =>
    sideLabelType &&
    sideLabelType === ButtonSideLabelTypes.LEFT &&
    `
    flex-direction: row-reverse;
  `}

  ${({ selected, theme }) =>
    selected &&
    `
    color: ${theme.colors.white};
    background-color: ${theme.colors.secondary};

    svg {
      fill: ${({ theme }) => theme.colors.secondary};
    }
  `}

  ${HoverOrActive`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.secondary};

    svg {
      fill: ${({ theme }) => theme.colors.secondary};
    }
  `}

  :disabled {
    color: #9f9f9f;
    background-color: #d7d7d7;
    cursor: default;
  }
`;

/**
 * Button style components
 */
const Default = styled.button`
  ${button}
`;

/**
 * Button style components
 */

const Secondary = styled(Default)`
  background-color: #666d77;

  ${HoverOrActive`
    background-color: #939dab;
  `}
`;

/**
 * Button style components
 */
const Outline = styled.button`
  ${button}

  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  ${HoverOrActive`
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.secondary};

    svg {
      fill: ${({ theme }) => theme.colors.secondary};
    }
  `}
`;

const Rounded = styled(Outline)`
  border-radius: 50%;
  padding: 0 20px;
  ${media.xsOnly`
    padding: 0 15px;
  `}
`;

/**
 * Button style components
 */
const Transparent = styled.button`
  ${button}

  background: transparent;
  border: none;
  outline: none;

  padding: 0px 0px;
  min-height: auto;

  ${media.xsOnly`
    padding: 0px 0px;
  `}

  ${({ selected, theme }) =>
    selected &&
    `
    color: ${theme.colors.primary};
    background-color: transparent;

    svg {
      fill: ${theme.colors.primary};
    }
  `}

  ${HoverOrActive`
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;

    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  `}
`;

/**
 * Button style components
 */
const Liner = styled.button`
  ${button}

  background: transparent;
  border: none;
  border-bottom: 6px solid #00000000;
  border-radius: 0;

  padding: 20px 40px;

  font-size: ${rem(14)};
  text-transform: uppercase;
  letter-spacing: ${rem(1.3)};

  ${({ selected, theme }) =>
    selected &&
    `
    color: ${theme.colors.primary};
    background-color: transparent;
    border-bottom: 6px solid ${theme.colors.primary};

    padding: 14px 40px;

    svg {
      fill: ${theme.colors.primary};
    }
  `}

  ${HoverOrActive`
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;

    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  `};
`;

export { ButtonSideLabelTypes };
export default {
  Default: ButtonFactory(Default),
  Secondary: ButtonFactory(Secondary),
  Outline: ButtonFactory(Outline),
  Transparent: ButtonFactory(Transparent),
  Liner: ButtonFactory(Liner),
  Rounded: ButtonFactory(Rounded),
};