    import { useState,useEffect } from "react";
    import CreateContact from "./CreateContact";
import DisplayContact from "./DisplayContat";
import axios from "axios";
function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [newId,setnewId] = useState(contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1);
    // const [contacs,setContacts]=useState(localStorage.getItem('contacts') && JSON.parse(localStorage.getItem('contacts'))||[])

    console.log("contacts",contacts)

    useEffect(()=>{
        const fetchContacts = async () => {
            try{
                const res = await axios.get('http://localhost:8080/api/get-contacts');
                setContacts(res.data);
                // console.log(res.data)
            }catch(e){
                console.log(e)
            }
        };
        fetchContacts();
    },[]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phoneNo: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        setFormData({ ...formData, [name]: value });
    };

    const addContact = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/api/add-contact',formData);
            console.log(res.data)
        }catch(e){
            console.log(e)
        }
        setContacts([...contacts, formData]);
        setFormData({ name: '', email: '', phone: '' , id:newId+1});
        setnewId(prev=>prev+1);
    };

    const startEditing = (index) => {
        setEditingIndex(index);
    };

    const saveEdit = async(index) => {
        try{
        const updatedContacts = [...contacts];
        const res =  await axios.put(`http://localhost:8080/api/update-contact/${contacts[index].name}`,formData);
        updatedContacts[index] = formData;
        setContacts(updatedContacts);
        setEditingIndex(null);
        setFormData({ name: '', email: '', phone: '' });
        }
        catch(e){
            console.log(e)
        }
    };

    const deleteContact = async(index) => {
       
        const res = await axios.delete(`http://localhost:8080/api/delete-contact/${contacts[index].name}`);
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