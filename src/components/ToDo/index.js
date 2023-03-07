import React, { Component, Fragment } from "react";
import { Styles as S } from "../../styled";
import { AiOutlineDelete, AiOutlineSend } from "react-icons/ai";
import { GenerateId } from "../../utils/GenerateID";

export default class ToDo extends Component {
	state = {
		task: "",
		tags: "",
		tasksList: [
			{
				id: new GenerateId().getID(),
				name: "Caminhar",
				complete: false,
				tags: ["exercicio", "personal", "saúde-mental"],
			},
			{
				id: new GenerateId().getID(),
				name: "estudar matemática",
				complete: false,
				tags: ["matemática", "escola", "estudos"],
			},
			{
				id: new GenerateId().getID(),
				name: "Desenhar",
				complete: false,
				tags: ["pessoal", "arte"],
			},
			{
				id: new GenerateId().getID(),
				name: "lavar a louça",
				complete: false,
				tags: ["pessoal", "limpeza"],
			},
		],
	};

	handlerTask = (e) => {
		this.setState({
			task: e.target.value,
		});
	};

	handlerTag = (e) => {
		this.setState({
			tags: e.target.value,
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
						tags: this.state.tags.split(" "),
					},
				],
				tags: "",
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
				<h1>{"<ToDo />"}</h1>

				<S.Divider />

				<div className="form-control">
					<S.Field
						type="text"
						placeholder="Tarefa"
						name="newTask"
						id="newTask"
						value={this.state.task}
						onChange={this.handlerTask}
						onKeyDown={(e) => (e.code === "Enter" ? this.addTask() : null)}
						autoComplete="off"
					/>

					<S.TagField
						type="text"
						placeholder="Tag"
						name="newTag"
						id="newTag"
						value={this.state.tags}
						onChange={this.handlerTag}
						onKeyDown={(e) => (e.code === "Enter" ? this.addTask() : null)}
						autoComplete="off"
					/>

					<S.Button type="button" onClick={this.addTask}>
						<AiOutlineSend size={24} color="#ffffff" />
					</S.Button>
				</div>

				<div className="container--tasks">
					{this.state.tasksList[0] ? (
						<ul>
							{this.state.tasksList.map(({ name, id, tags }) => (
								<S.Task key={id}>
									<div className="form-group__task">
										<input type="checkbox" name={id} id={id} />
										<label htmlFor={id}>
											<span>{name}</span>
										</label>
									</div>

									<div className="tags">
										{tags[0] &&
											tags.map((tagName, i) => (
												<Fragment key={i}>
													<S.Tag>{tagName}</S.Tag>
												</Fragment>
											))}
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
