import { useState } from "react";
import styled from "styled-components";

export default function Controls({
	dimensions,
	onLock,
	lock,
	onGapChange,
	gap,
	onGridWidthChange,
}) {
	const [gapInput, setGapInput] = useState(gap);
	const [widthHover, setWidthHover] = useState(false);
	const [gapHover, setGapHover] = useState(false);
	const [lockHover, setLockHover] = useState(false);

	const onGapInputChange = (value) => {
		setGapInput(value);
		if (value.length !== 2) return;
		onGapChange(value);
	};

	return (
		<Container>
			<Title>Controls</Title>
			<Wrapper>
				<Lock>
					<LockWrap
						onMouseEnter={() => setLockHover(true)}
						onMouseLeave={() => setLockHover(false)}
					>
						Lock Width
						<Span active={lockHover} left={100}>
							Lock width to screen size
						</Span>
						<CheckboxWrapper>
							<input
								type="checkbox"
								checked={lock}
								id="squaredTwo"
								name="check"
								onClick={() => onLock()}
							/>
							<label for="squaredTwo"></label>
						</CheckboxWrapper>
					</LockWrap>
				</Lock>
				<Lock disabled={lock}>
					Grid Width:
					<RangeSlider>
						<Input
							value={dimensions.width}
							onChange={(e) => onGridWidthChange(e.target.value)}
							disabled={lock}
							type="range"
							min={gap}
							max="2000"
							step={gap}
							onMouseEnter={() => setWidthHover(true)}
							onMouseLeave={() => setWidthHover(false)}
						/>
						<Span active={widthHover} left={(dimensions.width / 2000) * 100}>
							{dimensions.width}px
						</Span>
					</RangeSlider>
				</Lock>
				<Lock>
					Current Grid:
					<RangeSlider>
						<Input
							value={gapInput}
							onChange={(e) => onGapInputChange(e.target.value)}
							type="range"
							min="20"
							max="50"
							step="5"
							onMouseEnter={() => setGapHover(true)}
							onMouseLeave={() => setGapHover(false)}
						/>

						<Span active={gapHover} left={((gapInput - 20) / 30) * 100}>
							{gapInput}px
						</Span>
					</RangeSlider>
				</Lock>
				<Background>
					<svg>
						<rect id="i1" x="0" y="0" width="100%" height="100%"></rect>
					</svg>
				</Background>
			</Wrapper>
		</Container>
	);
}

const Title = styled.div`
	color: #fff;
	background-color: #0062cc;
	text-align: center;
	padding: 6px;
`;

const Container = styled.div`
	background: #f3f5f9;
	flex: 0;
	position: relative;
	padding: 5px;
`;

const Input = styled.input`
	-webkit-appearance: none;
	width: 100%;
	height: 10px;
	border-radius: 5px;
	background: ${({ disabled }) => (disabled ? "lightgrey" : "#d7dcdf")};
	outline: none;
	padding: 0;
	margin: 0;

	&::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: ${({ disabled }) => (disabled ? "grey" : "#2c3e50")};
		cursor: pointer;
		transition: background 0.15s ease-in-out;

		&:hover {
			background: #1abc9c;
		}
	}

	&:active::-webkit-slider-thumb {
		background: #1abc9c;
	}
`;

const Wrapper = styled.div`
	padding: 10px;
	position: relative;
`;

const Lock = styled.div`
	white-space: nowrap;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 6px;
	margin: 0;
	color: ${({ disabled }) => (disabled ? "grey" : "#2c3e50")};
`;

const CheckboxWrapper = styled.div`
	width: 28px;
	height: 28px;
	background: #fcfff4;
	background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fcfff4', endColorstr='#b3bead',GradientType=0 );
	margin: auto;

	box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);
	position: relative;

	label {
		cursor: pointer;
		position: absolute;
		width: 20px;
		height: 20px;
		left: 4px;
		top: 4px;

		box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
			0px 1px 0px rgba(255, 255, 255, 1);

		background: -webkit-linear-gradient(top, #222 0%, darkblue 100%);
		background: -moz-linear-gradient(top, #222 0%, darkblue 100%);
		background: -o-linear-gradient(top, #222 0%, darkblue 100%);
		background: -ms-linear-gradient(top, #222 0%, darkblue 100%);
		background: linear-gradient(top, #222 0%, darkblue 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#222', endColorstr='darkblue',GradientType=0 );
	}

	label:after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		filter: alpha(opacity=0);
		opacity: 0;
		content: "";
		position: absolute;
		width: 9px;
		height: 5px;
		background: transparent;
		top: 4px;
		left: 4px;
		border: 3px solid #fcfff4;
		border-top: none;
		border-right: none;

		transform: rotate(-45deg);
	}

	label:hover::after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";
		filter: alpha(opacity=30);
		opacity: 0.3;
	}

	input[type="checkbox"]:checked + label:after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		filter: alpha(opacity=100);
		opacity: 1;
	}

	input[type="checkbox"] {
		visibility: hidden;
	}
`;

const RangeSlider = styled.div`
	width: 100%;
	position: relative;
	left: 0px;
	flex: 2;
`;

const Span = styled.span`
	display: inline-block;
	position: relative;
	flex: 1;
	color: #fff;
	line-height: 20px;
	text-align: center;
	border-radius: 3px;
	background: #2c3e50;
	padding: 5px 10px;
	position: absolute;
	bottom: 100%;
	opacity: ${({ active }) => (active ? 1 : 0)};
	transition: opacity 0.25s ease-in;
	right: calc(
		${({ left }) => 100 - left + "%"} -
			${({ left }) => ((100 - left) / 100) * 16}px
	);

	&:after {
		position: absolute;
		bottom: -7px;
		right: 7px;
		width: 0;
		height: 0;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
		border-top: 7px solid #2c3e50;
		content: "";
	}
`;

const LockWrap = styled.div`
	white-space: nowrap;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 6px;
	span {
		label {
			font-size: 11px;
		}
	}
	position: relative;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;

	svg {
		position: absolute;
		top: -3px;
		left: 0;
		width: 100%;
		height: 100%;
		stroke-width: 2;
		stroke: #365fa0;
		fill: transparent;
		#i1 {
			animation: stroke 5s infinite;
		}
	}

	@keyframes stroke {
		0% {
			stroke: #0062cc;
			stroke-dashoffset: 250%;
			stroke-dasharray: 0 100%;
			stroke-width: 1;
		}
		70% {
			stroke: #0062cc;
		}
		80% {
			stroke: #0062cc;
			stroke-width: 2;
		}
		100% {
			stroke: #0062cc;
			stroke-dashoffset: -25%;
			stroke-dasharray: 50% 0;
		}
	}
`;
