import styled from "styled-components";

export default function GridBox(props) {
	const { hoverX, hoverY, gap } = props;
	return (
		<Container gap={gap}>
			<Point active={hoverX && hoverY} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	height: ${({ gap }) => gap}px;
	width: ${({ gap }) => gap}px;
	position: relative;
	top: 0;
`;

const Point = styled.div`
	border-radius: 50%;
	background: black;
	height: ${({ active }) => (active ? "10" : "5")}px;
	width: ${({ active }) => (active ? "10" : "5")}px;
	position: absolute;
	top: 0px;
	z-index: 2;
	transform: translate(-50%, -50%);
	cursor: pointer;
	background: ${({ active }) => (active ? "#EE4B2B" : "blue")};
	transition: background 0.25s ease, width 0.25s ease, height 0.25s ease;

	&:hover {
		background: #58111a;
	}
`;
