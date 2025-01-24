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
            contactList.innerHTML = '';
            contacts.forEach((contact, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.phone}</td>
                    <td class="actions">
                        <button onclick="editContact(${index})">Edit</button>
                        <button onclick="deleteContact(${index})">Delete</button>
                    </td>
                `;
                contactList.appendChild(row);
            });
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
    