import styled from "styled-components";
import React, { useRef, useState } from "react";

function DetectionBox(props) {
	const { points, onChange, parentWidth, parentHeight } = props;

	const [clicked, setClicked] = useState(false);
	const dragOccurred = useRef(false);

	const mouseXAtPress = useRef();
	const mouseYAtPress = useRef();
	const idAtPress = useRef();
	const startXAtPress = useRef();
	const startYAtPress = useRef();

	const onMidMouseDown = (event, id, x, y) => {
		idAtPress.current = id;
		if (event.button === 0) {
			event.preventDefault();
			onDragBegin(event.clientX, event.clientY, x, y);
		}
	};

	const onDragBegin = (eventX, eventY, x, y) => {
		setClicked(true);

		mouseXAtPress.current = eventX;
		mouseYAtPress.current = eventY;

		startXAtPress.current = x;
		startYAtPress.current = y;
	};

	const onMouseMove = (x, y) => {
		if (!clicked) return;
		onDrag(x, y);
	};

	const onDrag = (eventX, eventY) => {
		let x = getXAfterDrag(startXAtPress, eventX);
		let y = getYAfterDrag(startYAtPress, eventY);

		onChange(idAtPress.current, x, y);
	};

	const getXAfterDrag = (xAtPress, clientX) =>
		xAtPress.current + (clientX - mouseXAtPress.current);

	const getYAfterDrag = (yAtPress, clientY) =>
		yAtPress.current + (clientY - mouseYAtPress.current);

	const onMouseUp = (event) => {
		endDrag(event.clientX, event.clientY);
	};

	const endDrag = (clientX, clientY) => {
		if (!clicked) return;
		if (dragOccurred) {
			dragOccurred.current = false;
		}

		setClicked(false);
		const x = getXAfterDrag(startXAtPress, clientX);
		const y = getYAfterDrag(startYAtPress, clientY);
		if (x % 50 !== 1 || y % 50 !== 1) {
			const newX = Math.round(x / 50) * 50;
			const newY = Math.round(y / 50) * 50;
			onChange(idAtPress.current, newX, newY);
		}
	};

	return (
		<Container
			tabIndex={0}
			onMouseMove={(e) => onMouseMove(e.clientX, e.clientY)}
			onMouseUp={(e) => onMouseUp(e)}
			width={parentWidth}
			height={parentHeight}
			dragging={clicked}
		>
			<SVG>
				{points.map((e, id2) => {
					const x = e.x;
					const y = e.y;
					return (
						<Circle
							key={id2}
							cx={e.x}
							cy={e.y}
							r={3}
							onMouseDown={(e) => onMidMouseDown(e, id2, x, y)}
						/>
					);
				})}
			</SVG>
		</Container>
	);
}

export default React.memo(DetectionBox);

const Container = styled.div.attrs((props) => ({
	style: {
		width: "100%",
		height: "100%",
	},
}))`
	position: absolute;
	top: 0px;
	pointer-events: ${(props) => (props.dragging ? "all" : "none")};
	z-index: ${({ size }) => Math.round(55 / size)};
`;

const Circle = styled.circle`
	cursor: pointer;
	pointer-events: auto;
`;

const SVG = styled.svg`
	stroke-width: 6px;
	stroke: red;
	cursor: pointer;
	width: 100%;
	height: 100%;
`;