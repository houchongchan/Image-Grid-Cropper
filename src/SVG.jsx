import styled from "styled-components";
import { useState } from "react";

export default function SVG(props) {
	const { polygonPoints, height, width, imgSize, image } = props;
	const [dimensions, setDimensions] = useState({
		height: height,
		width: width,
	});

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
									fill={1}
								/>
							);
						})}
					</mask>
				</defs>
				<Img
					xlinkHref={image}
					mask="url(#mask)"
					x={dimensions.width / 2 - imgSize.width / 2}
					y={dimensions.height / 2 - imgSize.height / 2}
					transformOrigin={"center"}
				/>
			</SVGContainer>
		</Div>
	);
}

const Img = styled.image``;

const SVGContainer = styled.svg`
	margin: 8px;
	stroke: var(--black2);
	stroke-width: 1;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

const Polygon = styled.polygon`
	fill: white;
`;

const Div = styled.div`
	position: relative;
	top: 0;
	height: ${(props) => props.height};
	width: ${(props) => props.width};
	overflow: hidden;
`;
