/* eslint-disable no-debugger */
import React from 'react'
import {mount} from 'enzyme'
import toJson from 'enzyme-to-json'
import MagicHat from '../MagicHat'

class Dummy extends React.Component {
  render() {
    return 'hello'
  }
}

describe('MagicHat', () => {
  it('should match the snapshot', () => {
    const wrapper = mount(<MagicHat renderFrame={() => <Dummy />} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('invoke startAnimation', () => {
    const mockCallback = jest.fn()

    mount(
      <MagicHat renderFrame={() => <Dummy />} onStartAnimation={mockCallback} />
    )

    expect(mockCallback.mock.calls.length).toBe(1)
  })
})
