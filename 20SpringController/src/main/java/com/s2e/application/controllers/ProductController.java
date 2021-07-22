package com.s2e.application.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.s2e.application.model.Product;
import com.s2e.application.repositories.ProductRepository;

@RestController
public class ProductController {

	@Autowired
	ProductRepository repo;

	@GetMapping("/products")
	public Collection<Product> getAllProducts() {
		return repo.findAll();
	}

	@PostMapping("/product")
	public void saveProduct(@RequestBody Product product) {
		repo.save(product);
	}

	@PutMapping("/product")
	public void updateProduct(@RequestBody Product product) {
		int id = product.getId();
		Product oldProduct = repo.getById(id);
		oldProduct.setAttributes(product);
		repo.save(oldProduct);
	}

	@DeleteMapping("/product/{id}")
	public void deleteProduct(@PathVariable("id") int id) {
		repo.deleteById(id);
	}

	@GetMapping("/product/search/name/{name}")
	public Collection<Product> getByName(@PathVariable("name") String name) {
		return repo.findByName(name);
	}

	@GetMapping("/product/name/asc")
	public Collection<Product> getAsc() {
		return repo.findAllByOrderByNameAsc();
	}

	@GetMapping("/product/name/desc")
	public Collection<Product> getDesc() {
		return repo.findAllByOrderByNameDesc();
	}

	@GetMapping("/product/available")
	public Collection<Product> getAvailable(@RequestBody boolean available) {
		return repo.findAllByAvailable(available);
	}

}
