import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { useSwipeable } from 'react-swipeable'
import EpubView from '../EpubView/EpubView'
import defaultStyles from './style'
import { Swipe } from 'react-swipe-component'

const Swipeable = ({ children, ...props }) => {
  const handlers = useSwipeable(props)
  return <div {...handlers}>{children}</div>
}

class TocItem extends PureComponent {
  setLocation = () => {
    this.props.setLocation(this.props.href)
  }
  render() {
    const { label, styles } = this.props
    return (
      <button onClick={this.setLocation} style={styles}>
        {label}
      </button>
    )
  }
}

TocItem.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  setLocation: PropTypes.func,
  styles: PropTypes.object
}

class ReactReader extends Component {
  constructor(props) {
    super(props)
    this.readerRef = React.createRef()
    this.state = {
      expandedToc: false,
      toc: false,
      touchDevice: true
    }
  }

  componentDidMount() {
    // 현재 epub 파일을 로딩해서 컴포넌트로 받아오는데 평균 최소 1초는 걸린다. (크기, 상황에 따라 다르겠지만)
    setTimeout(() => {
      console.log(
        'iframe',
        document.getElementsByTagName('iframe')[0].className
      )
      let iframe = document.getElementsByTagName('iframe')[0]
      if (iframe && this.state.touchDevice === true) {
        // 만약 state에 touchDevice 여부가 true라면 iframe에 className을 주입해서 마우스 이벤트를 막는다.
        iframe.className = 'mobile'
      } else {
        alert('Page loading failed.')
      }
    }, 2000)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // touch action을 위한 iframe className 조작
    let iframe = document.getElementsByTagName('iframe')[0]
    if (this.state.touchDevice === true) {
      // iframe.className = 'mobile'
    }
    return true // false를 반환하면 render()는 호출되지 않는다.
  }

  componentDidUpdate() {
    let iframe = document.getElementsByTagName('iframe')[0]
    if (this.state.touchDevice === true) {
      // iframe.className = 'mobile'
    }
  }

  // Swipe 함수
  onSwipeLeftListener = () => {
    this.next()
  }
  onSwipeRightListener = () => {
    this.prev()
  }

  toggleToc = () => {
    this.setState({
      expandedToc: !this.state.expandedToc
    })
  }

  next = () => {
    const node = this.readerRef.current
    node.nextPage()
  }

  prev = () => {
    const node = this.readerRef.current
    node.prevPage()
  }

  onTocChange = toc => {
    const { tocChanged } = this.props
    this.setState(
      {
        toc: toc
      },
      () => tocChanged && tocChanged(toc)
    )
  }

  renderToc() {
    const { toc, expandedToc } = this.state
    const { readerStyles } = this.props
    return (
      <div>
        <div style={readerStyles.tocArea}>
          <div style={readerStyles.toc}>
            {toc.map((item, i) => (
              <TocItem
                {...item}
                key={i}
                setLocation={this.setLocation}
                styles={readerStyles.tocAreaButton}
              />
            ))}
          </div>
        </div>
        {expandedToc && (
          <div style={readerStyles.tocBackground} onClick={this.toggleToc} />
        )}
      </div>
    )
  }

  setLocation = loc => {
    const { locationChanged } = this.props
    this.setState(
      {
        expandedToc: false
      },
      () => locationChanged && locationChanged(loc)
    )
  }

  renderTocToggle() {
    const { expandedToc } = this.state
    const { readerStyles } = this.props
    return (
      <button
        style={Object.assign(
          {},
          readerStyles.tocButton,
          expandedToc ? readerStyles.tocButtonExpanded : {}
        )}
        onClick={this.toggleToc}
      >
        <span
          style={Object.assign(
            {},
            readerStyles.tocButtonBar,
            readerStyles.tocButtonBarTop
          )}
        />
        <span
          style={Object.assign(
            {},
            readerStyles.tocButtonBar,
            readerStyles.tocButtonBottom
          )}
        />
      </button>
    )
  }

  render() {
    const {
      title,
      showToc,
      loadingView,
      readerStyles,
      locationChanged,
      swipeable,
      epubViewStyles,
      ...props
    } = this.props
    const { toc, expandedToc } = this.state
    return (
      <div style={readerStyles.container}>
        <div
          style={Object.assign(
            {},
            readerStyles.readerArea,
            expandedToc ? readerStyles.containerExpanded : {}
          )}
        >
          {showToc && this.renderTocToggle()}
          <div style={readerStyles.titleArea}>{title}</div>
          {/* <Swipeable
            onSwipedRight={this.prev}
            onSwipedLeft={this.next}
            trackMouse
          > */}
          <Swipe
            style={{ position: 'relative', height: '100%', width: '100%' }}
            onSwipedLeft={this.onSwipeLeftListener}
            onSwipedRight={this.onSwipeRightListener}
            detectMouse="false"
            detectTouch="true"
          >
            <div style={readerStyles.reader}>
              <EpubView
                ref={this.readerRef}
                loadingView={loadingView}
                epubViewStyles={epubViewStyles}
                {...props}
                tocChanged={this.onTocChange}
                locationChanged={locationChanged}
              />
              <div style={readerStyles.swipeWrapper} />
            </div>
          </Swipe>
          {/* </Swipeable> */}
          {/* <button
            style={Object.assign({}, readerStyles.arrow, readerStyles.prev)}
            onClick={this.prev}
          >
            ‹
          </button>
          <button
            style={Object.assign({}, readerStyles.arrow, readerStyles.next)}
            onClick={this.next}
          >
            ›
          </button> */}
        </div>
        {showToc && toc && this.renderToc()}
      </div>
    )
  }
}

ReactReader.defaultProps = {
  loadingView: <div style={defaultStyles.loadingView}>Loading…</div>,
  locationChanged: null,
  tocChanged: null,
  showToc: true,
  readerStyles: defaultStyles
}

ReactReader.propTypes = {
  title: PropTypes.string,
  loadingView: PropTypes.element,
  showToc: PropTypes.bool,
  locationChanged: PropTypes.func,
  tocChanged: PropTypes.func,
  readerStyles: PropTypes.object,
  epubViewStyles: PropTypes.object,
  swipeable: PropTypes.bool
}

export default ReactReader
