import React, { Component } from "react";
import ToDo from "./components/ToDo";
import { Styles as S } from "./styled";

export default class App extends Component {
	render() {
		return (
			<S.Container>
				<ToDo />
			</S.Container>
		);
	}
}
