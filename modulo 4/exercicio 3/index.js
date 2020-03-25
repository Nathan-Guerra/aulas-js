function getUser(user) {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/users/' + user + '/repos');
		xhr.send(null);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else if (xhr.status === 404) {
					reject('Usuário não encontrado.');
				} else {
					reject('Erro na requisição.');
				}
			}
		}
	});
}

let btnElement = document.querySelector('button.botao');

btnElement.onclick = function () {
	cleanList();

	let inputElem = document.querySelector('input');
	let reposList = document.querySelector("#repos");
	let ulElem = document.createElement('ul');
	let liElem = document.createElement('li');
	let text = document.createTextNode('Carregando...');

	liElem.appendChild(text);
	ulElem.appendChild(liElem);

	reposList.appendChild(ulElem);


	getUser(inputElem.value)
		.then(function (value) {

			cleanList();
			let ulElem = document.createElement('ul');

			for (let repos of value) {
				let liElem = document.createElement('li');
				let text = document.createTextNode(repos.name);

				liElem.appendChild(text);
				ulElem.appendChild(liElem);
				reposList.appendChild(ulElem);
			}
		})
		.catch(function (error) {
			alert(error);
			cleanList()
		});

	inputElem.value = '';
}

function cleanList() {
	let reposList = document.querySelector("#repos");
	reposList.innerHTML = '';
}