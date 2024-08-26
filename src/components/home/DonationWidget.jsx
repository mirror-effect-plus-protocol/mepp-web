import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';

import { useInView } from '@hooks/useInView';

import { LoadingCircle } from '@components/generics/LoadingCircle';

/**
 * Donate Widget
 */
const DonationWidget = () => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const widgetView = useInView(ref, { once: true });

  useEffect(() => {
    if (widgetView) {
      // TODO: remove this temporary fake loading
      setTimeout(() => {
        setReady(true);
      }, 1000);
    }
  }, [widgetView]);

  return (
    <DonateWidgetWrapper ref={ref}>
      {!ready ? <LoadingCircle /> : 'Donation bloc here ...'}
    </DonateWidgetWrapper>
  );
};

/**
 * Donate Widget Wrapper
 */
const DonateWidgetWrapper = styled.div`
  position: relative;
  width: 312px;
  height: 512px;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${spacings.default / 2}px;
`;

export default DonationWidget;
