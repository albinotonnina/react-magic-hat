import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import {enterAnimation, leaveAnimation} from './lib/animations'

const flipMoveDefaultOptions = {
  disableAllAnimations: false,
  duration: 300,
  easing: 'ease-out',
  typeName: null,
  appearAnimation: enterAnimation,
  enterAnimation,
  leaveAnimation
}

export default class Fifo extends React.Component {
  static propTypes = {
    renderContainer: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    onAnimationComplete: PropTypes.func.isRequired,
    buildFrame: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    activePage: PropTypes.number.isRequired,
    reverse: PropTypes.bool
  }

  shouldComponentUpdate = nextProps =>
    nextProps.items !== this.props.items ||
    nextProps.activePage !== this.props.activePage

  render() {
    const {
      items,
      onAnimationComplete,
      activePage,
      buildFrame,
      renderContainer,
      renderItem,
      reverse
    } = this.props

    const lastTwoPages = ({pageNum}) =>
      pageNum === activePage || pageNum === activePage - 1

    const Item = ({pageNum, frameId, passedProps}) =>
      React.cloneElement(renderItem(), {
        key: pageNum + frameId,
        children: buildFrame({
          frameId,
          pageNum,
          passedProps
        })
      })

    const children = items.filter(lastTwoPages)

    if (reverse) {
      children.reverse()
    }

    const Container = React.cloneElement(renderContainer(), {
      children: (
        <FlipMove
          {...flipMoveDefaultOptions}
          onFinishAll={onAnimationComplete}
          children={children.map(Item)} // eslint-disable-line react/no-children-prop
        />
      )
    })

    return Container
  }
}
