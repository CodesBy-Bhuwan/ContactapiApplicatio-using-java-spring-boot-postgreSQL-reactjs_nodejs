import { useEffect, useState } from 'react';
import './App.css';
import { getContacts } from './api/ContactService';
import Header from './components/Header'
import ContactList from './components/ContactList'
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const[data, setData] = useState({});
  const[currentPage, setCurrentPage] = useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page)
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } 
    catch(error){
      console.log(error);
    }
  }

  const toggleModel = (show) => {
    console.log("test");
  }



useEffect(() => {
  getAllContacts();
}, []);

  return (
    <>
    <Header toggleModel = {toggleModel} nbOfContacts = { data.totlaElements } />
    <main className='main'>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Navigate to={'/contacts'} /> } />
          <Route path='/contacts' element = { <ContactList data={data} currentPage={currentPage} getAllcontacts={getAllContacts} /> } />
        </Routes>
        </div>
    </main>
    </>
  );
}

export default App;
