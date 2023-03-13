import React, { Fragment, useState } from "react";
import { Styles as S } from "../styled";
import {
	AiOutlineDelete,
	AiOutlineInfoCircle,
	AiOutlineSend,
} from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { GenerateId } from "../utils/GenerateID";

export const ToDo = () => {
	const [task, setTask] = useState("");
	const [newTag, setNewTag] = useState("");
	const [tags, setTags] = useState([]);
	const [tasksList, setTasksList] = useState([]);
	const [tagInput, setTagInput] = useState("");

	const isMobile =
		navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i);

	const handlerTask = (e) => {
		setTask(e.target.value);
	};

	const handlerTag = (e) => {
		setNewTag(e.target.value);
	};

	const addTask = () => {
		if (task.trim()) {
			setTasksList([
				...tasksList,
				{
					id: new GenerateId().getID(),
					name: task.trim(),
					complete: false,
					tags: tags,
				},
			]);

			setTags([]);
			setTask("");
		}
	};

	const verifyKeyCode = (event) => {
		if (event.code === "Enter") {
			addTask();
		} else if (event.code === "Space" && newTag.trim()) {
			setTags([...tags, { name: newTag, id: new GenerateId().getID() }]);
			setNewTag("");
		} else if (event.code === "Escape") {
			tagInput.blur();
		}
	};

	const removeTask = (idTask) => {
		setTasksList(() => tasksList.filter((task) => task.id !== idTask));
	};

	const removeNewTag = (idTag) => {
		setTags(() => tags.filter((tag) => tag.id !== idTag));
	};

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
						value={task}
						onChange={handlerTask}
						onKeyDown={(e) =>
							e.code === "Enter" && task.trim() ? tagInput.focus() : null
						}
						autoComplete="off"
					/>
				</div>

				<div className="field-group">
					<label htmlFor="newTag">
						Categoria{" "}
						{isMobile ? null : (
							<AiOutlineInfoCircle title="Separe as categorias utilizando a tecla espaço" />
						)}
					</label>

					<S.TagField
						onClick={() => {
							if (isMobile && newTag.trim()) {
								setTags([
									...tags,
									{ name: newTag, id: new GenerateId().getID() },
								]);
								setNewTag("");
							}
							tagInput.focus();
						}}
					>
						<ul>
							{tags[0] &&
								tags.map(({ name: tagName, id: tagID }) => (
									<li key={tagID}>
										<span>{tagName}</span>

										<button onClick={() => removeNewTag(tagID)}>
											<IoIosClose size={24} />
										</button>
									</li>
								))}
						</ul>

						<input
							ref={(input) => {
								setTagInput(input);
							}}
							type="text"
							placeholder="ex: reactjs"
							name="newTag"
							id="newTag"
							value={newTag}
							onChange={handlerTag}
							onKeyDown={verifyKeyCode}
							autoComplete="off"
						/>
					</S.TagField>
				</div>

				<S.Button type="button" onClick={addTask}>
					<AiOutlineSend size={24} color="#ffffff" />
				</S.Button>
			</div>

			<div className="container--tasks">
				{tasksList[0] ? (
					<ul>
						{tasksList.map(({ name, id, tags }) => (
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

								<S.BtnDelete onClick={() => removeTask(id)}>
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
};
