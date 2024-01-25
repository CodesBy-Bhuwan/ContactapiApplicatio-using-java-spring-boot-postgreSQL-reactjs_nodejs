import React from 'react'
import Contact from './Contact'


const ContactList = ({ data, currentPage, getAllcontacts }) => {
  return (
    <main className='main'>
        {data?.content?.length === 0 && <div>No Contacts. Please add new contact</div>}

        <ul className='contact__list'>
            {data?.content?.length > 0 && data.content.map(contact => <Contact contact ={contact} key={contact.id} />) }
        </ul>

        {data?.content?.length > 0 && data?.totalPages > 1 && 
        <div className='pagination'>
            {/* pagination-core concept is we show only 10 contacts in single page
             when this button is clicked we will go to backward and get current page and remove one from current page
            but if we go backward from one then appl will crash since there is no any page  so we made 0= currentpage else '' */}
            <a onClick={()=> getAllcontacts(currentPage - 1)} className={ 0 === currentPage ? 'disabled': ''}>
                &laquo;
                {/* this means << sign in html entity */}
            </a>
            {data && [ ...Array(data.totalPages).keys()].map((page, index) => 
            <a onClick={() => getAllcontacts(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


            {/* similary this is for last page*/}
            <a onClick={()=> getAllcontacts(currentPage + 1)} className={ data.totalPages === currentPage + 1 ? 'disabled': ''}>
                &raquo;
            </a>
            </div>}
    </main>
  )
}

export default ContactList