package com.example.Contacts.controller;

import com.example.Contacts.model.Contact;
import com.example.Contacts.model.Tag;
import com.example.Contacts.repository.ContactRepository;
import com.example.Contacts.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private TagRepository tagRepository;

    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @PostMapping("/add-contact")
    public Contact addContact(@RequestBody Contact contact) {
    	System.out.print(contact);      
//    	for (Tag tag : contact.getTags()) {
//            Optional<Tag> existingTag = tagRepository.findByName(tag.getName());
//            
//          
//            existingTag.ifPresentOrElse(
//                t -> tag.setId(t.getId()),
//                () -> tagRepository.save(tag)
//            );
//        }
        return contactRepository.save(contact);
    }
    
    @GetMapping("/get-contact/{id}")
    public Contact getContact(@PathVariable Long id) {
    	 return contactRepository.findById(id).orElseThrow(
    			 ()-> new RuntimeException("Contact not found"));
    }

  
    @PutMapping("/update-contact/{id}")
    public Contact updateContact(@PathVariable Long id, @RequestBody Contact updatedContact) {
        return contactRepository.findById(id).map(contact -> {
            contact.setName(updatedContact.getName());
            contact.setPhoneNo(updatedContact.getPhoneNo());
            contact.setEmail(updatedContact.getEmail());
            contact.setTags(updatedContact.getTags());
            return contactRepository.save(contact);
        }).orElseThrow(() -> new RuntimeException("Contact not found"));
    }
    
    @GetMapping("/get_contacts/{tagId}")
    public List<Contact> getContactsByTagId(@PathVariable Long tagId) {
    	 return contactRepository.findContactsByTagId(tagId);
    }
    @DeleteMapping("/delete-contact/{id}")
    public String deleteContact(@PathVariable Long id) {
        contactRepository.deleteById(id);
        return "Contact deleted successfully!";
    }
}
