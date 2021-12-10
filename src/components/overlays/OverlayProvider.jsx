import React, { createContext, useState } from 'react';

import Overlay from '@components/overlays/Overlay';

const OverlayContext = createContext({
  open: () => {},
  close: () => {},
  content: undefined,
});

const OverlayProvider = ({ children }) => {
  const [content, setContent] = useState();

  const open = (content) => setContent(content);
  const close = () => setContent(undefined);

  return (
    <OverlayContext.Provider value={{ content, open, close }}>
      {children}
      <Overlay />
    </OverlayContext.Provider>
  );
};

export { OverlayContext };
export default OverlayProvider;
