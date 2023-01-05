import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f2f2f2 0%, #333 100%);
  overflow: hidden;
`
export const ReaderContainer = styled.div`
  font-size: 16px;
  position: absolute;
  top: ${props => (props.fullscreen ? 0 : 50)}px;
  left: ${props => (props.fullscreen ? 0 : 1)}rem;
  right: ${props => (props.fullscreen ? 0 : 1)}rem;
  bottom: ${props => (props.fullscreen ? 0 : 1)}rem;
  transition: all 0.6s ease;
  ${props => !props.fullscreen && '0 0 5px rgba(0,0,0,.3);'};
`
export const Bar = styled.header`
  position: absolute;
  top: 5px;
  left: 10px;
  right: 20px;
  ${breakpoint('tablet')`
    display: flex;
    align-items: flex-end;
  `};
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${breakpoint('mobile')`
    display: flex;
    // justify-content: center;
    align-items: baseline;
    padding-top: 0.5rem;
  `};
`
const Button = styled.button`
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  appearance: none;
  background: none;
`
export const GenericButton = styled(Button)`
  color: #808080;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  z-index: 2;
  ${breakpoint('tablet')`
    font-size: 16px;
    
  `};
`
export const FontSizeButton = styled(Button)`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  background: #a8a8a8;
  border-radius: 2px;
  padding: 0.5rem;
  &:hover {
    background: #808080;
  }
`
