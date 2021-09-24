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

function catPicture () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://cataas.com/cat?json=true');
  xhr.reponseType = 'json';
  xhr.addEventListener('load', function(){
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
  });
  xhr.send();
}

randomButton.addEventListener('click', catPicture);

function savePicture(){
  event.preventDefault()
  entries.push({
    title: titleInput.value,
    photoURL: urlInput.value,
    notes: notesInput.value
  });
  page2.classList.add('hidden');
  page1.classList.remove('hidden');
  noEntries.classList.add('hidden');

  entriesContainer = document.createElement('div');

  for(let i = 0; i < entries.length; i++){
    var parentContainer = document.createElement('div');
    var title = document.createElement('h3');
    title.textContent = entries[i].title;
    var notes = document.createElement('p');
    var image = document.createElement('img');
    image.setAttribute('src', entries[i].photoURL);
    notes.textContent = entries[i].notes;
    parentContainer.appendChild(image);
    parentContainer.appendChild(title);
    parentContainer.appendChild(notes);
    entriesContainer.appendChild(parentContainer);
  }
}

saveButton.addEventListener('click', savePicture);

entriesButton.addEventListener('click', function(){
  event.preventDefault()
  page2.classList.add('hidden');
  page1.classList.remove('hidden');
});
