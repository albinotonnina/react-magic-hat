import React from 'react'
import PropTypes from 'prop-types'
import Stacky from './Stacky'

class StackyWithState extends React.Component {
  static propTypes = {
    renderFrame: PropTypes.func.isRequired,
    renderContainer: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    onAnimationComplete: PropTypes.func,
    reverse: PropTypes.bool
  }

  state = {
    activePage: 1,
    items: [
      {
        frameId: '',
        pageNum: 1
      }
    ]
  }

  setFrameContent = (pageNum, frameContent) => {
    const items = [...this.state.items]
    const pageArrIndex = pageNum - 1

    items.splice(pageArrIndex, 1, frameContent)

    this.setState({
      items,
      activePage: pageNum
    })
  }

  setNextFrame = (frameId = '', pageNum = 0, passedProps = {}) => {
    const isRightFrame = this.state.activePage === pageNum

    // are we adding or replacing?
    const newActivePage = isRightFrame
      ? this.state.activePage + 1
      : this.state.activePage

    this.setFrameContent(newActivePage, {
      frameId,
      pageNum: newActivePage,
      passedProps
    })
  }

  sliceFrame = pageNum => {
    this.setState({
      items: [...this.state.items].slice(0, pageNum),
      activePage: pageNum - 1
    })
  }

  buildFrame = ({pageNum, frameId, passedProps}) => {
    const {activePage} = this.state
    const {renderFrame} = this.props

    return React.cloneElement(
      renderFrame({
        activePage,
        pageNum,
        frameId,
        passedProps
      }),
      {
        frames: {
          next: (frameId, props) => this.setNextFrame(frameId, pageNum, props),
          replace: (pageNum, frameId, props) =>
            this.setFrameContent(pageNum, {frameId, pageNum, props}),
          close: pageToClose => this.sliceFrame(pageToClose),
          closeCurrent: () => this.sliceFrame(pageNum)
        }
      }
    )
  }

  render() {
    const {
      onAnimationComplete,
      renderContainer,
      renderItem,
      reverse
    } = this.props

    return (
      this.state.items.length > 0 && (
        <Stacky
          {...this.state}
          reverse={reverse}
          onAnimationComplete={onAnimationComplete}
          buildFrame={this.buildFrame}
          renderContainer={renderContainer}
          renderItem={renderItem}
        />
      )
    )
  }
}

export default StackyWithState
