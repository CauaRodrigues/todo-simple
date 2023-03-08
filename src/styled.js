import styled from "styled-components";

const Container = styled.main`
	width: 100%;
	min-height: 100vh;
	padding: 0 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f3b562;
`;

const Divider = styled.span`
	padding: 1.5px;
	width: 80%;
	border-radius: 20px;
	background-color: #251e20;
`;

const Card = styled.section`
	min-width: 52vw;
	padding: 24px;
	border-radius: 26px;

	@media (min-width: 1379px) {
		min-width: min-content;
		width: 700px;
	}

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 2rem;

	background-color: #ffffff;

	h1 {
		line-height: 1;
		margin-top: 8px;
		align-self: center;
		text-transform: capitalize;
		text-align: center;
		font-weight: 700;
		font-size: min(3.5rem, 12vw);
	}

	.form-control {
		display: flex;
		gap: 1rem;
		width: 100%;
		flex-wrap: wrap;
	}

	.container--tasks {
		width: 100%;
		display: flex;
		flex-direction: column;

		ul {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		h2 {
			align-self: center;
		}
	}
`;

const Field = styled.input`
	width: 100%;
	padding: 12px 8px;
	border-radius: 8px;
	border: 0.15em solid #6e6e72;
	font-size: min(1rem, 6vw);
	font-weight: 600;

	&:focus {
		outline: none;
		border-color: #0d6efd;
	}
`;

const TagField = styled.div`
	width: 100%;
	padding: 8px 4px;
	border-radius: 8px;
	border: 0.15em solid #6e6e72;
	font-size: min(1rem, 6vw);
	font-weight: 600;

	input {
		outline: none;
		border: 0.15em solid transparent;
		border-radius: 8px;
		padding: 5px;
		margin: 2px;

		&:focus {
			border-color: #0d6efd;
		}

		&::placeholder {
			color: #6e6e72;
			font-weight: 800;
		}
	}

	ul {
		display: flex;
		gap: 0.5rem;

		li {
			padding: 2px 8px;
			background-color: rgba(31, 111, 235, 0.5);
			border-radius: 20px;
			display: flex;
			align-items: center;

			button {
				background: transparent;
				display: flex;
				cursor: pointer;
			}
		}
	}
`;

const Button = styled.button`
	flex-grow: 1;
	padding: 12px 24px;
	border-radius: 8px;

	display: flex;
	justify-content: center;
	align-items: center;

	background: #0d6efd;
	cursor: pointer;
	transition: 0.4s linear;

	&:hover {
		background: #1865b4;
	}
`;

const Task = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 5rem;

	.form-group__task {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		input {
			margin: 0;
			width: 1.2em;
			height: 1.2em;

			display: grid;
			place-content: center;

			-webkit-appearance: none;
			appearance: none;

			border: 0.15em solid #251e20;
			border-radius: 0.15em;
			transform: translateY(-0.075em);
		}

		input::before {
			content: "";
			width: 0.65em;
			height: 0.65em;
			clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
			transform: scale(0);
			transform-origin: bottom left;
			transition: 120ms transform ease-in-out;
			background-color: #d68110;
		}

		input:checked::before {
			transform: scale(1);
		}

		input:checked {
			background-color: #f6ca8e;
		}

		input:checked ~ label {
			text-decoration: line-through;
		}

		input,
		label {
			cursor: pointer;
		}

		label {
			font-size: min(1.1rem, 4vw);
			font-weight: 500;
		}
	}

	.tags {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
`;

const Tag = styled.span`
	padding: 2px 8px;
	background-color: #ffd9a6;
	border-radius: 20px;
	font-size: min(0.9rem, 6vw);
	font-weight: 700;
	color: #1c1718;
`;

const BtnDelete = styled(Button)`
	flex-grow: 0;
	padding: 2px;
	background: transparent;
	color: #000000;

	&:hover {
		background: transparent;
		color: #ef0f14;
	}
`;

export const Styles = {
	Container,
	Card,
	Field,
	TagField,
	Button,
	Task,
	Divider,
	BtnDelete,
	Tag,
};
