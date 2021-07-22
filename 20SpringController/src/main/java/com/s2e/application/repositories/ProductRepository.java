package com.s2e.application.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.s2e.application.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	Collection<Product> findAllByOrderByNameAsc();
	Collection<Product> findAllByOrderByNameDesc();
	Collection<Product> findByName(String name);
	Collection<Product> findAllByAvailable(boolean available);

}
