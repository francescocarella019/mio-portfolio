type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type AnalyticsWindow = Window & {
  gtag?: (command: 'event', eventName: string, params?: AnalyticsParams) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined') {
    return;
  }

  const w = window as AnalyticsWindow;

  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, params);
    return;
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: eventName, ...params });
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', eventName, params ?? {});
  }
}
