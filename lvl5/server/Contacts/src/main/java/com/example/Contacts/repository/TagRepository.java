package com.example.Contacts.repository;

import com.example.Contacts.model.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
	
    Optional<Tag> findByName(String name);
}
