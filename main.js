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
  countryName.textContent = Array.isArray(country.name) ? country.name[0] : country.name;
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
    var answer = normalize(input.value.toLowerCase());
    if (Array.isArray(country.name)) {
      var names = country.name;
      for (var i = 0; i < names.length; i++) {
        if (answer === normalize(names[i].toLowerCase())) {
          refreshCountry();
        }
      }
    } else if (answer === normalize(country.name.toLowerCase())) {
      refreshCountry();
    }
  });
}

function normalize(name) {
  return name.replace(/'\./, "").replace(/-/, " ");
}

main();
