// Single source of truth for which scroll-hijack controller currently owns the
// scroll lock. HeroSnapStack (the hero -> second-section hand-off) and
// MoveHealth (the 5-slide sequence) are independent controllers on the same
// window; without this they both call lenis.stop()/scrollTo() and fight,
// producing snaps and double-locks. Whoever holds the lock is the only one
// allowed to drive the scroll.

let owner = null;

export function acquireScrollLock(id) {
  owner = id;
}

export function releaseScrollLock(id) {
  if (owner === id) owner = null;
}

export function getScrollLockOwner() {
  return owner;
}
