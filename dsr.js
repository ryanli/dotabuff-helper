var url = document.location.href;
var playerId = url.match(/\d+/)[0];
var dsrUrl = 'http://mydotaskill.com/index.php?id=' + playerId;

var section = document.createElement('section');
var header = document.createElement('header');
var link = document.createElement('a');
link.textContent = 'Dota 2 Skill Rating (DSR)';
link.href = dsrUrl;
header.appendChild(link);
section.appendChild(header);
var article = document.createElement('article');
section.appendChild(article);

var loading = document.createElement('div');
loading.className = 'remote-loading';
loading.textContent = 'Loading...';
article.appendChild(loading);

var secondary = document.getElementsByClassName('secondary')[0];
var insertBefore = secondary.childNodes[0];
secondary.insertBefore(section, insertBefore);

var xhr = new XMLHttpRequest();
xhr.open('GET', dsrUrl, true);
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		article.removeChild(loading);

		var table = document.createElement('table');
		article.appendChild(table);
		var thead = document.createElement('thead');
		table.appendChild(thead);
		var tr = document.createElement('tr');
		thead.appendChild(tr);
		var tierHeader = document.createElement('th');
		tierHeader.textContent = 'Tier';
		tr.appendChild(tierHeader);
		var ratingHeader = document.createElement('th');
		ratingHeader.textContent = 'Rating';
		tr.appendChild(ratingHeader);

		var tbody = document.createElement('tbody');
		table.appendChild(tbody);
		var row = document.createElement('tr');
		tbody.appendChild(row);

		var dummy = document.createElement('div');
		dummy.innerHTML = xhr.responseText;
		try {
			var tier = dummy.getElementsByTagName('h4')[1].nextSibling.nextSibling.nextSibling.textContent;
			var rating = dummy.getElementsByTagName('h4')[1].getElementsByTagName('a')[0].textContent;
		
			var tierCell = document.createElement('td');
			tierCell.textContent = tier;
			row.appendChild(tierCell);
			var ratingCell = document.createElement('td');
			ratingCell.textContent = rating;
			row.appendChild(ratingCell);
		} catch (e) {
			// rating not ready yet (queueing)
			var position = dummy.getElementsByTagName('h4')[1].textContent.match(/\d+/g)[1];
			var queueCell = document.createElement('td');
			queueCell.textContent = 'Queueing, position: ' + position;
			queueCell.colSpan = 2;
			queueCell.className = 'cell-centered cell-explanation';
			row.appendChild(queueCell);
		}
	}
}
xhr.send();
