import React from 'react'
import { Link } from 'react-router-dom'

const Contact = ({ contact }) => {
  return (
    // linking to backend make sure the path entered is true
    <Link to= {`/contacts/${contact.id}`} className='contact_item'>
    <div className='contact_header'>
        <div className='contact_image'>
            <img src={contact.photoUrl} alt={contact.name} />
        </div>
        <div className='contact_details'>
          {/* since the length of photo or name might be long so to make shorter length of name we assigned and max len of that particular name*/}
          <p className='contact_name'>{contact.name.sunstring(0,15)}</p>
          <p className='contact_title'>{contact.title}</p>
        </div>
      </div>
      <div className='contact_body'>
        <p><i className='bi bi-envelope'></i>{contact.email.sunstring(0,20)}</p>
        <p><i className='bi bi-geo'></i>{contact.address}</p>
        <p><i className='bi bi-telephone'>{contact.phone}</i></p>
        {/* We will make status active or inactive
        This is also a kind of mixed condition js and html*/}
        <p>{contact.status === 'Active' ? <i className='bi bi-check-circle'></i> :
        <i className='bi bi-x-circle'></i> }{contact.status}</p>
      </div>
    </Link>
  )
}

export default Contact
