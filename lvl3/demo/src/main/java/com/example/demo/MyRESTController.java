package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MyRESTController {

        private final List<Contact> contactsList = new ArrayList<>();

        public MyRESTController() {
            
        }
        @RequestMapping("/hello")
        public String hello() {
        return "Hello World";
        }
        
        @GetMapping("/get-contacts")
        public List<Contact> getContacts(){
            return contactsList;
        }

        
        @PostMapping("/add-contact")
        public String addContact(@RequestBody Contact contact) {
            System.out.println(contact.getName());
            contactsList.add(contact);
            return "Contact added successfully!";
        }

        
        @PutMapping("/update-contact/{name}")
        public String updateContact(@PathVariable String name, @RequestBody Contact updatedContact) {
            System.out.println("Manual printing : ************** "+name);
            for (Contact contact : contactsList) {
                if (contact.getName().equalsIgnoreCase(name)) {
                    contact.setName(updatedContact.getName());
                    contact.setPhoneNo(updatedContact.getPhoneNo());
                    contact.setEmail(updatedContact.getEmail());
                    return "Contact updated successfully!";
                }
            }
            return "Contact not found!";
        }

        
        @DeleteMapping("/delete-contact/{name}")
        public String deleteContact(@PathVariable String name) {
            boolean removed = contactsList.removeIf(contact -> contact.getName().equalsIgnoreCase(name));
            return removed ? "Contact deleted successfully!" : "Contact not found!";
        }
    }
