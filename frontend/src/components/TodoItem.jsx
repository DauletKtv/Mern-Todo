import { useState } from "react";
import { ImCross, ImPencil } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteTodo, redactTodo } from "../features/todos/todoSlice";

function formatDate(dateString) {
  let date = new Date(dateString);
  let formatter = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
  return formatter.format(date);
}

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(todo.text);
  const [isEdit, setIsEdit] = useState(true);

  const editText = (e) => {
    setText(e.target.value);
    console.log(text);
  };
  async function handleEditTodo(e) {
    e.preventDefault();
    if (text !== todo.text) {
      dispatch(redactTodo({ ...todo, text }));
    }
    // setIsEdit(false);
  }
  return (
    <div className="my-2">
      <div className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          {isEdit ? (
            <h5 className="mb-1">{todo.text}</h5>
          ) : (
            <form onSubmit={handleEditTodo}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="text"
                  value={text}
                  onChange={editText}
                />
              </div>

              <button type="submit" className="btn btn-success me-2">
                Сохранить
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setText(todo.text);
                }}
              >
                Отмена
              </button>
            </form>
          )}
          <div>
            <button
              className="btn"
              onClick={() => dispatch(deleteTodo(todo._id))}
            >
              <ImCross style={{ color: "red" }} />
            </button>
            <button className="btn" onClick={() => setIsEdit(!isEdit)}>
              <ImPencil style={{ color: "black" }} />
            </button>
          </div>
        </div>
        <small>{formatDate(new Date(todo.createdAt))}</small>
      </div>
    </div>
  );
}
