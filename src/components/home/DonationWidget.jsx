import React from 'react';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';

/**
 * Donate Widget
 */
const DonationWidget = () => {
  return <DonateWidgetWrapper>Donation Script Widget</DonateWidgetWrapper>;
};

/**
 * Donate Widget Wrapper
 */
const DonateWidgetWrapper = styled.div`
  width: 312px;
  height: 512px;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${spacings.default / 2}px;
`;

export default DonationWidget;
