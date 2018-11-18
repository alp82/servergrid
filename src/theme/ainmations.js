import { keyframes } from 'react-emotion'

export const fade = keyframes`
	0%, 100% {
		opacity: 0.7;
	}
	
	50% {
		opacity: 0.4;
	}
`;

export const pulse = keyframes`
	0%, 100% {
		opacity: 0.6;
		transform: scale(0.8);
	}
	
	50% {
		opacity: 0.8;
		transform: scale(0.9);
	}
`;
