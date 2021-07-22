package com.s2e.application.constants;

public enum OperationType {
	
	SEARCH("Search"), SORT("Sort"), FILTER("Filter");

	private String text;
	
	OperationType(String text) {
		this.text = text;
	}

	@Override
	public String toString() {
		return text;
	}
}
