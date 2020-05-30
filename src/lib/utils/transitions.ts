import { keyframes } from 'styled-components';

const shaking = keyframes`
0% {
  transform: rotate(-10deg)
}
2% {
  transform: rotate(20deg)
}
4% {
  transform: rotate(-20deg)
}
6% {
  transform: rotate(15deg)
}
8% {
  transform: rotate(0deg)
}
`;

const transitions = {
  shaking,
};

export default transitions;
