// Imports
import React from 'react';
import { useState } from 'react';
import "./styles.css";

// Application Display
function App() {
  // Spent soooooo much time trying to figure this out!
  // Using hooks to track multiple state variables
  // Needed for tracking constantly updating variables and modifying them on the fly
  const [input, setInput] = useState("");
  const [bgcolor, setBgColor] = useState("");
  const [txtcolor, setTxtColor] = useState("");
  const [todos, setTodos] = useState([]);

  // Got this handy chunk of code for changing color based on input from https://stackoverflow.com/questions/73579784/how-to-change-the-colour-of-button-according-to-number-of-characters-in-input-fi
  // Modified that code to change the text color, determine length differently, and to reset colors upon reaching 0 characters again
  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      setBgColor("#00A3FF");
      setTxtColor("white");
    }
    if (e.target.value.length === 0) {
      setBgColor("#C4C4C4");
      setTxtColor("black");
    }
  };

  // Found this useful chunk of code from https://stackoverflow.com/questions/70531124/how-to-implement-function-addtodo-in-a-todo-app
  // Uses the submit form action to add the input text into the todo array. Added a conditional for submit not to work if the input is empty
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      // Passing todo items as an object. Keeping track of the checked property as well
      setTodos([...todos, { text: input, checked: false }]);
      // Also modified the input to reset and the submit button to go back to its default colors. Only triggers when there is input submitted
      setInput('');
      setBgColor("#C4C4C4");
      setTxtColor("black");
    }
  };

  // Create Button Component
  // Took a lot of trial and error for passing these props correctly
  function CreateButton({ bgcolor , txtcolor}) {
    return (
      <button type="submit" className="createButton" style={{ background: bgcolor ? bgcolor: "C4C4C4", color: txtcolor ? txtcolor: "black" }}>Create</button>
    )
  };

  // Code for deleting list items. Creates a new array containing all todo items, except for the one at the specified index
  const deleteTodo = (index) => {
    // Eventually found the concept of recreating the array from this site: https://www.seanmcp.com/articles/remove-an-item-at-a-given-index-in-javascript/
    // Thank god for filter!!!!
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  // Delete Button Component
  // Changed from a class to a function
  function DeleteButton({ id, deleteTodo }) {
    return (
        <button className="deleteButton" onClick={() => deleteTodo(id)}><img src={require("./Assets/trashcan.png")} alt="Trash Can" /></button>
    )
  };

  // Updates boolean value when the checkbox is clicked, but only at the specified property
  const handleCheck = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    ));
  };

  return (
    <div>
      {/* Learned how to do ReactJS comments from https://www.dhiwise.com/post/how-to-write-effective-react-comments-for-code-management */}
      {/* Putting the title, entry bar, and create button in its own form. Idea taken from https://www.youtube.com/watch?v=Rh3tobg7hEo */}
      <form onSubmit={handleSubmit}>
        {/* Title */} 
        <h1>Task List</h1>
        {/* Div here to put input box and create button on the same line */}
        <div className="divForm">
          {/* Input */}
          {/* Got the code for capturing input from https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs */}
          <input type="text" value={input} className="input" placeholder="Enter a New Task" onChange={handleChange} />
          <CreateButton bgcolor={bgcolor} txtcolor={txtcolor} />
        </div>
      </form>

      <ul>
        {/* Conditionally rendering an image. Reminded myself about short-circuit evaluations from  https://dev.to/harlessmark/short-circuit-evaluation-with-react-3dn4 */}
        {todos.length === 0 && <img className="noTask" src={require("./Assets/notasks.png")} alt="No Tasks" />}
        {/* Mapping over the todos array, then assigning an index to each entry. The index allows us to cross out or delete each entry with the checkbox and delete button respectively*/}
        {/* Mapping and index code from https://stackoverflow.com/questions/36440835/react-using-map-with-index */}
        {todos.map((todoValue, index) => (
          <div key={index} className="divList">
            {/* Took a lot of tinkering around, but I got the checkbox trigger to work successfully thanks to https://www.tutorialspoint.com/how-to-use-checkboxes-in-reactjs */}
            <input type="checkbox" checked={todoValue.checked} onChange={() => handleCheck(index)} />
            {/* If the checkbox is checked, then the list item is slashed through */}
            {/* By far the hardest part of the assignment for me. Took so long to get this slashthrough working correctly */}
            {todoValue.checked ? <h3><s>{todoValue.text}</s></h3> : (<h3>{todoValue.text}</h3>)}
            <DeleteButton id={index} deleteTodo={deleteTodo} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;