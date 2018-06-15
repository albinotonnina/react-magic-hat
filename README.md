[![Dependency Up-to-dateness][david-image]][david-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5cac2b7c18984c8d9626e904be3def71)](https://app.codacy.com/app/albinotonnina/react-magic-hat?utm_source=github.com&utm_medium=referral&utm_content=albinotonnina/react-magic-hat&utm_campaign=badger)
[![Build Status](https://travis-ci.org/albinotonnina/react-magic-hat.svg?branch=master)](https://travis-ci.org/albinotonnina/react-magic-hat)

# React Magic Hat 🎩✨

> A kind of UI technique

React implementation of what I call the [**Magic Hat UI technique**](https://medium.com/@albinotonnina/magic-hat-technique-408a3fa590bb) [[DEMO](https://albinotonnina.github.io/demo-magic-hat)].

<p align="center">
  <img src="https://albinotonnina.github.io/demo-magic-hat/demo.gif">
</p>

[david-image]: https://david-dm.org/albinotonnina/react-magic-hat.svg
[david-url]: https://david-dm.org/albinotonnina/react-magic-hat

## Features

🚀 [Blazing fast](https://twitter.com/acdlite/status/974390255393505280). 60+ FPS hardware-accelerated CSS transforms, using the [FLIP technique](https://medium.com/r/?url=https%3A%2F%2Faerotwist.com%2Fblog%2Fflip-your-animations%2F%23the-general-approach). Fluid and performant. Thanks to [react-flip-move](https://github.com/joshwcomeau/react-flip-move) for that.

🎈Extra light, only 6.5kb and no dependencies.

🧘‍Flexible, stateful or stateless (you get both components) it’s UI-less, you do the layouting and styling.

🎛 Highly configurable, check the [API](#api)

## Table of Contents

* [Background](#background)
* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [Demos](#demos)
* [Maintainers](#maintainers)
* [Contribute](#contribute)
* [License](#license)

## Background

The Magic Hat is a technique with the purpose of reducing the the total amount of mental effort that is required to complete a task involving processing of information, in short cognitive load, by limiting the amount of UI on the screen in favour of a runtime like linked list of sequential self sufficient UIs called MUVs (Minimum Usable Views)
It's called like this because in a view the user can pick the next thing to put on screen. It’s pretty much it.

[Read the article on medium.com](https://medium.com/@albinotonnina/magic-hat-technique-408a3fa590bb)

## Install

```
yarn add react-magic-hat
```

## Usage

```jsx
import YourMagicContainer from 'react-magic-hat'
import ComponentA, {id as CompA} from 'components'
import ComponentB from 'components'

const renderFrame = pageObject => {
  // Please check the renderFrame(pageObject) documentation for all the properties passed to the pageObject.
  const {id, actions, state} = pageObject

  // We get the Component that is going to be rendered, the following is probably the most naive way.
  const Muv = id === CompA ? ComponentA : ComponentB

  // Another way to do it in the demo, using import-glob
  // https://github.com/albinotonnina/demo-magic-hat/blob/master/src/Demo.js#L5-L21

  return <Muv {...actions} {...state} />
}

const Layout = () => (
  <div>
    <YourMagicContainer renderFrame={renderFrame} />
  </div>
)
```

## API

### Prop Types

| Property         | Type     | Required? |                                                                   Arguments                                                                    | Description                                                                                                                                            |
| :--------------- | :------- | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| renderFrame      | Function |     ✓     |                                                    [Documentation](#renderframepageobject)                                                     | Callback invoked when rendering the visible pages.                                                                                                     |
| onStartAnimation | Function |           | [childElements, domElements](https://github.com/joshwcomeau/react-flip-move/blob/master/documentation/api_reference.md#onstartall), pageProps  |                                                                                                                                                        |
| onEndAnimation   | Function |           | [childElements, domElements](https://github.com/joshwcomeau/react-flip-move/blob/master/documentation/api_reference.md#onfinishall), pageProps |                                                                                                                                                        |
| flipMoveOptions  | Function |           |                                                 {pagesLength, visiblePagesLength, singleFrame}                                                 | Override [react-flip-move](https://github.com/joshwcomeau/react-flip-move/blob/master/documentation/api_reference.md#api-reference) configuration.     |
| singleFrame      | Boolean  |           |                                                                                                                                                | By default show two views. Set this to `true` to show only one.                                                                                        |
| moveSeed         | String   |           |                                                                                                                                                | Change this to force animations, it will be appended to the view keys [read when we need this](https://github.com/joshwcomeau/react-flip-move#gotchas) |

### renderFrame(pageObject)

```jsx
import getComponentById from './your-components'

const renderFrame = pageObject => {
  const {
    id, // 'my-component-id'
    page, // 4
    activePage, // 5
    state, // { roses: 'blue', violets: 'red', pass:'whetever', pleases: 'you' }
    actions // see next paragraph for the actions methods
  } = pageObject

  const Muv = getComponentById(id) // return a Component

  return <Muv {...state} {...actions} />
}
```

### {actions} API

| Method                                         | Description                                   |
| :--------------------------------------------- | :-------------------------------------------- |
| setCurrentFrame(props:object)                  | Merge props on the current page               |
| getCurrentFrame():object                       | Get props of the current page                 |
| closeCurrentFrame()                            | Close the current page                        |
| setNextFrame(id:string, props:object )         | Merge the next page and optionally pass props |
| getNextFrame()                                 | Get props of the next page                    |
| closeNextFrame()                               | Close the next page                           |
| setFrame(page:number, id:string, props:object) | Merge the next page                           |
| getFrame(page:number):props                    | Get props of a page                           |
| closeFrame(page:number)                        | Close a page                                  |

## Demos

Basic demo on codesandbox

https://codesandbox.io/s/r4v7onrpop

React-create-app Demo

https://albinotonnina.github.io/demo-magic-hat

https://github.com/albinotonnina/demo-magic-hat

## Maintainers

[@albinotonnina](https://github.com/albinotonnina)

## Contribute

PRs accepted.

## License

MIT © 2018 Albino Tonnina
