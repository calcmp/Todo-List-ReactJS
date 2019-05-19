import React, { useContext, useState } from "react";
import Context from "../Context/Context";

const Item = ({ id, completed, text }) => {
  const dispatch = useContext(Context);
  const [uid, setUID] = useState("");
  const [task, setTask] = useState("");

  const handleChange = (event, uniqueId) => {
    setTask(event.target.value);
    setUID(uniqueId);
  };

  const handleSubmit = () => {
    dispatch({ type: "updateText", payload: { uid, task } });
    alert("Changes saved.");
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch({ type: "updateText", payload: { uid, task } });
      alert("Changes saved.");
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch({ type: "completed", payload: id })}
      />
      <input
        id={id}
        type="text"
        defaultValue={text}
        onKeyPress={event => handleKeyPress(event)}
        onChange={event => handleChange(event, id)}
      />
      <button onClick={event => handleSubmit(event)}>Submit</button>
      <button onClick={() => dispatch({ type: "delete", payload: id })}>
        Delete
      </button>
    </div>
  );
};

export default Item;
