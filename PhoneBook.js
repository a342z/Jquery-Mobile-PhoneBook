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
    clearInputs();
  });
  initListview();
});

function initListview() {
  console.log(contacts);
  for (const contact of contacts) {
    appendToListView(contact);
  }
}

function appendToListView(contact) {
  $('#contacts-listview').append(`
  <li id=${contact.id}><a href="#contact-details" onclick="displayDetails(${contact.id},this)">
  <img src="images/${contact.gender}.png">
  <h2>${contact.name}</h2>
  <p>${contact.phone}</p>
</a>
<a href="tel:${contact.phone}"  class = "ui-btn ui-btn-inline ui-icon-phone ui-btn-icon-notext"></a>
</li>`);

  $('#contacts-listview').listview('refresh');
}

function displayDetails(id,ui) {
  console.log(ui);
  console.log('clicked');
  let contact = contacts.filter((c) => c.id == id)[0];
  console.log(contact);
  $('#details-name').text(contact.name);
  // $('#details-phone').text(contact.phone);
  $('#details-image').attr('src', `images/${contact.gender}.png`);
  $('#details-callPhone').attr('href', `tel:${contact.phone}`);
  $('#details-cancel-delete').bind('click', function () {
    $('#delete-popup').popup('close');
  });
  $('#details-delete').bind('click',function(){
      deleteContact(id);
  })
}

function clearInputs() {
  $('#textinput-name').val('');
  $('#textinput-phone').val('');
  $('#textinput-email').val('');
  $('#select-gender').val('');
}

function deleteContact(id){
  console.log(id);
  console.log("delete");
  let index = contacts.findIndex(c => c.id == id);
  contacts.splice(index,1);
  localStorage.setItem('contacts-list', JSON.stringify(contacts));
  $(`#${id}`).remove();
  window.location.href ="#contacts-list";
}
