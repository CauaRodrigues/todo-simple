import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	*,
	*::after,
	*::before,
	html,
	body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		border: 0;
		font-family: 'Nunito', sans-serif;
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
		text-decoration: none;
	}

	body,
	html {
		background-color: #f3b562;
		color: #1c1718;
	}

	ul,
	li {
		list-style: none;
	}

	img {
		display: block;
		max-width: 100%;
	}
`;
