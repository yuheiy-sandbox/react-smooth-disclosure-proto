import React from 'react'
import {Motion, spring} from 'react-motion'
import classNames from 'classnames'

const SPRING_PRECISION = 1

const noop = () => {}

const defaultSpringConfig = {
  stiffness: 300,
  damping: 27,
}

const defaultClassName = {
  base: 'ReactSmoothDisclosure-wrapper',
  opening: 'is-opening',
  opened: 'is-opened',
  closing: 'is-closing',
  closed: 'is-closed',
}

const defaultInnerClassName = {
  base: 'ReactSmoothDisclosure-inner',
  opening: 'is-opening',
  opened: 'is-opened',
  closing: 'is-closing',
  closed: 'is-closed',
}

export default class SmoothDisclosure extends React.Component {
  static defaultProps = {
    isOpened: false,
    closedHeight: -1,
    openedHeight: -1,
    springConfig: defaultSpringConfig,
    // onToggle: noop,
    onToggle: () => {
      console.log('toggle')
    },
    // onAfterOpen: noop,
    onAfterOpen: () => {
      console.log('after open')
    },
    // onAfterClose: noop,
    onAfterClose: () => {
      console.log('after close')
    },
    className: defaultClassName,
    innerClassName: defaultInnerClassName,
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
      this.setState({to, isResting: false, shouldAnimate: true}, () => this.props.onToggle())
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
        if (!this.state.isResting) {
          this.setState({isResting: true}, () => {
            const {isOpened, onAfterOpen, onAfterClose} = this.props
            if (isOpened) {
              onAfterOpen()
            } else {
              onAfterClose()
            }
          })
        }
      },
    }
  }

  renderMotionChildren = ({height}) => {
    const {
      isOpened: shouldOpen,
      className,
      innerClassName,
      openedHeight,
      children,
      closedHeight: _closedHeight,
      springConfig: _springConfig,
      onToggle: _onToggle,
      onAfterOpen: _onAfterOpen,
      onAfterClose: _onAfterClose,
      ...wrapperProps,
    } = this.props
    const {isResting} = this.state
    const isOpening = !isResting && shouldOpen
    const isClosing = !isResting && !shouldOpen
    const hasOpened = isResting && shouldOpen
    const hasClosed = isResting && !shouldOpen
    return <div
      ref={c => this.wrapperEl = c}
      className={classNames(className.base, {
        [className.opening]: isOpening,
        [className.closing]: isClosing,
        [className.opened]: hasOpened,
        [className.closed]: hasClosed,
      })}
      style={{
        overflow: 'hidden',
        height: hasOpened
          ? (openedHeight > -1) ? openedHeight : 'auto'
          : height,
      }}
      {...wrapperProps}
    >
      <div
        ref={c => this.innerEl = c}
        className={classNames(innerClassName.base, {
          [innerClassName.opening]: isOpening,
          [innerClassName.closing]: isClosing,
          [innerClassName.opened]: hasOpened,
          [innerClassName.closed]: hasClosed,
        })}
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
