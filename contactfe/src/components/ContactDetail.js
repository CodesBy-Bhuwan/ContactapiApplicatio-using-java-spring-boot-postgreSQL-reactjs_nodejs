import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { getContact } from '../api/ContactService';
import { toastError, toastSuccess } from '../api/ToastService';


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
        toastSuccess('Contact Retrived');
        }catch(error){
        console.log(error);
        toastError(error.message)
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
        await updateImage(formData);
        setContact((prev) => ({...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`}));
        setContact('data');    
        toastSuccess('Photo Uploaded');
        }catch(error){
        console.log(error);
        toastError(error.message)
        }
  };
  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value })
    console.log(contact);
  }
  const onUpdateContact = async(event) => {
    event.preventDefault();
    updateContact(contact);
    toastSuccess('Contact Updated');
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
            <div className='profile__settings'>
                 <div>
                        <form onSubmit={onUpdateContact} className="form">
                            <div className="user-details">
                                {/* We will change all the detail but the id should remain same so we onChange eve except id */}
                                <input type="hidden" defaultValue={contact.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={contact.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" value={contact.email} onChange={onChange} name="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone</span>
                                    <input type="text" value={contact.phone} onChange={onChange} name="phone" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input type="text" value={contact.address} onChange={onChange} name="address" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Title</span>
                                    <input type="text" value={contact.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Status</span>
                                    <input type="text" value={contact.status} onChange={onChange} name="status" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>

        <form style ={{display:'none'}}>
            <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accept='image/*'/>
        </form>
    </>
  );
}

export default ContactDetail