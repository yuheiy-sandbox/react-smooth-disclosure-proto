import React from 'react'
import {Motion, spring} from 'react-motion'
import classNames from 'classnames'

const SPRING_PRECISION = 1

const noop = () => {}

const defaultSpringConfig = {
  stiffness: 300,
  damping: 27,
}

const defaultClassNames = {
  wrapper: 'ReactSmoothDisclosure-wrapper',
  inner: 'ReactSmoothDisclosure-inner',
}

export default class SmoothDisclosure extends React.Component {
  static defaultProps = {
    isOpened: false,
    closedHeight: -1,
    openedHeight: -1,
    springConfig: defaultSpringConfig,
    onRest: noop,
    classNames: defaultClassNames,
  }

  state = {
    from: 0,
    to: 0,
    shouldAnimate: false,
    isResting: true,
  }

  componentDidMount() {
    const to = this.getTo()
    this.setState({from: to, to})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpened !== this.props.isOpened) {
      const to = this.getTo()
      this.setState({to, isResting: false, shouldAnimate: true})
    }
  }

  getTo() {
    const {isOpened, openedHeight, closedHeight} = this.props
    if (isOpened) {
      return (openedHeight > -1) ? openedHeight : this.innerEl.clientHeight
    } else {
      return (closedHeight > -1) ? closedHeight : 0
    }
  }

  getMotionProps() {
    const {springConfig} = this.props
    return {
      defaultStyle: {
        height: this.state.from,
      },
      style: {
        height: this.state.shouldAnimate
          ? spring(this.state.to, {precision: SPRING_PRECISION, ...springConfig})
          : this.state.to,
      },
      onRest: () => {
        this.setState({isResting: true})
      }
    }
  }

  renderMotionChildren = ({height}) => {
    const {isOpened: shouldOpen, classNames: cssClassNames, openedHeight, children} = this.props
    const {isResting} = this.state
    const isOpening = !isResting && shouldOpen
    const isClosing = !isResting && !shouldOpen
    const hasOpened = isResting && shouldOpen
    const hasClosed = isResting && !shouldOpen
    return <div
      ref={c => this.wrapperEl = c}
      className={classNames(cssClassNames.wrapper, {
        'is-opening': isOpening,
        'is-closing': isClosing,
        'is-opened': hasOpened,
        'is-closed': hasClosed,
      })}
      style={{
        overflow: 'hidden',
        height: hasOpened
          ? (openedHeight > -1) ? openedHeight : 'auto'
          : height,
      }}
    >
      <div
        ref={c => this.innerEl = c}
        className={cssClassNames.inner}
        style={{
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  }

  render() {
    return <Motion {...this.getMotionProps()}>
      {this.renderMotionChildren}
    </Motion>
  }
}
