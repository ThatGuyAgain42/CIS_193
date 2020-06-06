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
	
	if (repeats > 0){
		
		document.querySelector("#name").value = "";
		document.querySelector("#email").value = "";
		
		return false
		
	} else {
		
		document.querySelector("#name").value = "";
		document.querySelector("#email").value = "";

		abm.add(item);//list.push(item);
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
		if (this.listOfContacts == ""){
			document.querySelector(htmlId).innerHTML = "No contacts to display!";
	
		} else {
			
			let table = "<table>";
		
			for (let i = 0; i < this.listOfContacts.length; i++){
				let name = this.listOfContacts[i].name;
				let email = this.listOfContacts[i].email;
			
				table += `<tr><td>${name}</td><td>${email}</td></tr>`;
			}
		
			table += "</table>";
			document.querySelector(htmlId).innerHTML = table;
		}
	}
}

document.onload = document.querySelector("#contacts").innerHTML = "No contacts to display!"

