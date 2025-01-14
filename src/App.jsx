import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Canvas from "./grid/Canvas";
import GridBox from "./grid/GridBox";
import SVG from "./grid/SVG";
import ReactDOM from "react-dom";
import Toolbar from "./tools/Toolbar";
import { createMarkdown } from "./Utils";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";

function App() {
	const [image, setImage] = useState();
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [lines, setLines] = useState({ horizontal: 0, vertical: 0 });
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [coordinates, setCoordinates] = useState([]);
	const [polygonPoints, setPolygonPoints] = useState([]);
	const [imgSize, setImgSize] = useState();
	const [loaded, setLoaded] = useState(false);
	const [lock, setLock] = useState(true);
	const [gap, setGap] = useState(50);

	const targetRef = useRef();
	const leftRef = useRef();
	const container = useRef();

	useLayoutEffect(() => {
		if (!targetRef.current || targetRef.current.offsetTop === 0) return;

		const width = Math.round(targetRef.current.offsetWidth / gap) * gap;
		const height = Math.round(targetRef.current.offsetHeight / gap) * gap;
		setDimensions({
			width: width,
			height: height,
		});
		setLines({
			vertical: Math.round(targetRef.current.offsetHeight / gap),
			horizontal: Math.round(targetRef.current.offsetWidth / gap),
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
		if (leftRef.current && targetRef.current) {
			const observer = new ResizeObserver((entries) => {
				if (lock) {
					const width = Math.round(leftRef.current.offsetWidth / gap) * gap;
					const height = Math.round(targetRef.current.offsetHeight / gap) * gap;
					setDimensions({
						height,
						width,
					});
					setLines({
						vertical: Math.round(targetRef.current.offsetHeight / gap),
						horizontal: Math.round(leftRef.current.offsetWidth / gap),
					});
				}
			});
			observer.observe(leftRef.current);

			return () => {
				observer.disconnect();
			};
		}
	}, [lock, gap]);

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
		if (!file) return;
		const url = URL.createObjectURL(file);
		setImage(url);
	};

	const onToolbarButtonClick = (points) => {
		setPolygonPoints([...polygonPoints, points]);
	};

	const onPolygonChange = (id, id2, x, y) => {
		const tmp = JSON.parse(JSON.stringify(polygonPoints));
		tmp[id][id2] = { x, y };
		setPolygonPoints(tmp);
	};

	const onMovePolygon = (id, x, y) => {
		const tmp = JSON.parse(JSON.stringify(polygonPoints));
		const changeX = x - tmp[id][0].x;
		const changeY = y - tmp[id][0].y;
		tmp[id] = tmp[id].map((e) => {
			return { x: e.x + changeX, y: e.y + changeY };
		});

		setPolygonPoints(tmp);
	};

	const onClearPolygons = () => {
		setPolygonPoints([]);
	};

	const copySVGCode = () => {
		const copyText = createMarkdown(dimensions, polygonPoints, image, imgSize);
		navigator.clipboard.writeText(copyText);
	};

	const onGridWidthChange = (newWidth) => {
		const width = Math.round(newWidth / gap) * gap;
		const height = Math.round(targetRef.current.offsetHeight / gap) * gap;

		setDimensions({
			height,
			width,
		});

		setLines({
			vertical: Math.round(targetRef.current.offsetHeight / gap),
			horizontal: width / gap,
		});
	};

	return (
		<Container>
			<Col ref={leftRef}>
				<Title>
					<svg>
						<text id="i1" x="50%" y="50%" dy=".35em" text-anchor="middle">
							Polygon / Clip Path Generator
						</text>
					</svg>
					<File
						className=" upload-button"
						accept="image/jpg, image/jpeg, image/png"
						type="file"
						name="image"
						onChange={uploadImage}
					/>
				</Title>
				<GridWrapper lock={lock}>
					<Grid ref={targetRef} dimensions={dimensions}>
						{targetRef.current && (
							<Img
								ref={container}
								src={image}
								onLoad={() => setLoaded(!loaded)}
							/>
						)}
						{lines.horizontal &&
							lines.vertical &&
							Array.apply(null, Array(lines.vertical)).map((_, i1) => {
								return (
									<Row key={i1}>
										{Array.apply(null, Array(lines.horizontal)).map((_, i2) => {
											const gridX = i1 * gap;
											const gridY = i2 * gap;
											const nearbyX = (i1 + 1) * gap;
											const nearbyY = (i2 + 1) * gap;
											const range = gap * 1.5;

											return (
												<GridBox
													key={i2}
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
																mousePosition.y > i1 * gap))
													}
													gap={gap}
												/>
											);
										})}
									</Row>
								);
							})}
						{targetRef.current && (
							<Canvas
								gap={gap}
								coordinates={coordinates}
								onAdd={setCoordinates}
								onComplete={setPolygonPoints}
								height={dimensions.height}
								width={dimensions.width}
								x={mousePosition.x}
								y={mousePosition.y}
							/>
						)}
						{targetRef.current && (
							<SVG
								height={dimensions.height}
								polygonPoints={polygonPoints}
								width={dimensions.width}
								imgSize={imgSize}
								image={image}
								onPolygonChange={onPolygonChange}
								onMovePolygon={onMovePolygon}
								gap={gap}
							/>
						)}
					</Grid>
				</GridWrapper>
				<SVGCode>
					<code>
						{createMarkdown(dimensions, polygonPoints, image, imgSize)}
					</code>
				</SVGCode>
				<Copy onClick={copySVGCode} />
			</Col>
			<Body>
				<Toolbar
					onAdd={onToolbarButtonClick}
					polygonPoints={polygonPoints}
					onClearPolygons={onClearPolygons}
					dimensions={dimensions}
					onLock={() => setLock(!lock)}
					lock={lock}
					onGapChange={(e) => setGap(e)}
					gap={gap}
					onGridWidthChange={onGridWidthChange}
				/>
			</Body>
		</Container>
	);
}

