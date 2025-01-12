import styled from "styled-components";
import AdjustablePolygon from "./AdjustablePolygon";

export default function SVG(props) {
	const { polygonPoints, height, width, imgSize, image, onPolygonChange } =
		props;
	const dimensions = {
		height: height || 100,
		width: width || 100,
	};

	return (
		<Div width={`${dimensions.width}px`} height={`${dimensions.height}px`}>
			<SVGContainer
				xmlns={"http://www.w3.org/2000/svgContainer"}
				width={`${dimensions.width}px`}
				height={`${dimensions.height}px`}
				viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
				preserveAspectRatio="xMidYMid slice"
			>
				<defs>
					<filter id="filter">
						<feGaussianBlur stdDeviation="5" />
					</filter>
					<mask id="mask">
						{polygonPoints.map((points, i) => {
							return (
								<Polygon
									key={i}
									points={`${points.map((e) => {
										return `${e.x},${e.y} `;
									})}`}
								/>
							);
						})}
					</mask>
				</defs>
				{image && imgSize ? (
					<Img
						xlinkHref={image}
						mask="url(#mask)"
						x={dimensions.width / 2 - imgSize.width / 2}
						y={dimensions.height / 2 - imgSize.height / 2}
						transformOrigin={"center"}
					/>
				) : (
					<Rect mask="url(#mask)" transformOrigin={"center"} />
				)}
			</SVGContainer>
			<EventContainer>
				{polygonPoints.map((points, i) => {
					return (
						<AdjustablePolygon
							key={i}
							points={points}
							id={i}
							onChange={(i2, x, y) => onPolygonChange(i, i2, x, y)}
						/>
					);
				})}
			</EventContainer>
		</Div>
	);
}

const Rect = styled.rect`
	width: 100%;
	height: 100%;
	background: black;
`;
const Img = styled.image``;

const SVGContainer = styled.svg`
	stroke: var(--black2);
	stroke-width: 1;
	width: 100%;
	height: 100%;
`;

const Polygon = styled.polygon`
	fill: white;
`;

const Div = styled.div`
	height: ${(props) => props.height};
	opacity: 50%;
	position: absolute;
	width: ${(props) => props.width};
	z-index: 101;
	pointer-events: none;
`;

const EventContainer = styled.div`
	width: 100%;
	height: 100%;
	pointer-events: none;
`;
