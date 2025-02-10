
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
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @PostMapping
    public Tag createTag(@RequestBody Tag tag) {
        return tagRepository.save(tag);
        
        
    }
    @GetMapping("/{id}")
    public Tag getTagById(@PathVariable Long Id) {
    	return tagRepository.findById(Id).orElseThrow(
    			()->new RuntimeException("No tag"));
    }
    
    @GetMapping
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
}
