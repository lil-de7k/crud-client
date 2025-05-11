import React from 'react';
import UserTable from './components/UserTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <div className='flex justify-center items-center h-screen'>
        <UserTable />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;