export default App;

const SVGCode = styled.pre`
	display: flex;
	margin: 8px;
	flex: 1;
`;

const Copy = styled(CopyIcon)`
	position: absolute;
	bottom: 30px;
	right: 30px;
	width: 30px;
	height: 30px;
	background: #f5f5;
	padding: 3px;
	border-radius: 3px;
	cursor: pointer;
`;

const Col = styled.div`
	display: flex;
	flex-direction: column;
	margin: 8px;
	width: 80%;
	background-color: #fff;
	border-radius: 6px;
	overflow: hidden;
	position: relative;
	top: 0;
`;

const Row = styled.div`
	display: flex;
`;

const Title = styled.div`
	text-align: center;
	background: rgba(251, 252, 247, 0.75);
	border-radius: 6px;
	box-shadow: inset 0 -3px rgba(211, 208, 201, 0.25);
	overflow: hidden;
	display: flex;
	padding: 10px;
	padding-top: 5px;

	svg {
		height: 50px;
		width: 100%;
	}

	svg text {
		stroke-width: 2;
		stroke: #365fa0;
		font-size: 30px;
	}

	@keyframes stroke {
		0% {
			fill: rgba(72, 138, 204, 0);
			stroke: rgba(54, 95, 160, 1);
			stroke-dashoffset: 25%;
			stroke-dasharray: 0 50%;
			stroke-width: 1;
		}
		70% {
			fill: rgba(72, 138, 204, 0);
			stroke: rgba(54, 95, 160, 1);
		}
		80% {
			fill: rgba(72, 138, 204, 0);
			stroke: rgba(54, 95, 160, 1);
			stroke-width: 2;
		}
		100% {
			fill: rgba(72, 138, 204, 1);
			stroke: rgba(54, 95, 160, 0);
			stroke-dashoffset: -25%;
			stroke-dasharray: 50% 0;
			stroke-width: 0;
		}
	}
	#i1 {
		animation: stroke 5s linear alternate;
	}
`;

const Body = styled.div`
	display: flex;
	height: 100vh;
	justify-content: space-between;
	padding: 6px;
`;

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

const GridWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 70%;
	overflow-x: ${({ lock }) => (lock ? `hidden` : "scroll")};
	overflow-y: hidden;
`;

const Grid = styled.div`
	display: flex;
	flex-direction: column;
	height: ${({ dimensions }) =>
		dimensions.height !== 0 ? `${dimensions.height}px` : "100%"};
	width: ${({ dimensions }) =>
		dimensions.width !== 0 ? `${dimensions.width}px` : "100%"};
	position: relative;
	top: 0;
	margin: 12px;
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

const File = styled.input`
	border: 2px solid cyan;
	width: 180px;
	font-size: 10px;
	padding-left: 15px;
	color: grey;
	cursor: pointer;
	height: 80%;
	display: flex;
	align-items: center;
	align-self: center;
	cursor: pointer;

	&:focus,
	&:active {
		outline: 0;
		border-color: red;
	}

	&::-webkit-file-upload-button {
		border: 0;
		color: white;
		font-size: 12px;
		background: #365fa0;
		padding: 10px;
		margin-left: -15px;
	}
`;
