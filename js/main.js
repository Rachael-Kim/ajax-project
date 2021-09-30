var randomButton = document.querySelector('.random-button');
var randomCatImage = document.querySelector('.random-cat-image');
var page1 = document.querySelector('.page1');
var page2 = document.querySelector('.page2');
var titleInput = document.getElementById('title-input');
var urlInput = document.querySelector('.url-input');
var notesInput =  document.getElementById('notes-input');
var entriesButton = document.querySelector('.entries-button');
var saveButton = document.querySelector('.save-button');
var noEntries = document.querySelector('.no-entries');
var entriesContainer = document.querySelector('.container');
var page3 = document.querySelector('.page3');
var entriesButton = document.querySelector('.entries-button');
var editCatImage  = document.querySelector('.random-cat-edit');
var editTitle  = document.querySelector('.edit-title');
var editNotes = document.querySelector('.edit-notes');
var editURL= document.querySelector('.edit-url');
var saveButtonEdit = document.querySelector('.save-button-edit');
var cancelButton = document.querySelector('.cancel-button');
var modal = document.querySelector('.modal-overlay');
var deleteButton = document.querySelector('.delete-button');
var modalCancelButton = document.querySelector('.modal-cancel-button');
var modalConfirmButton = document.querySelector('.modal-confirm-button');

entriesButton.addEventListener('click', function(event){
  event.preventDefault();
  page1.classList.remove('hidden');
  page2.classList.add('hidden');
  page3.classList.add('hidden');
});

function catPicture () {
  titleInput.value = '';
  notesInput.value = '';
  document.querySelector('.lds-heart').classList.remove('hidden')
  document.querySelector('.overlay').classList.remove('hidden')
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://cataa.com/cat?json=true');
  xhr.reponseType = 'json';
  xhr.addEventListener('load', function(event){
    var responseObj = JSON.parse(xhr.response);
    console.log(responseObj)
    console.log(xhr.status);
    console.log(xhr.response);
    console.log(responseObj.url)
    var catURL = `https://cataas.com${responseObj.url}`
    randomCatImage.setAttribute('src', catURL)
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
    urlInput.value  = catURL;
    document.querySelector('.lds-heart').classList.add('hidden')
    document.querySelector('.overlay').classList.add('hidden')
  });
  xhr.addEventListener('error', function(event) {
    console.log('error occured')
    document.querySelector('.error-message').classList.remove('hidden')
    document.querySelector('.lds-heart').classList.add('hidden')
    document.querySelector('.overlay').classList.add('hidden')
  })
  xhr.send();
}

randomButton.addEventListener('click', catPicture);

function savePicture(event){
  event.preventDefault()
  entries.push({
    title: titleInput.value,
    photoURL: urlInput.value,
    notes: notesInput.value
  });
  page2.classList.add('hidden');
  page1.classList.remove('hidden');
  renderDOM()
}

function renderDOM(){
  var firstChild = entriesContainer.firstElementChild
  entriesContainer.removeChild(firstChild);
  var grandParentContainer = document.createElement('div');

  for (let i = entries.length - 1; i >= 0; i--) {
    var parentContainer = document.createElement('div');
    var title = document.createElement('h3');
    title.textContent = entries[i].title;
    var notes = document.createElement('p');
    var image = document.createElement('img');
    image.setAttribute('src', entries[i].photoURL);
    image.setAttribute('class', 'random-cat-image');
    notes.textContent = entries[i].notes;
    notes.setAttribute('class', 'homepage-notes')
    parentContainer.appendChild(title);
    parentContainer.appendChild(notes);
    parentContainer.appendChild(image);
    grandParentContainer.appendChild(parentContainer);
    var penIcon = document.createElement('i');
    parentContainer.appendChild(penIcon);
    parentContainer.setAttribute('class', 'parent-container')
    penIcon.setAttribute('class', 'fas fa-pen pen-icon');
    var columnHalf = document.createElement('div');
    columnHalf.setAttribute('class', 'column-half');
    columnHalf.appendChild(title);
    columnHalf.appendChild(penIcon);
    var titleIconDiv = document.createElement('div');
    titleIconDiv.setAttribute('class', 'title-icon-div')
    titleIconDiv.appendChild(title);
    titleIconDiv.appendChild(penIcon);
    columnHalf.appendChild(titleIconDiv);
    columnHalf.appendChild(notes);
    parentContainer.appendChild(columnHalf);
    penIcon.addEventListener('click', function(event){
      event.preventDefault();
      page1.classList.add('hidden');
      page3.classList.remove('hidden');
      editCatImage.setAttribute('src', entries[i].photoURL);
      editTitle.value = entries[i].title;
      editURL.value = entries[i].photoURL;
      editNotes.value = entries[i].notes;
    });
  }
  entriesContainer.appendChild(grandParentContainer)
}

saveButton.addEventListener('click', savePicture);
saveButtonEdit.addEventListener('click', function(event){
  event.preventDefault();
  for(let i = 0; i < entries.length; i++){
    if(entries[i].photoURL ===  editURL.value){
      entries[i].title = editTitle.value;
      entries[i].notes = editNotes.value;
    }
  }
  page3.classList.add('hidden');
  page1.classList.remove('hidden');
  renderDOM();
});

entriesButton.addEventListener('click', function(event){
  event.preventDefault()
  page2.classList.add('hidden');
  page1.classList.remove('hidden');
});


cancelButton.addEventListener('click', function(event){
  event.preventDefault()
  page3.classList.add('hidden');
  page1.classList.remove('hidden');
});

// Modal

deleteButton.addEventListener('click', function(event){
  event.preventDefault();
  modal.classList.remove('hidden');
});

modalCancelButton.addEventListener('click', function(){
  event.preventDefault();
  modal.classList.add('hidden');
});

modalConfirmButton.addEventListener('click', function(event){
  event.preventDefault();
  for (let i = 0; i < entries.length; i++){
    if (entries[i].photoURL === editURL.value){
      entries.splice(i, 1);
    }
  }
  modal.classList.add('hidden');
  page1.classList.remove('hidden');
  page3.classList.add('hidden');
  renderDOM();
});
