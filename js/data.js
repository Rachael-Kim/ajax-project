/* exported data */
var entries = [];

if (localStorage.getItem('data') !== null) {
  entries = JSON.parse(localStorage.getItem('data'));
}

window.addEventListener('beforeunload', function (event) {
  localStorage.setItem('data', JSON.stringify(entries));
});

window.addEventListener('DOMContentLoaded', function(event){
  renderDOM()
});
