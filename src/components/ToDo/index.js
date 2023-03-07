import React, { Component } from "react";
import { Styles as S } from "../../styled";
import { AiOutlineDelete, AiOutlineSend } from "react-icons/ai";
import { GenerateId } from "../../utils/GenerateID";

export default class ToDo extends Component {
	state = {
		task: "",
		categoryTask: "",
		tasksList: [],
		categoriesList: [
			{ id: 2, name: "work" },
			{ id: 1, name: "general" },
			{ id: 3, name: "study" },
			{ id: 4, name: "personal" },
		],
	};

	handlerTask = (e) => {
		this.setState({
			task: e.target.value,
		});
	};

	addTask = () => {
		if (this.state.task) {
			this.setState({
				tasksList: [
					...this.state.tasksList,
					{
						id: new GenerateId().getID(),
						name: this.state.task,
						complete: false,
						category: null,
					},
				],
				task: "",
			});
		}
	};

	removeTask = (idTask) => {
		this.setState({
			tasksList: this.state.tasksList.filter((task) => task.id !== idTask),
		});
	};

	render() {
		return (
			<S.Card>
				<h1>to do</h1>

				<S.Divider />

				<div className="form-control">
					<S.Field
						type="text"
						placeholder="Study"
						name="newTask"
						id="newTask"
						value={this.state.task}
						onChange={this.handlerTask}
						autoComplete="off"
					/>

					<S.OptionsField id="categories">
						{this.state.categoriesList[0]
							? this.state.categoriesList.map(({ id, name }) => (
									<option key={id} value={name}>
										{name}
									</option>
							  ))
							: null}
					</S.OptionsField>

					<S.Button type="button" onClick={this.addTask}>
						<AiOutlineSend size={24} color="#ffffff" />
					</S.Button>
				</div>

				<div className="container--tasks">
					{/* details > summary  */}
					{this.state.tasksList[0] ? (
						<ul>
							{this.state.tasksList.map(({ name, id }) => (
								<S.Task key={id}>
									<div className="form-group__task">
										<input type="checkbox" name={id} id={id} />
										<label htmlFor={id}>{name}</label>
									</div>

									<S.BtnDelete onClick={() => this.removeTask(id)}>
										<AiOutlineDelete size={22} />
									</S.BtnDelete>
								</S.Task>
							))}
						</ul>
					) : (
						<h2>🎉 Sem Tarefas 🎉</h2>
					)}
				</div>
			</S.Card>
		);
	}
}
