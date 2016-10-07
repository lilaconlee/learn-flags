var countries = require('./country-flags/countries.json');
var countryList = Object.keys(countries);
var flagContainer = document.getElementById('flagContainer');
var countryName = document.getElementById('countryName');
var nextButton = document.getElementById('next');
var cheatButton = document.getElementById('cheat');
var input = document.getElementById('countryInput');
var country;

function getCountry() {
  var i = random(countryList.length);
  var initials = countryList[i];

  country = {
    name: countries[initials],
    initials: initials
  };
}

function refreshCountry() {
  input.value = '';
  getCountry();
  cheatButton.classList.remove('hidden');
  nextButton.classList.add('hidden');

  countryName.classList.add('invisible');
  countryName.textContent = country.name;
  flagContainer.src = './country-flags/svg/' + country.initials.toLowerCase() + '.svg';
}

function cheat() {
  countryName.classList.remove('invisible');
  cheatButton.classList.add('hidden');
  nextButton.classList.remove('hidden');
}

function random(max) {
  return Math.floor(Math.random() * max);
}

function main() {
  refreshCountry();
  nextButton.addEventListener('click', refreshCountry);
  cheatButton.addEventListener('click', cheat);
  document.addEventListener('keydown', function (event) {
    if (event.which === 13) { cheat(); }
  });
  input.addEventListener('input', function () {
    if (input.value.toLowerCase() === country.name.toLowerCase()) {
      refreshCountry();
    }
  });
}

main();
