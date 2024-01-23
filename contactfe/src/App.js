import { useEffect, useState } from 'react';
import './App.css';
import { getContacts } from './api/ContactService';

function App() {
  const[data, setData] = useState({});
  const[currentPage, setCurrentPage] = useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page)
      const { data } = await getAllContacts(page, size);
      setData(data);
      console.log(data);
    } 
    catch(error){
      console.log(error);
    }
  }
useEffect(() => {
  getAllContacts();
}, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default App;
