import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { updatePhoto } from '../api/ContactService';


const ContactDetail = ({ updateContact, updateImage}) => {
    const inputRef = useRef();
    const [ contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        address:'',
        title:'',
        status:'',
        photoUrl:''
      });
    
    //   id because in App.js=Route path is given to id location
      const { id } = useParams();

      
    const fetchContact = async (id) => {
        try{
        const { data } = await getContact(id);
        setContact(data);    
        }catch(error){
        console.log(error);
        }
  };

  const selectImage = () =>{
    inputRef.current.click();
  }
  const updatePhoto = async(file) => {
    try{
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('id', id);
        const { data } = await updateImage(formData);
        // setContact(data);    
        }catch(error){
        console.log(error);
        }
  }


  useEffect(() => {
    fetchContact(id);
  }, []);

  return (
    <>
    {/* giving location to contact and / are the same cause the root and contact are same */}
    <Link to={'/'} className='link'><i className='bi bi-arrow-left'></i>Back to List</Link>
    <div className='profile'>
        <div className='profile__details'> 
            <img src={contact.photoUrl} alt={`Profile Photo of ${contact.name}`} />
            <div className='profile__metadata'>
                <p className='profile__name'>{contact.name}</p>
                <p className='profile__muted'>JPG or JPEG, PNG Max size of 10MG</p>
                <button onClick={ selectImage } className='btn'><i className='bi bi-cloud-upload'></i>Change Image</button>
            </div>
            </div>
            <div className='profile__settings'>Settings will go here</div>
        </div>

        <form style ={{display:'none'}}>
            <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accept='image/*'/>
        </form>
    </>
  );
}

export default ContactDetail