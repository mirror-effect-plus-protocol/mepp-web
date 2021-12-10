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
