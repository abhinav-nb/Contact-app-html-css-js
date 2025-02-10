import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
function DisplayContact({ contacts, editingIndex, setFormData, startEditing, saveEdit, handleInputChange, deleteContact, formData }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: true,
        },
        {
          field: 'phone',
          headerName: 'Phone no.',
          type: 'number',
          width: 110,
          editable: true,
        }
      ];
   
    return (
        <table className="contact-table">
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
                        {editingIndex === index ? (
                            <>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => saveEdit(index)}>Save</button>
                                    <button onClick={() => setEditingIndex(null)}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <button onClick={() => { startEditing(index); setFormData(contact); }}>Edit</button>
                                    <button onClick={() => deleteContact(index)}>Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    //     <>
    //      <Box sx={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     rows={contacts      }
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: {
    //           pageSize: 5,
    //         },
    //       },
    //     }}
    //     pageSizeOptions={[5]}
    //     checkboxSelection
            
    //   />
    // </Box>
    //     </>
    );
}


export default DisplayContact;