import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import {getFlipMoveOptions} from './lib/flipMoveOptions'

export default class MagicHatNoState extends React.Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    activePage: PropTypes.number.isRequired,
    renderFrame: PropTypes.func.isRequired,

    onStartAnimation: PropTypes.func,
    onEndAnimation: PropTypes.func,
    flipMoveOptions: PropTypes.func,
    singleFrame: PropTypes.bool,
    moveSeed: PropTypes.string
  }

  static defaultProps = {
    activePage: 0,
    onStartAnimation: () => null,
    onEndAnimation: () => null,
    flipMoveOptions: () => null,
    moveSeed: ''
  }

  getPageElement = ({page, id}) => {
    const {activePage, renderFrame, moveSeed} = this.props

    const key = '' + page + id + moveSeed

    return React.cloneElement(
      renderFrame({
        id,
        page,
        activePage
      }),
      {
        key
      }
    )
  }

  getOneFrame = (page, activePage) => page && activePage - page === 0

  getTwoFrames = (page, activePage) =>
    page && (activePage - page === 1 || activePage - page === 0)

  getVisiblePages = () => {
    const {getOneFrame, getTwoFrames, getPageElement, props} = this
    const {pages, singleFrame, activePage} = props

    return pages
      .filter(
        ({page}) =>
          singleFrame
            ? getOneFrame(page, activePage)
            : getTwoFrames(page, activePage)
      )
      .map(getPageElement)
  }

  render() {
    const {props, getVisiblePages} = this

    const {
      pages,
      onStartAnimation,
      onEndAnimation,
      singleFrame,
      flipMoveOptions
    } = props

    const visiblePages = getVisiblePages()

    return (
      <FlipMove
        {...getFlipMoveOptions({
          flipMoveOptions,
          visiblePagesLength: visiblePages.length,
          pagesLength: pages.length,
          singleFrame
        })}
        onStartAll={onStartAnimation}
        onFinishAll={onEndAnimation}
        children={visiblePages} // eslint-disable-line react/no-children-prop
      />
    )
  }
}
