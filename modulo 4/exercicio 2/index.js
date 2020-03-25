function getUser(user) {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/users/' + user + '/repos');
		xhr.send(null);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject('Erro na requisição.');
				}
			}
		}
	});
}

let btnElement = document.querySelector('button.botao');

btnElement.onclick = function () {
	let inputElem = document.querySelector('input');
	let reposList = document.querySelector("#repos");
	reposList.innerHTML = '';
	
	getUser(inputElem.value)
		.then(function (value) {
			console.log(value);
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
			console.warn(error);
		});

	inputElem.value = '';
}