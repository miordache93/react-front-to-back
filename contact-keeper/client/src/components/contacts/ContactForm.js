import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

function ContactForm() {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  }

  const clearAll = () => {
    clearCurrent();
  }

  const { name, email, phone, type } = contact;

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Update Contact' : 'Add Contact'}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange} />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange} />
      <input
        type="phone"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange} />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        onChange={onChange}
        checked={type === 'personal'}
        value="personal" /> Personal {' '}
      <input
        type="radio"
        name="type"
        onChange={onChange}
        checked={type === 'professional'}
        value="professional" /> Professional {' '}
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block" />
      </div>
      {current &&
        <div>
          <button
            onClick={clearAll}
            className="btn btn-light btn-block">Clear</button>
        </div>}
    </form>
  )
}

export default ContactForm
