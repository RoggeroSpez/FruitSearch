const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

let selectedSuggestionIndex = -1;
let totalSuggestions = 0;

function search(str) {
  let results = [];

  if (str.length > 0) {
    results = fruit.filter(item => item.toLowerCase().includes(str.toLowerCase()));
  }

  return results;
}

function searchHandler(e) {
  const inputVal = e.target.value;
  const results = search(inputVal);
  showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {
  const fruitList = results.map((list, index) => {
    return `<li index="${index}">${list}</li>`;
  }).join('');

  suggestions.innerHTML = "<ul>" + fruitList + "</ul>";
  suggestions.style.display = 'block';

  totalSuggestions = results.length;
}

function useSuggestion(e) {
  if (e.target.matches('li')) {
    const selectedValue = e.target.textContent;

    input.value = selectedValue;
    suggestions.innerHTML = '';
    selectedSuggestionIndex = -1;
    input.focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (selectedSuggestionIndex > 0) {
      selectedSuggestionIndex--;
    } else {
      selectedSuggestionIndex = totalSuggestions - 1;
    }
    highlightSuggestion();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (selectedSuggestionIndex < totalSuggestions - 1) {
      selectedSuggestionIndex++;
    } else {
      selectedSuggestionIndex = 0;
    }
    highlightSuggestion();
  } else if (e.key === 'Enter') {
    const selectedSuggestion = suggestions.querySelector(`li[index="${selectedSuggestionIndex}"]`);
    if (selectedSuggestion) {
      const selectedValue = selectedSuggestion.textContent;

      input.value = selectedValue;
      suggestions.innerHTML = '';
      selectedSuggestionIndex = -1;
      input.focus();
    }
  }
}

function highlightSuggestion() {
  const suggestionsList = suggestions.querySelectorAll('li');

  suggestionsList.forEach((item, index) => {
    if (index === selectedSuggestionIndex) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
}

input.addEventListener('keyup', function(e) {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
    useSuggestion(e);
  } else {
    searchHandler(e);
  }
});

suggestions.addEventListener('click', useSuggestion);
