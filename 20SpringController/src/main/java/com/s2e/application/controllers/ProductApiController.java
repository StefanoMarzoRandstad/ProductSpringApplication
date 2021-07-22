package com.s2e.application.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.s2e.application.constants.ProductOperationApi;

@RestController
public class ProductApiController {
	
	@GetMapping("/productApis")
	public ProductOperationApi getProductApis(){
		return new ProductOperationApi();
	}

}
