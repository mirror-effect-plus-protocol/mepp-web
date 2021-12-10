import { useEffect } from 'react';

import { trackView } from '@utils/analytics';

/** HOOK TO SEND TRACKING VIEW ON MOUNTING
 */
const useTrackingView = (value) => {
  useEffect(() => {
    trackView(value);
  }, [value]);
};

export { useTrackingView };
