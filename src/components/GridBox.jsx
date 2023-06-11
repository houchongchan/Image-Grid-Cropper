import styled from "styled-components";
import { ReactComponent as Horizontal } from "./icons/horizontal.svg";
import { ReactComponent as Vertical } from "./icons/vertical.svg";

export default function GridBox(props) {
	const { hoverX, hoverY, lastX, lastY } = props;
	return (
		<Container>
			{!lastY && <VerticalLine hovering={hoverY ? 1 : 0} />}
			{!lastX && <HorizontalLine hovering={hoverX ? 1 : 0} />}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	height: 50px;
	width: 50px;
`;

const HorizontalLine = styled(Horizontal)`
	stroke: ${(props) => (props.hovering ? "red" : "blue")};
`;

const VerticalLine = styled(Vertical)`
	stroke: ${(props) => (props.hovering ? "red" : "blue")};
`;
