import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [tags, setTags] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [newTagName, setNewTagName] = useState('');
    const [newContact, setNewContact] = useState({ name: '', phoneNo: '', email: '', tags: [] });
    console.log(contacts)
    useEffect(() => {
        fetchTags();
        fetchContacts();
    }, []);

    const fetchTags = async () => {
        const response = await axios.get('http://localhost:8080/api/tags');
        setTags(response.data);
    };

    const fetchContacts = async () => {
        const response = await axios.get('http://localhost:8080/api/contacts');
        setContacts(response.data.reverse());
    };

    const handleAddTag = async () => {
        if (newTagName.trim()) {
            await axios.post('http://localhost:8080/api/tags', { name: newTagName });
            setNewTagName('');
            fetchTags();
        }
    };
console.log(newContact)
    const handleAddContact = async () => {
        if (newContact.name && newContact.phoneNo && newContact.email) {
            await axios.post('http://localhost:8080/api/add-contact', newContact);
            setNewContact({ name: '', phoneNo: '', email: '', tags: [] });
            fetchContacts();
        }
    };
//i dont want to just add the tag id i need to add the tag name as well  "tags": [
//     { "id": 1, "name": "friend" },
//     { "id": 2, "name": "family" }
//   ]
    const toggleTagSelection = (tagId) => {
        setNewContact(prevContact => {
            const isSelected = prevContact.tags.includes(tagId);
            // return {
            //     ...prevContact,
            //     tags: isSelected ? prevContact.tags.filter(id => id !== tagId) : [...prevContact.tags, tagId]
            // };
            return {
                ...prevContact,
                tags: isSelected ? prevContact.tags.filter(id => id !== tagId) : [...prevContact.tags, {id: tagId, name: tags.find(tag => tag.id === tagId).name}]
            };
        });
    };

    return (
        <div className="home p-6 bg-gray-100 min-h-screen space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-blue-500">Add New Tag</h1>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        placeholder="Enter tag name"
                        className="px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-colors duration-300 text-lg font-medium"
                    >
                        Create Tag
                    </button>
                </div>
            </div>

            <div className='space-y-4'>
                <h1 className="text-3xl font-bold text-blue-500">Tags</h1>
                <ul className="flex flex-wrap gap-4">
                    {tags.map(tag => (
                        <li key={tag.id}>
                            <Link 
                                to={`/tag/${tag.id}`} 
                                className="block px-4 py-2 bg-white rounded-xl shadow-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300 text-lg font-medium"
                            >
                                {tag.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-blue-500">Add New Contact</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={newContact.phoneNo}
                        onChange={(e) => setNewContact({ ...newContact, phoneNo: e.target.value })}
                        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-gray-700">Select Tags</h2>
                        <div className="flex flex-wrap gap-3">
                            {tags.map(tag => (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTagSelection(tag.id)}
                                    className={`px-4 py-2 rounded-full ${newContact.tags.some(t => t.id === tag.id)
                                        ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} shadow-md hover:bg-blue-400 hover:text-white transition-colors duration-300`}
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddContact}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition-colors duration-300 text-lg font-medium"
                    >
                        Create Contact
                    </button>
                </div>
            </div>

            <div>
                <h1 className="text-3xl font-bold text-blue-500 mb-4">Contacts</h1>
                <ul className="space-y-4 flex flex-wrap gap-4">
                    {contacts.map(contact => (
                        <li key={contact.id} >
                             <Link 
                                to={`/contact/${contact.id}`} 
                                >
                            <div className="p-4 bg-white  rounded-xl shadow-md hover:bg-blue-100 transition-colors duration-300">
                                <p className="text-lg font-medium text-gray-800">{contact.name}</p>
                                <p className="text-gray-600">{contact.phoneNo}</p>
                                <p className="text-gray-600">{contact.email}</p>
                                <div className="mt-2">
                                    {contact.tags.map(tag => (
                                        <span key={tag.id} className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mr-2">{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
