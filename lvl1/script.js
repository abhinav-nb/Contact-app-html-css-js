const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    return contacts;
}

function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
    const contacts = loadContacts();
    const existingRows = Array.from(contactList.querySelectorAll('tr'));

    contacts.forEach((contact, index) => {
        if (existingRows[index]) {
            const cells = existingRows[index].children;
            cells[0].textContent = contact.name;
            cells[1].textContent = contact.email;
            cells[2].textContent = contact.phone;
        } else {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = contact.name;
            row.appendChild(nameCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = contact.email;
            row.appendChild(emailCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = contact.phone;
            row.appendChild(phoneCell);

            const actionsCell = document.createElement('td');
            actionsCell.classList.add('actions');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editContact(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteContact(index));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            contactList.appendChild(row);
        }
    });

    while (existingRows.length > contacts.length) {
        contactList.removeChild(existingRows.pop());
    }
}

function addContact(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const contacts = loadContacts();
    contacts.push({ name, email, phone });
    saveContacts(contacts);
    renderContacts();
    contactForm.reset();
}

function editContact(index) {
    const contacts = loadContacts();
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;

    deleteContact(index);
}

function deleteContact(index) {
    const contacts = loadContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts();
}

contactForm.addEventListener('submit', addContact);
document.addEventListener('DOMContentLoaded', renderContacts);
