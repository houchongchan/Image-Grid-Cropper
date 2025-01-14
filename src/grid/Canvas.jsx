import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function Canvas(props) {
	const { onComplete, coordinates, onAdd, x, y, height, width, gap } = props;
	const canvasRef = useRef();

	const onClick = () => {
		const currentCoords = {
			x: Math.round(x / gap) * gap,
			y: Math.round(y / gap) * gap,
		};
		if (coordinates.length !== 0 && currentCoords.x % gap !== 0) {
			return;
		}
		if (
			coordinates.length > 1 &&
			coordinates[0].x === currentCoords.x &&
			coordinates[0].y === currentCoords.y
		) {
			onComplete((prev) => [...prev, coordinates]);
			onAdd([]);
			return;
		}
		onAdd([...coordinates, currentCoords]);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvasRef.current) {
			return;
		}
		const context = canvas.getContext("2d");
		if (!context) {
			return;
		}

		context.beginPath();
		context.fillStyle = "white";
		context.clearRect(0, 0, width, height);
		context.stroke();

		context.lineWidth = 4;
		coordinates.map((e, i) => {
			if (i === coordinates.length - 1) return;

			context.moveTo(e.x, e.y);
			context.lineTo(coordinates[i + 1].x, coordinates[i + 1].y);
		});
		context.stroke();
	}, [coordinates]);

	return (
		<Container
			height={height}
			width={width}
			ref={canvasRef}
			onClick={onClick}
		/>
	);
}

const Container = styled.canvas`
	height: ${(props) => props.height}px;
	opacity: 50%;
	position: absolute;
	width: ${(props) => props.width}px;
	z-index: 100;
`;
