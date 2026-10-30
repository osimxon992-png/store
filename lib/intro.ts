// Tiny signal so sections can start their entrance animation once the loader is gone.
let done = false;
const listeners = new Set<() => void>();

export function fireIntro() {
  done = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

export function onIntro(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
