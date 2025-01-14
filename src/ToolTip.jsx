import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

function App() {
	return <Container></Container>;
}

export default App;

const Container = styled.div`
	align-content: center;
	display: flex;
	height: 100vh;
	overflow-x: hidden;
	position: relative;
	width: 100vw;
	justify-content: space-between;
	overflow: hidden;
	background: #5c4084;
`;

const Img = styled.img`
	position: absolute;
	top: 50%;
	left: 500px;
	opacity: 0;
	transform: translate(-50%, -50%);
	z-index: -1;
	overflow: hidden;
`;
