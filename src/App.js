import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editId, setEditId] = useState(null); // State to track the ID of the to-do being edited
  const [duplicateMessage, setDuplicateMessage] = useState('');

  const handleDelete = (id) => {
    setToDos(toDos.filter((obj) => obj.id !== id));
  };

  const handleCheckboxChange = (id, checked) => {
    setToDos(
      toDos.map((obj) => {
        if (obj.id === id) {
          return { ...obj, status: checked };
        }
        return obj;
      })
    );
  };

  const handleAddToDo = () => {    
    if (toDo.trim() !== '') {
      // Check for duplicate to-do
      if (!toDos.some((item) => item.text === toDo.trim())) {
        setToDos([...toDos, { id: Date.now(), text: toDo.trim(), status: false }]);
        setToDo(''); // Clear the input field after adding the to-do
        setDuplicateMessage(''); // Clear duplicate message if any
      } else {
        setDuplicateMessage('This to-do already exists!');
      }
    }
  };

  const handleEdit = (id) => {
    setEditId(id); // Set the ID of the to-do being edited
    const todoToEdit = toDos.find((todo) => todo.id === id);
    setToDo(todoToEdit.text); // Set the input value to the text of the to-do being edited
  };

  const handleUpdate = () => {
    if (toDo.trim() !== '') {
      setToDos(
        toDos.map((obj) => {
          if (obj.id === editId) {
            return { ...obj, text: toDo.trim() }; // Update the text of the to-do being edited
          }
          return obj;
        })
      );
      setEditId(null); // Reset the editId state
      setToDo(''); // Clear the input field
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Friday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={editId !== null ? handleUpdate : handleAddToDo} className="fas fa-plus"></i>
      </div>
      {duplicateMessage && <p className="duplicateMessage">{duplicateMessage}</p>}
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => handleCheckboxChange(obj.id, e.target.checked)}
                checked={obj.status}
                type="checkbox"
              />
              {editId === obj.id ? (
                <input
                  value={toDo}
                  onChange={(e) => setToDo(e.target.value)}
                  type="text"
                  style={{ color: 'black' }}

                />
              ) : (
                <p style={{ textDecoration: obj.status ? 'line-through' : 'none' }}>{obj.text}</p>
              )}
            </div>
            <div className="right">
              {editId === obj.id ? (
                <i onClick={handleUpdate} className="fas fa-check"></i>
              ) : (
                <i onClick={() => handleEdit(obj.id)} className="fas fa-edit" style={{ color: 'black' }}></i>
              )}
              <i onClick={() => handleDelete(obj.id)} className="fas fa-times" style={{ color: 'red' }}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
