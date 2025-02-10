package com.example.Contacts.repository;

import com.example.Contacts.model.Contact;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContactRepository extends JpaRepository<Contact, Long> {
	
	@Query("SELECT c FROM Contact c JOIN c.tags t WHERE t.id = :tagId")
	List<Contact> findContactsByTagId(@Param("tagId") Long tagId);
	
}
