var numPratos = 8;
var lastIndex = 0;
//Clicar nos botoes das quantidades
function CustomOnClick(index, add) {
	var nome = "Quantidade" + index.toString();
	var old = document.getElementById(nome).innerHTML;

	if (add) {
		old++;
		lastIndex = index;
	}
	else if (old >= 1) { 
		old--;
	}
	document.getElementById(nome).innerHTML = old;
	UpdatePriceText();
}

function UpdatePriceText() {

	var TotalCalorias = 0, TotalProteinas = 0, TotalLipidos = 0, TotalHidratos = 0;

	var contador = 0;
	var i;
	for (i = 1; i <= pratos.length; i++) {
		var Texto = "Quantidade" + i;
		var Quant = parseInt(document.getElementById(Texto).innerHTML);
		contador += pratos[i-1].preco * Quant;
		TotalCalorias += pratos[i-1].calorias * Quant;
		TotalProteinas += pratos[i-1].proteinas * Quant;
		TotalLipidos += pratos[i-1].lipidos * Quant;
		TotalHidratos += pratos[i-1].hidratos * Quant;
	}

	var textoComSimbolo = contador.toFixed(2) + " €";
	document.getElementById("TotalTexto").innerHTML = contador.toFixed(2);
	document.getElementById("moneyText").innerHTML = textoComSimbolo;
	document.getElementById("TextoCalorias").innerHTML = "Calorias:\t" + TotalCalorias + "kcal";
	if(TotalCalorias>=2000){myFatPopUp();}
	document.getElementById("TextoProteinas").innerHTML = "Proteínas:\t" + TotalProteinas + " g";
	document.getElementById("TextoLipidos").innerHTML = "Lípidos:\t" + TotalLipidos + " g";
	document.getElementById("TextoHidratos").innerHTML = "Hidratos:\t" + TotalHidratos + " g";
}

function myFatPopUp() {
	    var popup = document.getElementById("fatPopup");
	    popup.classList.toggle("show");
}

function CarregaPratos() {
	var i;
	var quantityElement = document.getElementsByClassName("Quantidade");
	var table = document.getElementById("Table1");
	var nomes = ["TextoPrato", "QuadradoMenos", "Quantidade", "QuadradoMais"];

	for (i = 1; i <= pratos.length; i++) {

		var newTr = table.insertRow(i);
		if (pratos[i-1].nome.length > caloryThreshold) {
			newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color); background-color: #dbbc83");
			newTr.setAttribute("title", "Atenção: " + pratos[i-1].nome + " tem muitas calorias!");
		}
		else {
			newTr.setAttribute("style", "font-size: 1.7em; border-top: solid var(--border_color);");
		}

		var newTd = [newTr.insertCell(0), newTr.insertCell(1), newTr.insertCell(2)];
		newTd[0].setAttribute("width", "25%");
		newTd[1].setAttribute("width", "25%");
		newTd[2].setAttribute("width", "15%");
		newTd[0].setAttribute("height", "80");
		newTd[1].setAttribute("height", "80");
		newTd[2].setAttribute("height", "80");

		newTd[1].setAttribute("id", nomes[0] + i);
		newTd[2].setAttribute("style", "min-width: 150px");

		newTd[0].appendChild(document.createTextNode(pratos[i-1].nome));
		newTd[1].appendChild(document.createTextNode((pratos[i-1].preco).toFixed(2)));

		var newQuantity = quantityElement[0].cloneNode(true);

		newQuantity.setAttribute("style", "display: all;");
		newQuantity.children[0].setAttribute("id", nomes[1] + i);
		newQuantity.children[1].setAttribute("id", nomes[2] + i);
		newQuantity.children[2].setAttribute("id", nomes[3] + i);

		newClick0 = "CustomOnClick(" + i + ", false)";
		newClick2 = "CustomOnClick(" + i + ", true)";

		newQuantity.children[0].setAttribute("onclick", newClick0);
		newQuantity.children[2].setAttribute("onclick", newClick2);

		newTd[2].appendChild(newQuantity);
	}
};

window.onload = function() {

	AdicionarPrato("Bife", 9.50);
	AdicionarPrato("Batatas Fritas", 2.50);
	AdicionarPrato("Coca-Cola", 1.50);
	AdicionarPrato("Azeitonas", 0.50);

	var lista = localStorage.getItem("listaPratos");
	var pratos = JSON.parse(lista);
	
	CarregaPratos();
	UpdatePriceText();
}
