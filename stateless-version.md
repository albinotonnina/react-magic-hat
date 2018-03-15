# React Magic Hat - stateless

## Usage

```jsx
import {MagicHatNoState} from 'react-magic-hat'
import {ComponentA, ComponentB} from 'components'

const renderFrame = ({id, page, activePage, state, actions}) => {
  const Frame = id === 'componentA' ? ComponentA : ComponentB
  return <Frame />
}

const options = {
  pages: [
    {
      id: 'componentA'
    },
    {
      id: 'componentB'
    }
  ],
  activePage: 1,
  renderFrame
}

const Layout = () => (
  <div>
    <MagicHatNoState {...options} />
  </div>
)
```

## Maintainers

[@albinotonnina](https://github.com/albinotonnina)

## Contribute

PRs accepted.

## License

MIT © 2018 Albino Tonnina
