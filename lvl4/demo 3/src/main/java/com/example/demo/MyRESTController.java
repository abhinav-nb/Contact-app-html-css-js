package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MyRESTController {

    private final ContactRepository contactRepository;

    public MyRESTController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/get-contacts")
    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    @PostMapping("/add-contact")
    public String addContact(@RequestBody Contact contact) {
        contactRepository.save(contact);
        return "Contact added successfully!";
    }

    @PutMapping("/update-contact/{name}")
    public String updateContact(@PathVariable String name, @RequestBody Contact updatedContact) {
        Optional<Contact> existingContact = contactRepository.findByName(name);
        
        if (existingContact.isPresent()) {
            Contact contact = existingContact.get();
            contact.setName(updatedContact.getName());
            contact.setPhoneNo(updatedContact.getPhoneNo());
            contact.setEmail(updatedContact.getEmail());
            contactRepository.save(contact);
            return "Contact updated successfully!";
        }
        return "Contact not found!";
    }

    @DeleteMapping("/delete-contact/{name}")
    public String deleteContact(@PathVariable String name) {
        Optional<Contact> contact = contactRepository.findByName(name);
        if (contact.isPresent()) {
            contactRepository.delete(contact.get());
            return "Contact deleted successfully!";
        }
        return "Contact not found!";
    }
}
