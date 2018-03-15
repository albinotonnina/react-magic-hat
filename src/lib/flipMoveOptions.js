const appearAnimation = {
  from: {
    transform: 'scaleX(0) scaleY(1)',
    transformOrigin: '50% 50%'
  },
  to: {
    transform: ''
  }
}

const enterAnimation = {
  from: {
    transform: 'scaleX(0) scaleY(0.4)',
    opacity: 0.1
  },
  to: {
    transform: ''
  }
}

const leaveAnimationDefault = {
  from: {
    transform: ''
  },
  to: {
    transform: 'scaleX(0) scaleY(0.8)',
    opacity: 0.1
  }
}

const leaveAnimationInitial = {
  from: {
    transform: '',
    transformOrigin: '50% 50%'
  },
  to: {
    transform: 'scaleX(0) scaleY(0.8)',
    opacity: 0.1
  }
}

const delay = 0
const duration = 400
const staggerDurationBy = 0
const staggerDelayBy = 0
const disableAllAnimations = false
const typeName = null
const easing = 'cubic-bezier(0.39, 0.575, 0.565, 1)'

const defaultOptions = {
  delay,
  duration,
  staggerDurationBy,
  staggerDelayBy,
  disableAllAnimations,
  typeName,
  easing,
  appearAnimation,
  enterAnimation,
  leaveAnimationDefault
}

export const getFlipMoveOptions = ({
  flipMoveOptions,
  visiblePagesLength,
  pagesLength,
  singleFrame
}) => {
  const openingSecondFrame =
    !singleFrame && visiblePagesLength === 2 && pagesLength === 2

  const closingSecondFrame =
    !singleFrame && visiblePagesLength <= 1 && pagesLength <= 2

  const _duration =
    openingSecondFrame || closingSecondFrame ? duration : duration * 1.5

  const _leaveAnimation = closingSecondFrame
    ? leaveAnimationInitial
    : leaveAnimationDefault

  const _staggerDelayBy = openingSecondFrame ? duration / 2 : 0

  return {
    ...defaultOptions,
    duration: _duration,
    staggerDelayBy: _staggerDelayBy,
    leaveAnimation: _leaveAnimation,
    ...flipMoveOptions({
      pagesLength,
      visiblePagesLength,
      singleFrame
    })
  }
}
