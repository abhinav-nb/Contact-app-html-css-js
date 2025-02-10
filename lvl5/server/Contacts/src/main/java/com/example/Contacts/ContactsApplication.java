package com.example.Contacts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.Contacts.model.Contact;
import com.example.Contacts.model.Tag;
import com.example.Contacts.repository.ContactRepository;
import com.example.Contacts.repository.TagRepository;

@SpringBootApplication
public class ContactsApplication {

	public static void main(String[] args) {
		 SpringApplication.run(ContactsApplication.class, args);
		//  ContactRepository contactRepository = context.getBean(ContactRepository.class);
		//  TagRepository tagRepository = context.getBean(TagRepository.class);
		//  Tag tag1 = new Tag();
		//  tag1.setName("Friend");
		//  tagRepository.save(tag1);
		// System.out.println("Tag 1 saved successfully!");
		//  Tag tag2 = new Tag();
		//  tag2.setName("Family");
		//  tagRepository.save(tag2);
		// System.out.println("Tag 2 saved successfully!");
		//  Contact contact1 = new Contact();
		//  contact1.setName("Abhi");
		//  contact1.setPhoneNo("878787");
		//  contact1.setEmail("abhi@gmail.com");
		//  contact1.getTags().add(tag1);  
		//  contact1.getTags().add(tag2);  
		
		//  contactRepository.save(contact1);
		// System.out.println("Contact 1 saved successfully!");
		//  Tag tag3 = new Tag();
		//  tag3.setName("Work");
		//  tagRepository.save(tag3);
		// System.out.println("Tag 3 saved successfully!");
		//  Contact contact2 = new Contact();
		//  contact2.setName("John Doe");
		//  contact2.setPhoneNo("1234567890");
		//  contact2.setEmail("john.doe@example.com");
		//  contact2.getTags().add(tag3); 
 
		//  contactRepository.save(contact2);
		// System.out.println("Contact 2 saved successfully!");
		//  System.out.println("Contacts and tags saved successfully!");	
	}

}


