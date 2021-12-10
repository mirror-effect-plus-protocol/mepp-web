import { log } from './log';

const historyView = [];
const historyEvent = [];

/**
 * Tracking pageview
 * @exemple
 * trackView('/login');
 */
const trackView = (view) => {
  // secur multi-involontary push for same tracking - back to back
  if (isLastTrackedView(view)) return;

  log('Analytics Tracking View:', view);
  historyView.push(view);

  // TODO: add tracking service here for pageview
};

/**
 * Tracking event
 * @exemple
 * trackEvent( 'eventName', {
 *    eventParam1: 'eventParamValue1',
 *    eventParam2: 'eventParamValue2',
 *    eventParam3: 'eventParamValue3'
 * });
 */
const trackEvent = (eventName, eventAction, triggerOnce = false) => {
  // secur multi-involontary push like "APP_LAUNCHED" during accidental re-render. Only when triggerOnce is set to true
  if (triggerOnce && historyEvent.includes(eventName)) return;

  log('Analytics Tracking Event:', eventName, eventAction);
  historyEvent.push(eventName);

  // TODO :  add tracking service here for event
};

// the view is last occurrance
const isLastTrackedView = (view) =>
  historyView[historyView.length - 1] === view;

export { isLastTrackedView };
export { historyView, historyEvent };
export { trackView, trackEvent };
