// These don't need to be global but lets make them global anyway
let output
let apiUrl

window.onload = function(){
	output = document.querySelector('.output');
	
	//	DELIVERABLES:
	//apiUrl = 'http://httpstat.us/500';	//	DELIVERABLE #1
	apiUrl = 'https://jsonplaceholder.typicode.com/users';	//	DELIVERABLE #2
	
	
	handleErrors = (response) => {
		
		if (!response.ok) {
			throw Error(response.statusText);
		}
		
		return response;
	}
	
	displayError = (error) => {
		console.log('Error fetching', error);
		
		// Outputs apiURL and Error
		output.innerHTML = `Error fetching ${apiUrl} <br/> ${error}`;
	}
	
	
	displayUsers = (json) => {
		console.log(json);
		
		// Outputs Username, Company Name, and Address City for each user in json
		json.forEach(function(user){
			output.innerHTML += `
				<p>Username: ${user.username}<p/>
				<p>Company Name: ${user.company.name}<p/>
				<p>Address City: ${user.address.city}<p/>
			`;
		})
	}
	
	
	fetch(apiUrl)
		.then(handleErrors)
		.then(response => response.json())
		.then(json => displayUsers(json))
		.catch(error => displayError(error))
}