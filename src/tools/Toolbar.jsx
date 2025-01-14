import styled from "styled-components";
import { alphabetPoints } from "../Constants.jsx";
import List from "./List.jsx";
import Controls from "./Controls.jsx";
import { useState } from "react";
import { ReactComponent as ArrowDownIcon } from "../icons/arrowdown.svg";
import { ReactComponent as ArrowUpIcon } from "../icons/arrowup.svg";

const alphabet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

export default function Toolbar({
	dimensions,
	onAdd,
	polygonPoints,
	onClearPolygons,
	onLock,
	lock,
	onGapChange,
	gap,
	onGridWidthChange,
}) {
	const [expand, setExpand] = useState(false);
	const [bounce, setBounce] = useState(false);
	return (
		<Container>
			<Wrapper
				onMouseEnter={() => setBounce(true)}
				onMouseLeave={() => setBounce(false)}
			>
				<Title>Inserts</Title>
				<Body height={expand}>
					{alphabet.map((e) => {
						const points = alphabetPoints[e];
						return (
							<Button
								key={e}
								onClick={() => onAdd(points)}
								disabled={points.length === 0}
								inactive={points.length === 0}
							>
								<span>{e}</span>
							</Button>
						);
					})}
				</Body>
				<ExpandButton onClick={() => setExpand(!expand)} move={bounce}>
					{expand ? <ArrowUpIcon /> : <ArrowDownIcon />}
				</ExpandButton>
				<List polygonPoints={polygonPoints} onClearPolygons={onClearPolygons} />
			</Wrapper>
			<Controls
				dimensions={dimensions}
				lock={lock}
				onLock={onLock}
				onGapChange={onGapChange}
				gap={gap}
				onGridWidthChange={onGridWidthChange}
			/>
		</Container>
	);
}

const ExpandButton = styled.div`
	width: 100%;
	height: 30px;
	text-align: center;
	margin-top: 10px;
	cursor: pointer;
	background: cyan;
	position: relative;
	border-radius: 3px;

	svg {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		${({ move }) => move && "animation: bounce 2s infinite;"}
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translate(-50%, -50%);
		}
		40% {
			transform: translate(-50%, calc(-50% + 10px));
		}
		60% {
			transform: translate(-50%, calc(-50% + 5px));
		}
	}
`;
const Button = styled.button`
	width: 40px;
	height: 40px;
	color: #fff;
	border-radius: 5px;
	font-weight: 500;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	&:disabled {
		background: lightgrey;
	}

	outline: none;
	background: linear-gradient(
		0deg,
		rgba(172, 172, 158, 1) 0%,
		rgba(200, 126, 151, 1) 100%
	);

	span {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 40px;
		min-height: 40px;
	}
	&:before,
	&:after {
		position: absolute;
		content: "";
		right: 0;
		top: 0;
		background: rgba(200, 126, 151, 1);
		transition: all 0.3s ease;
	}
	&:before {
		height: 0%;
		width: 2px;
	}
	&:after {
		width: 0%;
		height: 2px;
	}

	span:before,
	span:after {
		position: absolute;
		content: "";
		left: 0;
		bottom: 0;
		background: rgba(200, 126, 151, 1);
		transition: all 0.3s ease;
	}
	span:before {
		width: 2px;
		height: 0%;
	}
	span:after {
		width: 0%;
		height: 2px;
	}

	${({ inactive }) => !inactive && hoverEffects}
`;

const hoverEffects = `	&:hover {
		background: transparent;
		box-shadow: none;
	}
	&:hover:before {
		height: 100%;
	}
	&:hover:after {
		width: 100%;
	}
	span:hover {
		color: rgba(200, 126, 151, 1);
	}
	span:hover:before {
		height: 100%;
	}
	span:hover:after {
		width: 100%;
	}`;

const Title = styled.div`
	background: rgb(92, 64, 132);
	color: cyan;
	text-align: left;
	border-bottom-right-radius: 10px;
	width: fit-content;
	padding: 3px 10px;
	margin-bottom: 10px;
	margin-top: -3px;
	position: relative;
	border: 3px solid #002147;
	border-left: 0px solid #002147;
	border-top: 3px solid rgb(92, 64, 132);

	&::after {
		content: "";
		position: absolute;
		width: 13px;
		height: 100%;
		background: rgb(92, 64, 132);
		top: -3px;
		right: 100%;
		border-top: 3px solid rgb(92, 64, 132);
		border-bottom: 3px solid #002147;
		z-index: 2;
	}
`;

const Container = styled.div`
	z-index: 105;
	background: #f3f5f9;
	height: 100%;
	border: 3px solid #002147;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Wrapper = styled.div`
	padding: 0 10px;
`;

const Body = styled.div`
	position: relative;
	gap: 3px;
	display: grid;
	max-height: ${({ height }) => (height ? "100vh" : "40px")};
	grid-template-columns: repeat(4, 50px);
	overflow: hidden;
	transition: all 0.15s ease;
`;
