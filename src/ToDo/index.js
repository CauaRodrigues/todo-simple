import React, { Fragment } from "react";
import { Styles as S } from "../styled";
import {
	AiOutlineDelete,
	AiOutlineInfoCircle,
	AiOutlineSend,
} from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { GenerateId } from "../utils/GenerateID";

export class ToDo extends React.Component {
	// const [task, setTask] = useState("");
	// const [newTag, setNewTag] = useState("");
	// const [tags, setTags] = useState([]);
	// const [tasksList, setTasksList] = useState([]);
	// const [tagInput, setTagInput] = useState("");

	state = {
		task: "",
		newTag: "",
		tags: [],
		tasksList: [],
		tagInput: "",
	};

	isMobile =
		navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i);

	handlerTask = (e) => {
		this.setState({ task: e.target.value });
	};

	handlerTag = (e) => {
		this.setState({ newTag: e.target.value });
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
					<div className="field-group">
						<label htmlFor="newTask">Tarefa</label>

						<S.Field
							type="text"
							placeholder="ex: Estudar"
							name="newTask"
							id="newTask"
							value={this.state.task}
							onChange={this.handlerTask}
							onKeyDown={(e) =>
								e.code === "Enter" && this.state.task.trim()
									? this.tagInput.focus()
									: null
							}
							autoComplete="off"
						/>
					</div>

					<div className="field-group">
						<label htmlFor="newTag">
							Categoria{" "}
							{this.isMobile ? null : (
								<AiOutlineInfoCircle title="Separe as categorias utilizando a tecla espaço" />
							)}
						</label>

						<S.TagField
							onClick={() => {
								if (this.isMobile && this.state.newTag.trim()) {
									this.setState({
										tags: [
											...this.state.tags,
											{ name: this.state.newTag, id: new GenerateId().getID() },
										],
										newTag: "",
									});
								}
								this.tagInput.focus();
							}}
						>
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
								placeholder="ex: reactjs"
								name="newTag"
								id="newTag"
								value={this.state.newTag}
								onChange={this.handlerTag}
								onKeyDown={this.verifyKeyCode}
								autoComplete="off"
							/>
						</S.TagField>
					</div>

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
