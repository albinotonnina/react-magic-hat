export const enterAnimation = {
  from: {
    transform: 'scaleX(0.1) scaleY(0.8)'
  },
  to: {
    transform: ''
  }
}

export const leaveAnimation = {
  from: {
    transform: ''
  },
  to: {
    transform: 'scaleX(0.1) scaleY(0.8)',
    opacity: 0.1
  }
}
