import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";

const App = () => {
  const [count, setCount] = useState(0);

  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyARv6bbK6G7hHXZMt0Xy0-jEOGAFSHAk3k",
    authDomain: "mentat-hacks.firebaseapp.com",
    projectId: "mentat-hacks",
    storageBucket: "mentat-hacks.appspot.com",
    messagingSenderId: "805921278932",
    appId: "1:805921278932:web:a1b5fd223cd5c932e22441"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test hot module replacement (HMR).
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
