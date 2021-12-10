import PreventFocusKeyTrap from 'focus-trap-react';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { zindex } from '@styles/configs/zindex';
import { WrapperFullSize } from '@styles/tools';
import { DisabledBodyScrollGlogalStyle } from '@styles/utils/DisabledBodyScroll';

import { Keys, useKeyPress } from '@hooks/keyboard/useKeyPress';

import { OverlayContext } from '@components/overlays/OverlayProvider';

const Overlay = () => {
  const { content, close } = useContext(OverlayContext);
  const isKeyEscPress = useKeyPress(Keys.ESC);

  // Hide main and remember last item focus before overlay
  useEffect(() => {
    if (!content) return;

    // save last focused html element (to refocus into trigger when closing)
    const lastItemFocus = document.activeElement;

    // hide all tag behind modal (for screen reader)
    const mainElement = document.querySelector('main');
    mainElement && mainElement.setAttribute('aria-hidden', 'true');

    // destoye all while unmounting
    return () => {
      lastItemFocus && lastItemFocus.focus();
      mainElement && mainElement.removeAttribute('aria-hidden');
    };
  }, [content]);

  // Close when ESC is pressing
  useEffect(() => {
    if (isKeyEscPress) {
      close && close();
    }
  }, [isKeyEscPress]);

  if (!content) return <></>;

  return (
    <>
      <OverlayBg />
      <PreventFocusKeyTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <OverlayWrapper>
          <DisabledBodyScrollGlogalStyle />
          <OverlayInner>{content}</OverlayInner>
        </OverlayWrapper>
      </PreventFocusKeyTrap>
    </>
  );
};

const OverlayWrapper = styled(WrapperFullSize)`
  position: fixed;
  top: 100px;
  z-index: ${zindex.overlay};
  height: calc(100vh - 100px);

  width: 100vw;
  padding: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const OverlayBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => `${theme.colors.background}`};
  z-index: 2;
`;

const OverlayInner = styled.div`
  padding: 0px ${spacings.default}px 0;

  @media screen and (min-height: 800px) {
    height: 100%;
    box-sizing: border-box;
  }
`;

export default Overlay;
