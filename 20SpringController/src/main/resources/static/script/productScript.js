/* 	Javascript:
	- tipizzazione NON forte
	- linguaggio di scripting (uso di tutti i metodi e variabli come se fossero static e public)
 */

/*
	Javascript permette di sfruttare le piene potenzialità del browser
	Verrà usato per costruire messaggi http personalizzati
	ciò ci permetterà di superare le limitazioni imposte dai FORM (no PUT, no DELETE)
*/

/*
	Sebbene javascript sia sufficiente per l'invio di richieste HTTP 
	Esiste un'altra tecnologia che rende il processo più semplice
	è una libreria javascript chiamata jQuery
*/

/*
	Il principio su cui si fonda il pattern che vedremo è semplice:
	Compilo una richiesta HTTP
	Chiedo al browser di mandarla al server (senza fare il refresh)
	tale richiesta si dirà asincrona
	il server risponderà.
	La risposta del server farà partire un trigger che permetterà l'aggiornamento della pagina
 */

var baseUrl = "http://localhost:4202";
var apiUrl = baseUrl + "/productApis";

var apis;

var operationTypes = ['Search', 'Sort', 'Filter'];

function getApis() {
	$.ajax({
		url: apiUrl,
		method: 'GET',
		error: function() {
			alert("Error getting APIs :(")
		},
		success: function(data) {
			apis = data;
			showApisView();
		}
	});
}

function showApisView() {
	let s = '';
	for(let opType of operationTypes){
		s += '<h4>'+ opType +'</h4>'
		for(let api of apis.productOperation[opType]) {
			if(opType == 'Sort')
				s += showSortView(api);
			if(opType == 'Filter')
				s += showFilterView(api);
			if(opType == 'Search')
				s += showSearchView(api);
			
		}
	}
	$("#operations").html(s);
}

function showSortView(api) {
	return showButtonApiView(api);
}

function showFilterView(api){
	let s = 'Select available <input type="checkbox">';
	s += showButtonApiView(api);
	return s;
}

function showSearchView(api){
	let strDescription = api.description.replace(/\s/g, "");
	
	let s = '<input onkeyup="computeInputValue(\''+strDescription+'\', \''+api.url+'\', \''+api.description+'\')" id="in_'+strDescription+'" type="text" placeholder="'+api.description+'">';
	s += '<div id="div_'+strDescription+'">';
	s += '<button id="btn_'+strDescription+'" onclick="getProductApi(\''+api.url+'\')">'+api.description+'</button>';
	s += '</div>';
	return s;
}

function computeInputValue(id, url, description) {
	let apiVariable = url.substring(url.indexOf('{')+1, url.indexOf('}'));
	let pName = $('#in_'+id).val();
	let myApiUrl = url.replace(new RegExp('{'+apiVariable+'}'), pName);
	url = myApiUrl;
	let s = '<button onclick="getProductApi(\''+url+'\')">'+description+'</button>';
	$('#div_'+id).html(s);
}

function showButtonApiView(api) {
	return '<button onclick="getProductApi(\''+api.url+'\')">'+api.description+'</button>';
}

function getProductApi(url, reqBody) {
	$.ajax({
		url: baseUrl + url,
		method: 'GET',
		data: reqBody,
		contentType: 'application/json',
		error: function() {
			alert("Error :(")
		},
		success: function(data) {
			products = data;
			showProducts();
		}
	});
}

var products;

function getProducts(){
	//request http
	$.ajax({
		url: 'http://localhost:4202/products',
		method: 'GET',
		error: function() {
			alert("Error :(")
		},
		success: function(data) {
			products = data;
			showProducts();
		}
	});
}

function postProduct() {
	var pName = $('#name').val();
	var pBrand = $('#brand').val();
	var pCategory = $('#category').val();
	var pPrice = $('#price').val();
	var pAvailable = $('#available').is(":checked");
	var prod = new Product(0, pName, pBrand, pCategory, pPrice, pAvailable);
	$.ajax({
		method: 'POST',
		url: 'http://localhost:4202/product',
		data: JSON.stringify(prod),
		contentType: 'application/json',
		success: function() {getProducts()},
		error: function() {alert('Error :(')}
	});
}

function updateProduct(id) {
	var pId = $('#id_' + id).val();
	var pName = $('#name_' + id).val();
	var pBrand = $('#brand_' + id).val();
	var pCategory = $('#category_' + id).val();
	var pPrice = $('#price_' + id).val();
	var pAvailable = $('#available_' + id).is(":checked");
	var prod = new Product(pId, pName, pBrand, pCategory, pPrice, pAvailable);
	$.ajax({
		method: 'PUT',
		url: 'http://localhost:4202/product',
		data: JSON.stringify(prod),
		contentType: 'application/json',
		success: function() {getProducts()},
		error: function() {alert('Error :(')}
	});
}

function deleteProduct(id) {
	$.ajax({
		url: 'http://localhost:4202/product/' + id,
		method: 'DELETE',
		success: function() {getProducts()},
		error: function() {alert('Error :(')}
	});
}

function showProducts(){
	var htmlTableRows = '';
	for(let p of products){
		let available = (p.available) ? 'Yes' : 'No';
		let checked = (p.available) ? 'checked' : '';
		htmlTableRows += '<tr id="values_'+p.id+'" ><td>'+p.id+'</td><td>'+p.name+'</td><td>'+p.brand+'</td><td>'+p.category+'</td><td>€'+p.price+'</td><td>'+ available +'</td><td><button onclick="deleteProduct('+p.id+')" class="del">Delete</button></td><td><button onclick="showFields('+p.id+')" class="upd">Update</button></td></tr>'
		htmlTableRows += '<tr id="fields_'+p.id+'" style="display: none">' + 
        		'<td>'+p.id+'<input id="id_'+p.id+'" value="'+p.id+'" type="hidden"></td><td><input id="name_'+p.id+'" type="text" value="'+p.name+'"></td>' +
        		'<td><input id="brand_'+p.id+'" type="text" value="'+p.brand+'"></td>' +
        		'<td><input id="category_'+p.id+'" type="text" value="'+p.category+'"></td>' +
        		'<td><input id="price_'+p.id+'" type="number" value="'+p.price+'"></td>' +
        		'<td>available <input type="checkbox" id="available_'+p.id+'" '+checked+'></td>' +
        		'<td><button onclick="updateProduct('+p.id+')" class="save">Save</button></td>' +
        		'<td><button onclick="showValues('+p.id+')" class="clear">Cancel</button></td>' +
        	'</tr>';
	}
	$('#product-records').html(htmlTableRows);
}

class Product {
	constructor(id, name, brand, category, price, available) {
		this.id = id;
		this.name = name;
		this.brand = brand;
		this.category = category;
		this.price = price;
		this.available = available;
	}
}



function clearFields() {
	$('#name').val('');
	$('#brand').val('');
	$('#category').val('');
	$('#price').val('');
	$('#available').prop("checked", false);
}

function showFields(id) {
	$('#values_'+id).hide();
	$('#fields_'+id).show();
}

function showValues(id) {
	$('#values_'+id).show();
	$('#fields_'+id).hide();
}

getApis();
getProducts();