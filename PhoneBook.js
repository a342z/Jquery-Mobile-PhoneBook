let contacts;

$(document).ready(function () {
  let contactsData = localStorage.getItem('contacts-list');
  contacts = contactsData ? JSON.parse(contactsData) : [];
  //Add new Contact
  $('#save-button').bind('click', function (event, ui) {
    event.preventDefault();
    document.querySelector('#textinput-email').checkValidity();
    document.querySelector('#textinput-email').reportValidity();
    let name = $('#textinput-name').val();
    let phone = $('#textinput-phone').val();
    let email = $('#textinput-email').val();
    let gender = $('#select-gender').val();
    let contact = new Contact(name, phone, email, gender);
    contacts.push(contact);
    localStorage.setItem('contacts-list', JSON.stringify(contacts));
    appendToListView(contact);
  });

  initListview();
});

function initListview() {
  console.log(contacts);
  for (let i = 0; i < contacts.length; i++) {
    $('#contacts-listview').append(`
  <li><a href="#contact-details">
  <img src="images/${contacts[i].gender}.png">
  <h2>${contacts[i].name}</h2>
  <p>${contacts[i].phone}</p>
</a>
</li>`);
  }

  $('#contacts-listview').listview('refresh');
}

function appendToListView(contact) {
  $('#contacts-listview').append(`
  <li><a href="#contact-details">
  <img src="images/${contact.gender}.png">
  <h2>${contact.name}</h2>
  <p>${contact.phone}</p>
</a>
</li>`);

  $('#contacts-listview').listview('refresh');
}
