package com.s2e.application.constants;

import java.util.ArrayList;
import java.util.Arrays;


public class ProductApi {
	
	public ProductApi() {
		super();
	}

	private String url;
	public ProductApi(String url, String description, String operationType) {
		super();
		this.url = url;
		this.description = description;
		this.operationType = operationType;
	}

	private String description;
	private String operationType;
	
	public final static ArrayList<ProductApi> getAllProductsApi() {
		ArrayList<ProductApi> apis = new ArrayList<ProductApi>();
		apis.addAll(Arrays.asList(
				new ProductApi("/product/search/name/{name}", "Search by name", OperationType.SEARCH.toString()),
				new ProductApi("/product/name/asc", "Sort bry name ASC", OperationType.SORT.toString()),
				new ProductApi("/product/name/desc", "Sort bry name DESC", OperationType.SORT.toString()),
				new ProductApi("/product/available", "Filter available", OperationType.FILTER.toString())
				));
		return apis;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOperationType() {
		return operationType;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}	

}
