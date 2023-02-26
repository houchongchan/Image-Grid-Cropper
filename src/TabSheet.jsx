import styled from "styled-components";
import Chord from "@tombatossals/react-chords/lib/Chord";
import { guitarConfig } from "./components/Config";

export default function TabSheet(props) {
	const { chords } = props;
	return (
		<Container>
			{chords.map((e, i) => {
				return (
					<ChordWrapper key={i}>
						<Chord chord={e} instrument={guitarConfig} lite={false} />
					</ChordWrapper>
				);
			})}
		</Container>
	);
}

const Container = styled.div`
	height: 900px;
	width: 900px;
`;
const ChordWrapper = styled.div`
	width: 100px;
	height 100px;
`;
