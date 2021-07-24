// Returns the width of browser window.
export function getScreenWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

// Returns the height of the browser window.
export function getScreenHeight() {
  return window.innerHeight;
}
