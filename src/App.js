import React, { useReducer, useEffect, useState } from "react";
import Context from "./Components/Context/Context";
import List from "./Components/List/List";

const appReducer = (state, action) => {
  switch (action.type) {
    case "getData": {
      return action.payload;
    }
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false
        }
      ];
    }
    case "updateText": {
      const { uid, task } = action.payload;
      return state.map(item => {
        if (item.id !== uid) {
          return item;
        }
        return {
          ...item,
          text: task
        };
      });
    }
    case "delete": {
      return state.filter(item => item.id !== action.payload);
    }
    case "completed": {
      return state.map(item => {
        if (item.id !== action.payload) {
          return item;
        }
        return {
          ...item,
          completed: !item.completed
        };
      });
    }
    default: {
      return state;
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, []);
  const [task, setTask] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("data");
    dispatch({ type: "getData", payload: JSON.parse(data) });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("data", JSON.stringify(state));
    } catch (err) {
      console.log(err);
    }
  }, [state]);

  const handleChange = event => {
    setTask(event.target.value);
  };

  const handleSubmit = () => {
    if (task === "") return alert("Enter a task.");
    setTask("");
    dispatch({ type: "add", payload: task });
  };

  const handleKeyPress = event => {
    console.log("key Press");
    if (event.key !== "Enter") return;
    else if (task === "") return alert("Enter a task.");

    if (event.key === "Enter") {
      event.preventDefault();
      setTask("");
      dispatch({ type: "add", payload: task });
    }
  };

  return (
    <Context.Provider value={dispatch}>
      Todo App
      <input
        type="text"
        value={task}
        onKeyPress={event => handleKeyPress(event)}
        onChange={event => handleChange(event)}
      />
      <button onClick={event => handleSubmit(event)}>Add Item</button>
      <List items={state} />
    </Context.Provider>
  );
};

export default App;
