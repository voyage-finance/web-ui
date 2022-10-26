// This file configures the intialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { CaptureConsole } from '@sentry/integrations';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_RELEASE =
  process.env.SENTRY_RELEASE || process.env.NEXT_PUBLIC_SENTRY_RELEASE;

if (process.env.DISABLE_SENTRY_LOGGING != 'true')
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
    release: SENTRY_RELEASE,
    integrations: [
      new CaptureConsole({
        levels: ['error'],
      }),
    ],
  });
