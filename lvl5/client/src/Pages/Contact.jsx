import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const ContactPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/get-contact/${id}`);
                setContact(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        
        if (id) fetchContact();
    }, [id]);

    const handleSave = async (updatedContact) => {
        try {
            await axios.put(`http://localhost:8080/api/update-contact/${id}`, updatedContact);
            setContact(updatedContact);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {contact ? (
                isEditing ? (
                    <EditContactForm contact={contact} onSave={handleSave} onCancel={() => setIsEditing(false)} />
                ) : (
                    <ContactCard contact={contact} id={id} onEdit={() => setIsEditing(true)} />
                )
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

function ContactCard({ contact, id, onEdit }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/delete-contact/${id}`);
            window.location.replace('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-sm mt-24 mx-auto bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800">{contact.name}</h2>
            <p className="text-gray-600 mt-1">📞 {contact.phoneNo}</p>
            <p className="text-gray-600 mt-1">✉️ {contact.email}</p>

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Tags:</h3>
                <div className="flex flex-wrap gap-2 my-2">
                    {contact.tags.map(tag => (
                        <Link to={`/tag/${tag.id}`} key={tag.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {tag.name}
                        </Link>
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium" onClick={onEdit}>
                        Update
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

function EditContactForm({ contact, onSave, onCancel }) {
    const [formData, setFormData] = useState({ 
        name: contact.name, 
        phoneNo: contact.phoneNo, 
        email: contact.email, 
        tags: contact.tags 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); 
    };

    console.log("formData",formData);

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mt-24 mx-auto bg-white shadow-lg rounded-2xl p-6">
            <input 
                type="text" name="name" value={formData.name} 
                onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Name" 
            />
            <input 
                type="text" name="phoneNo" value={formData.phoneNo} 
                onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Phone Number" 
            />
            <input 
                type="email" name="email" value={formData.email} 
                onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Email" 
            />

            {/* Display tags but do not edit */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Tags:</h3>
                <div className="flex flex-wrap gap-2 my-2">
                    {formData.tags.map(tag => (
                        <span key={tag.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Save</button>
                <button type="button" className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}


export default ContactPage;
