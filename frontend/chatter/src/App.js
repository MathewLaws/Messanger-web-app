import './App.css';
import {useState} from "react"

import HomePage from './Components/HomePage/HomePage';
import Chat from './Components/Chat/Chat';

function App() {
  const [name, setName] = useState("")

  return (
    <div className="App">
      
      {name ? <Chat name={name}/> : <HomePage setName={setName}/>}
    </div>
  );
}

export default App;
