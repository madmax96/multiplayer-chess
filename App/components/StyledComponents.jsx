import styled from 'styled-components';

const BoardLayout = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:600px;
    height:600px;
    display: flex;
    flex-wrap:wrap;
    border:8px solid black;
`;
const FiguresGrid = styled.div`
    position: absolute;
    top:0;
    left:0;
    transform:${props => (props.rotate ? 'rotate(180deg)' : '')};
    width:100%;
    height:100%;
    display: flex;
    flex-wrap:wrap;
`;
const BoardField = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: ${props => (props.fieldColor)};
  flex:0 0 12.5%;
  height:12.5%;
`;

const FigureIMG = styled.img`
    width:auto;
    height:90%;
    transition:'transform' .2s;
    &:hover{
      transform:scale(1.15);
    }
    cursor:pointer
`;


export {
  BoardLayout, BoardField, FiguresGrid, FigureIMG,
};
