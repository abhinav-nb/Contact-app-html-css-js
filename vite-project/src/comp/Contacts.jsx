    import { useState,useEffect } from "react";
    import CreateContact from "./CreateContact";
import DisplayContact from "./DisplayContat";
function Contacts() {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts ? JSON.parse(savedContacts) : [];
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addContact = (e) => {
        e.preventDefault();
        setContacts([...contacts, formData]);
        setFormData({ name: '', email: '', phone: '' });
    };

    const startEditing = (index) => {
        setEditingIndex(index);
    };

    const saveEdit = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts[index] = formData;
        setContacts(updatedContacts);
        setEditingIndex(null);
        setFormData({ name: '', email: '', phone: '' });
    };

    const deleteContact = (index) => {
        setContacts(contacts.filter((_, i) => i !== index));
    };

    return (
        <div className="contacts-container">
            <h1>Contact Manager</h1>
            <CreateContact formData={formData} handleInputChange={handleInputChange} addContact={addContact} />
            <DisplayContact 
                contacts={contacts} 
                editingIndex={editingIndex} 
                setFormData={setFormData} 
                startEditing={startEditing} 
                saveEdit={saveEdit} 
                handleInputChange={handleInputChange} 
                deleteContact={deleteContact} 
                formData={formData}
            />
        </div>
    );
}

    export default Contacts;