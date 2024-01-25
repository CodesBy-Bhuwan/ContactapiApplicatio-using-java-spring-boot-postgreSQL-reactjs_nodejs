import React from 'react'


// instead of using props magic technique we can use inside of props variable directly e.g.: toggleModel
const Header = ({ toggleModel, nbOfContacts }) => {
  return (
    <div>
      <header className='header'>
        <div className='container'>
            <h3>Contact List ({nbOfContacts})</h3>
            <button className='btn' onClick={()=> toggleModel(true)}>
                <i className='bi bi-plus-square'></i> Add New Contact</button>
        </div>
      </header>
    </div>
  )
}

export default Header
