export const emitCookieChangeEvent = () => {
    const event = new Event('cookieChange');
    window.dispatchEvent(event);
  };
  