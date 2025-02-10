package com.example.Contacts.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phoneNo;
    private String email;

    @ManyToMany
    @JoinTable(
      name = "contact_tag", 
      joinColumns = @JoinColumn(name = "contact_id"), 
      inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();


    public Contact() {}

    public Contact(String name, String phoneNo, String email) {
        this.name = name;
        this.phoneNo = phoneNo;
        this.email = email;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }
}
