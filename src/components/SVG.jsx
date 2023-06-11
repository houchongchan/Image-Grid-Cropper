import styled from "styled-components";

export default function SVG(props) {
	const { polygonPoints, height, width } = props;

	return (
		<Container height={height} width={width}>
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
		</Container>
	);
}

const Container = styled.svg`
	margin: 8px;
	height: ${(props) => props.height}px;
	stroke: var(--black2);
	stroke-width: 1;
	width: ${(props) => props.width}px;
`;

const Polygon = styled.polygon`
	fill: ${(props) =>
		props.fill === 1
			? "var(--dental-blue)"
			: props.fill === 2
			? "var(--black2)"
			: "transparent"};
`;
