package com.s2e.application.constants;

import java.util.ArrayList;
import java.util.HashMap;

public class ProductOperationApi {

	private HashMap<String, ArrayList<ProductApi>> productOperation = new HashMap<>();

	public ProductOperationApi() {
		ArrayList<ProductApi> productApis = ProductApi.getAllProductsApi();
		for(ProductApi api: productApis) {
			if (productOperation.get(api.getOperationType()) == null) {
				productOperation.put(api.getOperationType(), new ArrayList<ProductApi>());
				productOperation.get(api.getOperationType()).add(api);
			}else {
				productOperation.get(api.getOperationType()).add(api);
			}				
		}
	}

	public HashMap<String, ArrayList<ProductApi>> getProductOperation() {
		return productOperation;
	}

	public void setProductOperation(HashMap<String, ArrayList<ProductApi>> productOperation) {
		this.productOperation = productOperation;
	}
	
}
