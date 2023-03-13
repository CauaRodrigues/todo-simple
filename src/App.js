import React from "react";
import { ToDo } from "./ToDo";
import { Styles as S } from "./styled";

export class App extends React.Component {
	render() {
		return (
			<S.Container>
				<ToDo />
			</S.Container>
		);
	}
}
