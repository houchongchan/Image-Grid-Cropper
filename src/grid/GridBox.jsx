import styled from "styled-components";
// import { ReactComponent as Horizontal } from "./icons/horizontal.svg";
// import { ReactComponent as Vertical } from "./icons/vertical.svg";

export default function GridBox(props) {
	const { hoverX, hoverY } = props;
	// console.log(hoverX, hoverY);
	return (
		<Container>
			<Point active={hoverX && hoverY} />
			{/* <Grid>
				<Box hovering={hoverY ? 1 : 0} />
				<Box hovering={hoverY ? 1 : 0} />
				<Box hovering={hoverY ? 1 : 0} />
				<Box hovering={hoverY ? 1 : 0} />
			</Grid> */}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	height: 50px;
	width: 50px;
	position: relative;
	top: 0;
`;

const Point = styled.div`
	border-radius: 50%;
	background: black;
	height: ${({ active }) => (active ? "8" : "5")}px;
	width: ${({ active }) => (active ? "8" : "5")}px;
	position: absolute;
	top: 0px;
	z-index: 2;
	transform: translate(-50%, -50%);
	cursor: pointer;
	background: ${({ active }) => (active ? "red" : "blue")};
`;

// const Box = styled.div`
// 	height: 50px;
// 	width: 50px;
// 	border-${({ direction }) => direction}-radius: 1px s${({ hovering }) =>
// 	hovering ? "red" : "blue"};
// `;

// const Grid = styled.div`
// 	width: 50px;
// 	height: 50px;
// 	background-color: #fff;
// 	display: grid;
// 	grid-template-columns: 50px 50px;
// 	grid-row: auto auto;
// 	border: 1px solid black;
// 	pointer-events: none;
// `;
