import Figure from './Figure';
import Rook from './Rook';
import King from './King';
import Pawn from './Pawn';
import Knight from './Knight';
import Queen from './Queen';
import Bishop from './Bishop';

import b from '../../../public/figures/bishopB.png';
import B from '../../../public/figures/bishopW.png';
import k from '../../../public/figures/kingB.png';
import K from '../../../public/figures/kingW.png';
import p from '../../../public/figures/pawnB.png';
import P from '../../../public/figures/pawnW.png';
import n from '../../../public/figures/knightB.png';
import N from '../../../public/figures/knightW.png';
import Q from '../../../public/figures/queenW.png';
import q from '../../../public/figures/queenB.png';
import R from '../../../public/figures/rookW.png';
import r from '../../../public/figures/rookB.png';

const Icons = {
  b, B, k, K, p, P, n, N, Q, q, R, r,
};

export {
  Figure, Rook, King, Queen, Pawn, Knight, Bishop,
  Icons,
};
