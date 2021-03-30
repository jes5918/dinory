import React from 'react';
import './App.css';
import Deploy from './view/Deploy';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Deploy text='DINORY' />
        <Deploy text='Use TypeScript' />
        <Deploy text='앱 배포 페이지 만들어본다용' />
      </header>
    </div>
  );
}

export default App;
