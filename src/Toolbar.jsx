import styled from "styled-components";
import { alphabetPoints } from "./Constants.jsx";
import List from "./list/List.jsx";

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

export default function Toolbar({ onAdd, polygonPoints, onClearPolygons }) {
	return (
		<Container>
			<Title>Inserts</Title>
			<Wrapper>
				<Body>
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
				<List polygonPoints={polygonPoints} onClearPolygons={onClearPolygons} />
			</Wrapper>
		</Container>
	);
}

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
	color: #fff;
	background-color: #0062cc;
	border-color: #005cbf;
	text-align: center;
	padding: 6px;
`;

const Container = styled.div`
	z-index: 105;
	background: #f3f5f9;
	height: 100%;
	border: 3px solid #002147;
	border-radius: 6px;
`;

const Wrapper = styled.div`
	padding: 10px;
`;

const Body = styled.div`
	position: relative;
	gap: 3px;
	display: grid;

	grid-template-columns: repeat(3, 50px);
`;
