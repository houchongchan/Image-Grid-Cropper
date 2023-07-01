import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import GridBox from "./GridBox";
import SVG from "./SVG";
import ReactDOM from "react-dom";

function App() {
	const [image, setImage] = useState();
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [lines, setLines] = useState({ horizontal: 0, vertical: 0 });
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [coordinates, setCoordinates] = useState([]);
	const [polygonPoints, setPolygonPoints] = useState([]);
	const [imgSize, setImgSize] = useState();
	const [loaded, setLoaded] = useState(false);

	const targetRef = useRef();
	const container = useRef();

	useLayoutEffect(() => {
		if (!targetRef.current || targetRef.current.offsetTop == 0) {
			return;
		}
		setDimensions({
			width: targetRef.current.offsetWidth,
			height: targetRef.current.offsetHeight,
		});
		setLines({
			vertical: Math.round(targetRef.current.offsetHeight / 50),
			horizontal: Math.round(targetRef.current.offsetWidth / 50),
		});

		const handleMouseMove = (event) => {
			setMousePosition({
				x: event.clientX - targetRef.current.offsetLeft,
				y: event.clientY - targetRef.current.offsetTop,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react/no-find-dom-node
		if (container.current) {
			const rect = ReactDOM.findDOMNode(
				container.current
			).getBoundingClientRect();
			setImgSize(rect);
		}
	}, [loaded]);

	const uploadImage = (e) => {
		const file = e.target.files[0];

		if (!file) {
			return;
		}

		const url = URL.createObjectURL(file);
		setImage(url);
	};

	return (
		<Container>
			<Title> Puzzle Maker</Title>
			<Title>Upload your own image images and convert them into puzzles!</Title>
			<div>
				<input
					className=" upload-button"
					accept="image/jpg, image/jpeg, image/png"
					type="file"
					name="image"
					onChange={uploadImage}
				/>
			</div>
			<Grid ref={targetRef}>
				{targetRef.current && (
					<Img ref={container} src={image} onLoad={() => setLoaded(!loaded)} />
				)}
				{lines.horizontal &&
					lines.vertical &&
					Array.apply(null, Array(lines.vertical)).map((_, i1) => {
						return (
							<Row key={i1}>
								{Array.apply(null, Array(lines.horizontal)).map((_, i2) => {
									const gridX = i1 * 50;
									const gridY = i2 * 50;
									const nearbyX = (i1 + 1) * 50;
									const nearbyY = (i2 + 1) * 50;
									const range = 25;

									return (
										<GridBox
											key={i2}
											touch={i2}
											lastX={i2 == lines.horizontal - 1}
											lastY={i1 == lines.vertical - 1}
											hoverX={
												mousePosition.y < gridX + range &&
												mousePosition.y > gridX - range &&
												((mousePosition.x < gridY + range &&
													mousePosition.x > gridY - range) ||
													(mousePosition.x < nearbyY + range &&
														mousePosition.x > nearbyY - range) ||
													(mousePosition.x < nearbyY &&
														mousePosition.x > gridY))
											}
											hoverY={
												mousePosition.x < gridY + range &&
												mousePosition.x > gridY - range &&
												((mousePosition.y < gridX + range &&
													mousePosition.y > gridX - range) ||
													(mousePosition.y < nearbyX + range &&
														mousePosition.y > nearbyX - range) ||
													(mousePosition.y < nearbyX &&
														mousePosition.y > i1 * 50))
											}
										/>
									);
								})}
							</Row>
						);
					})}
				{targetRef.current && (
					<Canvas
						coordinates={coordinates}
						onAdd={setCoordinates}
						onComplete={setPolygonPoints}
						height={targetRef.current.offsetHeight}
						width={targetRef.current.offsetWidth}
						x={mousePosition.x}
						y={mousePosition.y}
					/>
				)}
			</Grid>
			<Body>
				{targetRef.current && imgSize && image && (
					<SVG
						height={targetRef.current.offsetHeight}
						polygonPoints={polygonPoints}
						width={targetRef.current.offsetWidth}
						imgSize={imgSize}
						image={image}
					/>
				)}
			</Body>
		</Container>
	);
}

export default App;

const Img = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	opacity: 0.5;
	transform: translate(-50%, -50%);
`;

const Row = styled.div`
	display: flex;
`;

const Title = styled.div`
	text-align: center;
`;

const Body = styled.div`
	color: var(--white);
	display: flex;
	height: 100vh;
`;

const Container = styled.div`
	align-content: center;
	background-color: var(--white);
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-x: hidden;
	position: relative;
	width: 100vw;
`;

const Grid = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	margin: 8px;
	width: 100%;
	position: relative;
	top: 0;
	overflow: hidden;
`;
