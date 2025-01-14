import styled from "styled-components";

export default function List({ onClearPolygons }) {
	return (
		<Container>
			<Title>Overall Functions</Title>
			<Button onClick={() => onClearPolygons()}>Clear </Button>
		</Container>
	);
}

const Button = styled.button`
	position: relative;
	padding: 6px 15px;
	width: 60px;
	text-align: center;
	cursor: pointer;
	max-width: 15em;
	border-radius: 5px;
	color: #fff;
	&:active {
		transform: scale(0.8);
	}

	background-color: #ff5733;
	&:hover {
		color: #fff;
		z-index: 3;
		transition-delay: 1s;
	}
	&:before {
		content: "";
		position: absolute;
		left: 60px;
		top: 50%;
		transform: translateY(-50%) scale(0.6);
		width: 10px;
		height: 10px;
		border-radius: 50%;
		z-index: 1;
		transition-property: left, transform;
		transition-delay: 0s, 0s;
		transition-duration: 1s, 0.5s;
		opacity: 0;
	}
	&:hover:before {
		left: 10px;
		transform: translateY(-50%) scale(50);
		transition-delay: 0s, 1s;
		opacity: 1;
		background: #fb6b15;
		z-index: -1;
	}
	&:after {
		content: "";
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translateY(-50%) scale(0.6);
		width: 10px;
		height: 10px;
		border-radius: 50%;
		z-index: 1;
		transition-property: right, transform;
		transition-delay: 0s, 0s;
		transition-duration: 1s, 0.5s;
		opacity: 0;
	}
	&:hover:after {
		right: 10px;
		transform: translateY(-50%) scale(50);
		transition-delay: 0s, 1s;
		opacity: 1;
		background: #fb6b15;
		z-index: -1;
	}
`;

const Title = styled.div`
	background: rgb(92, 64, 132);
	color: cyan;
	text-align: left;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
	margin-top: 20px;
	width: fit-content;
	padding: 3px 10px;
	position: relative;
	border: 3px solid #002147;
	border-left: 0px solid #002147;
	box-sizing: border-box;

	&::after {
		content: "";
		position: absolute;
		width: 13px;
		height: 100%;
		background: rgb(92, 64, 132);
		top: -3px;
		right: 100%;
		border-top: 3px solid #002147;
		border-bottom: 3px solid #002147;
		z-index: 2;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
`;
