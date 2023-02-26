import { hot } from "react-hot-loader/root";
import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
	useEffect(() => {}, []);

	return (
		<Container>
			<Title> Puzzle Maker</Title>
			<Title>
				{" "}
				Upload your own image images and convert them into puzzles!
			</Title>
			<Grid>
				<Box key={i}></Box>
			</Grid>
			<Body></Body>
		</Container>
	);
}

export default hot(App);

const Title = styled.div``;

const Body = styled.div`
	display: flex;
	color: var(--white);
`;

const Container = styled.div`
	background-color: var(--white);
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-x: hidden;
	position: relative;
`;

const Grid = styled.div`
	display: grid;
	gap: 0px;
	grid: 150px 150px;
	// grid-template-columns: 1fr 1fr 1fr 1fr;
	// grid-template-riws: 1fr 1fr 1fr 1fr;
`;

const Box = styled.div`
	width: 100px;
	height 100px;
	background: blue;
`;
