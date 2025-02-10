import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Tag() {
    const { tagName } = useParams();
    // console.log('Tag', tagName);
    const [tags, setTags] = useState([]);
    const fetchTags = async () => {
        const response = await axios.get('http://localhost:8080/api/get_contacts/' + tagName);
        setTags(response.data);
    }
    console.log(tags);
    const [name,setName]=useState();

    const findTagNameByTagId = async (tagId) => {
        try {
            // console.log('tagId', tagId);
            const response = await axios.get('http://localhost:8080/api/tags');
            const tag = response.data.find(tag => tag.id === tagId);
            console.log('tag', response.data.find(tag => tag.id === tagId));
            if (tag) {
                setName(tag.name);
            } else {
                setName("Unknown Tag");
            }
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };
    
    useEffect(() => {
        if(tagName){
            fetchTags();
            findTagNameByTagId(tagName);
        }
    }, [tagName]);
    return (
        <div className="">
             <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Contacts - {name}</h1>
            
            <div className="space-y-4">
                {tags.map(contact => (
                    <div key={contact.id} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
                        <p className="text-gray-600">📞 {contact.phoneNo}</p>
                        <p className="text-gray-600">✉️ {contact.email}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Tag;
