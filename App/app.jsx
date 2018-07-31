import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container } from 'reactstrap';
import classes from './test.css';
// import sClasses from './Styles/index.scss';
import WSocket from './utils/ws';
import Test from './comp';

const ws = new WSocket('ws://localhost:3000');
ws.connect('user').then(() => {
  ReactDOM.render(
    (
      <Container>
        <Row>
          <Col sm="3">
            Connectedd
          </Col>
          <Col sm="6">
            <Test />
          </Col>
        </Row>
      </Container>
    ), document.getElementById('app'),
  );

  ws.on('ws_close', () => {
    console.log('closed');
  });
}).catch((err) => {
  console.log(err);
});
ReactDOM.render(
  (
    <p className={classes.testing}>
      Testing
    </p>), document.getElementById('app'),
);
