import React, { Component, Fragment } from "react";
import { Styles as S } from "../../styled";
import { AiOutlineDelete, AiOutlineSend } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { GenerateId } from "../../utils/GenerateID";

export default class ToDo extends Component {
	state = {
		task: "",
		newTag: "",
		tags: [
			// { name: "school", id: new GenerateId().getID() },
			// { name: "job", id: new GenerateId().getID() },
			// { name: "developer", id: new GenerateId().getID() },
		],
		tasksList: [
			// {
			// 	id: new GenerateId().getID(),
			// 	name: "Caminhar",
			// 	complete: false,
			// 	tags: [
			// 		{ name: "exercicio", id: new GenerateId().getID() },
			// 		{ name: "personal", id: new GenerateId().getID() },
			// 		{ name: "saúde-mental", id: new GenerateId().getID() },
			// 	],
			// },
			// {
			// 	id: new GenerateId().getID(),
			// 	name: "estudar matemática",
			// 	complete: false,
			// 	tags: [
			// 		{ name: "matemática", id: new GenerateId().getID() },
			// 		{ name: "escola", id: new GenerateId().getID() },
			// 		{ name: "estudos", id: new GenerateId().getID() },
			// 	],
			// },
			// {
			// 	id: new GenerateId().getID(),
			// 	name: "Desenhar",
			// 	complete: false,
			// 	tags: [
			// 		{ name: "pessoal", id: new GenerateId().getID() },
			// 		{ name: "arte", id: new GenerateId().getID() },
			// 	],
			// },
			// {
			// 	id: new GenerateId().getID(),
			// 	name: "lavar a louça",
			// 	complete: false,
			// 	tags: [
			// 		{ name: "pessoal", id: new GenerateId().getID() },
			// 		{ name: "limpeza", id: new GenerateId().getID() },
			// 	],
			// },
		],
	};

	handlerTask = (e) => {
		this.setState({
			task: e.target.value,
		});
	};

	handlerTag = (e) => {
		this.setState({
			newTag: e.target.value,
		});
	};

	addTask = () => {
		if (this.state.task.trim()) {
			this.setState({
				tasksList: [
					...this.state.tasksList,
					{
						id: new GenerateId().getID(),
						name: this.state.task.trim(),
						complete: false,
						tags: this.state.tags,
					},
				],
				tags: [],
				task: "",
			});
		}
	};

	verifyKeyCode = (event) => {
		if (event.code === "Enter") {
			this.addTask();
		} else if (event.code === "Space" && this.state.newTag.trim()) {
			this.setState({
				tags: [
					...this.state.tags,
					{ name: this.state.newTag, id: new GenerateId().getID() },
				],
				newTag: "",
			});
		} else if (event.code === "Escape") {
			this.tagInput.blur();
		}
	};

	removeTask = (idTask) => {
		this.setState({
			tasksList: this.state.tasksList.filter((task) => task.id !== idTask),
		});
	};

	removeNewTag = (idTag) => {
		this.setState({
			tags: this.state.tags.filter((tag) => tag.id !== idTag),
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
						onKeyDown={(e) =>
							e.code === "Enter" && this.state.task
								? this.tagInput.focus()
								: null
						}
						autoComplete="off"
					/>

					<S.TagField onClick={() => this.tagInput.focus()}>
						<ul>
							{this.state.tags[0] &&
								this.state.tags.map(({ name: tagName, id: tagID }) => (
									<li key={tagID}>
										<span>{tagName}</span>

										<button onClick={() => this.removeNewTag(tagID)}>
											<IoIosClose size={24} />
										</button>
									</li>
								))}
						</ul>

						<input
							ref={(input) => {
								this.tagInput = input;
							}}
							type="text"
							placeholder="Tag"
							name="newTag"
							id="newTag"
							value={this.state.newTag}
							onChange={this.handlerTag}
							onKeyDown={this.verifyKeyCode}
							autoComplete="off"
						/>
					</S.TagField>

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
											tags.map(({ name: tagName, id: tagID }) => (
												<Fragment key={tagID}>
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
