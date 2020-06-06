window.onload = init;

// The contact manager as a global variable
let abm;
/**
 * Function Name: init()
 * This method creates and intializes a new instance of AddressBookManager
 */
function init() {
  // create an instance of the contact manager
  abm = new AddressBookManager();
}
/**
 * Class Name: Contact
 * This class takes both name and email to instantiate itself
 */
class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
// ====================================================================
//            !!! DO NOT MODIFY ABOVE THIS LINE!!!
// ====================================================================

/******************************************************************** 
* Function Name: formSubmitted()
* This function takes both name and email from the HTML to create
* an instance of Contact object for storage in the AddressBookManager
* referenced by the global variable, abm.
* This function returns a boolean to avoid form submission via HTTP
********************************************************************/

function formSubmitted() {
	let name = document.querySelector("#name").value;
	let email = document.querySelector("#email").value;
	
	let item = new Contact(name,email);
	
	let repeats = 0;
	let list = abm.listOfContacts;
	
	for (let i = 0; i < list.length; i++){
		if(list[i].name == item.name && list[i].email == item.email){
			repeats += 1;
		}
	}
	
	document.querySelector("#name").value = "";
	document.querySelector("#email").value = "";
	
	if (repeats > 0){
		return false
		
	} else {
		abm.add(item);
		return false
	}
}


/*********************************************************************
* Function Name: emptyList()
* This function empties the contact list in AddressBookManager 
* and displays the "No contacts to display" message in the table area. 
*********************************************************************/

function emptyList() {
	abm.empty();
	abm.displayContactTable("#contacts");
}


" \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/ "

/*****************************************************************
 * Function Name: sortList()
 * This function sorts the contact list by name in descending 
 * alphabetical order, by invoking AddressBookManager's sort() and 
 * displaying the result in the table display area.
 ****************************************************************/
 
function sortList() {
	abm.sort();
	abm.displayContactTable("#contacts");
}


/**************************************************************
 * Function Name: saveList()
 * This function saves the contact list in HTML Web Storage's
 * localStorage. You will invoke AddressBookManager's save() to
 * accomplish this.
 *************************************************************/
 
function saveList() {
	abm.save();
}


/***************************************************************
 * Function Name: loadList()
 * This function loads the contact list from HTML Web Storage's
 * localStorage. You will invoke AddressBookManager's load() and
 * display the loaded list into the table display area.
 **************************************************************/
 
function loadList() {
	abm.load();
	abm.displayContactTable("#contacts");
}

" /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\ "

/******************************************************************
* Class Name: AddressBookManager
* This class initializes an empty contact list. This class has
* THREE (3) methods:
*    1. empty(): empty contact list.
*    2. add(contact): add a named contact to list.
*    3. displayContactTable(htmlId): displays the contact list in a 
*       table format; if there is no contact in the list, print
*       "No contacts to display!" in HTML.
******************************************************************/

class AddressBookManager {
	constructor() {
		this.listOfContacts = [];
	}
	
	
/**************************************
* Method Name: empty()
* This method empties the contact list.
**************************************/

	empty() {
		this.listOfContacts = [];
	}
	
	
/********************************************************
* Method Name: add(contact)
* This method adds the named contact to the contact list.
********************************************************/

	add(contact) {
		this.listOfContacts.push(contact);
		this.displayContactTable("#contacts");
	}


/*********************************************************
* Method Name: displayContactTable(htmlId)
* This method clears the prior table content and displays 
* the new table content from the non-empty contact list in 
* a correctly formatted HTML table. If the contact list is 
* empty, this method prints a "No contacts to display!" 
* message in HTML as depicted in the demo.
*********************************************************/

	displayContactTable(htmlId) {
		let list = this.listOfContacts;
		
		if (list == ""){
			document.querySelector(htmlId).innerHTML = "No contacts to display!";
	
		} else {
			let table = "<table>";
		
			for (let i = 0; i < list.length; i++){
				let name = list[i].name;
				let email = list[i].email;
			
				table += `<tr><td>${name}</td><td>${email}</td></tr>`;
			}
		
			table += "</table>";
			document.querySelector(htmlId).innerHTML = table;
		}
	}


" \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/  \/ "

/***********************************************************************
* Method name: sort()
* This method sorts the contact list elements by descending alphabetical
* order. For example: 
* Original list: "Joe", "Kay", "Zoe"
* Sorted list in descending order: "Zoe", "Kay", "Joe"
* You may want to check: https://www.w3schools.com/jsref/jsref_sort.asp
***********************************************************************/

	sort() {
		let list = this.listOfContacts;

		list.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);
		list.reverse();
	}
	
	
/******************************************************************
* Method name: load()
* This method loads the contact list string from HTML Web Storage's
* localStorge back.
******************************************************************/

	load() {
		let storageName = localStorage.getItem("listName").split(",");
		let storageEmail = localStorage.getItem("listEmail").split(",");
		let storageSort = []
		
		
		for (let i = 0; i < storageName.length; i++) {
			let item = new Contact(storageName[i],storageEmail[i])
			storageSort.push(item);
		}
		
		this.listOfContacts = storageSort;
	}
	
	
/*********************************************************
* Method name: save()
* This method saves the contact list into a JSON string in
* HTML Web Storage's localStorage. 
*********************************************************/

	save() {
		localStorage.clear();
		
		let list = this.listOfContacts;
		let listName = [];
		let listEmail = [];
		
		
		for (let i = 0; i < list.length; i++) {
			listName.push(list[i].name);
			listEmail.push(list[i].email);
		}
		
		localStorage.setItem("listName",listName);
		localStorage.setItem("listEmail",listEmail);
	}

" /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\  /\ "


}

document.onload = document.querySelector("#contacts").innerHTML = "No contacts to display!"

