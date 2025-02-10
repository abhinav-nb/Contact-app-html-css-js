function CreateContact({ formData, handleInputChange, addContact }) {
    return (
        <form onSubmit={addContact} className="create-contact-form">
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
                name="phoneNo"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Add Contact</button>
        </form>
    );
}

export default CreateContact