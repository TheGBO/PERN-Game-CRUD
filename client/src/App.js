import './index.css';
import { TopNav } from "./components/TopNav.js";
import { TableItem } from './components/TableItem';
import { useEffect, useState } from 'react';
import {api} from './config/api.js';

function App() {
  

  const [games, setGames] = useState([]);

  function getGames(){
    api.get('/game').then((data) => {
      let dt = data.data;
      setGames(dt.data);
      console.log(dt.data);
    });
  }

  function createGame(title, category){
    api.post('/game', {title:title, category:category}).then((data) => {
      getGames();
    });
  }

  useEffect(()=>{
    getGames();
  },[])
  return (
    <div className="App">
      <TopNav/>
      <div className='crud-wrapper'>
        <div className='register-panel'>
          <input type='text' placeholder='Game Title' id='game-title' className='styled-input' autoComplete='off' spellCheck='false'></input>
          <input type='text' placeholder='Category' id='game-category' className='styled-input' autoComplete='off' spellCheck='false'></input>
          <button className='styled-btn' onClick={() => {
            createGame(document.getElementById('game-title').value, document.getElementById('game-category').value);
          }}>Register Game</button>
        </div>
        <table>
          <tr>
            <th>
              ID
            </th>
            <th>
              Game Title
            </th>
            <th>
              Category
            </th>
            <th>
              Actions
            </th>
          </tr>
          {
            games?.map((val) => {
              return (
                <TableItem id={val.id} title={val.title} category={val.category}
                 cb={() => {getGames()}}/>
              )
            })
          }
        </table>
      </div>
    </div>
  );
}

export default App;
