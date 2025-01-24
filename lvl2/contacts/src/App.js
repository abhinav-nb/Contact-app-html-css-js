import React, { useState, useEffect } from 'react';
import "./App.css"

function App() {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts ? JSON.parse(savedContacts) : [];
    });

    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addContact = (e) => {
        e.preventDefault();
        setContacts([...contacts, formData]);
        setFormData({ name: '', email: '', phone: '' });
    };

    const editContact = (index) => {
        const contactToEdit = contacts[index];
        setFormData(contactToEdit);
        deleteContact(index);
    };

    const deleteContact = (index) => {
        setContacts(contacts.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <h1>Contact Manager</h1>
            <form onSubmit={addContact}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Contact</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={index}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <button onClick={() => editContact(index)}>Edit</button>
                                <button onClick={() => deleteContact(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
