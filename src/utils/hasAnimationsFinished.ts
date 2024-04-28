// Resolved when all animations have finished or there haven't any animation been registered

export const hasAnimationsFinished = (
  element: HTMLElement
): Promise<Animation[]> => {
  const animations = element.getAnimations();
  return Promise.all(animations.map((animation) => animation.finished));
};
