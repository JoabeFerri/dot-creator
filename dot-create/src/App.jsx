import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {

    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY
    };

    // console.log(newDot);
    setList((prev) => {
      return [...prev, newDot];
    });
    setUndid([]);
  }

  const notAction = (event) => {
    event.stopPropagation();
  }

  const handleUndo = (event) => {
    event.stopPropagation();
    // console.log('Undo');

    if(list.length === 0) {
      alert('Não há mais dots para desfazer')
      return
    }

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem])

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    })
  }

  const handleRedo = (event) => {
    event.stopPropagation();
    // console.log('Redo')

    if(undid.length === 0) {
      alert('Não há mais dots para refazer')
      return
    }

    const recoveriDot = undid[undid.length - 1];

    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

    setList((prev) => {
      return [...prev, recoveriDot];
    });
  }

  return (
    <div id='clickable' onClick={handleClick}>

      <div className='buttons-space'>
        <button className='button-margin' onClick={handleUndo}>Desfazer</button>
        <button onClick={handleRedo}>Retornar</button>
      </div>

        {list.map(item =>  
        (<span 
          key={item.clientX}
          onClick={notAction} 
          className='dot' 
          style={{top: item.clientY - 8,left: item.clientX - 8}}/>)
        )}
    </div>
  )
}

export default App
