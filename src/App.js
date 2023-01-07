import './App.scss';
import { useEffect, useState } from 'react';
import { Elevator } from './Elevator/Elevator';

function App() {
  const [value, setValue] = useState('Nothing');

  useEffect(() => {
    // eslint-disable-next-line no-console
    // const textNode = document.getElementById('myTextarea')?.value;
    // if (textNode) {
    //   textNode.addEventListener('input', (event) => {
    //   // eslint-disable-next-line no-console
    //     console.log(event.target.value);
    //   });
    // }
    console.log(value);
  }, [value]);

  return (
    <div className="App">
      <header className="App-header">
        <Elevator numFloors={10} />
        <div className="grass">
          <textarea
            id="myTextarea"
            onChange={(e) => setValue(e.target.value)}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <p>
            <b>this</b>
            {' '}
            there is not bold in this type of box.

            * But I can do a line return
            * It looks like this
            • Bullet.

            1. You can
            {' '}

          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
