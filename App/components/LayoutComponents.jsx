import styled from 'styled-components';

const Row = styled.div`
    display:flex;
    flex-wrap:${props => (props.wrap ? 'wrap' : 'no-wrap')};
    justify-content:${props => props.justify};
    align-items:${props => props.align};
    width:100%;

 `;

const Col = styled.div`
   flex-basis:${props => (props.size ? `${props.size}%` : '0%')};
   flex-grow:1;
   flex-shrink:0;
   position : ${props => (props.position || 'initial')};
 `;
const AbsoluteCenter = styled.div`
 position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
`;

export { Row, Col, AbsoluteCenter };
