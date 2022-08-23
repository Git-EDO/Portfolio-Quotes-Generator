let quotes = [
  {
    quoteText: 'Чем умнее человек, тем легче он признает себя дураком.',
    quoteAuthor: 'Альберт Эйнштейн',
    quoteCountry: 'Германия',
  },
  {
    quoteText: 'Никогда не ошибается тот, кто ничего не делает.',
    quoteAuthor: 'Теодор Рузвельт',
    quoteCountry: 'США',
  },
  {
    quoteText: 'Не оборачивается тот, кто устремлён к звёздам.',
    quoteAuthor: 'Леонардо Да Винчи',
    quoteCountry: 'Италия',
  },
  {
    quoteText: 'История – самый лучший учитель, у которого самые плохие ученики.',
    quoteAuthor: 'Индира Ганди',
    quoteCountry: 'Индия',
  },
  {
    quoteText: 'У тебя есть враги? Хорошо. Значит, в своей жизни ты что-то когда-то отстаивал.',
    quoteAuthor: 'Уинстон Чирчилль',
    quoteCountry: 'Великобритания',
  },
  {
    quoteText: 'Сложнее всего начать действовать, все остальное зависит только от упорства.',
    quoteAuthor: 'Амелия Эрхарт',
    quoteCountry: 'США',
  },
  {
    quoteText: 'В самой сущности человека заложено, что его последняя цель должна быть недостижимой, а путь к ней - бесконечным.',
    quoteAuthor: 'Иоганн Готлиб Фихте',
    quoteCountry: 'Германия',
  },
  {
    quoteText: 'Можешь забрать себе весь мир, но оставь мне Италию.',
    quoteAuthor: 'Джузеппе Верди',
    quoteCountry: 'Италия',
  },
  {
    quoteText: 'Наши фильмы не показывают реальность такой, какой она является на самом деле.',
    quoteAuthor: 'Саиф Али Кхан',
    quoteCountry: 'Индия',
  },
  {
    quoteText: 'Истинный патриотизм не исключает понимания патриотизма других.',
    quoteAuthor: 'Елизавета II',
    quoteCountry: 'Великобритания',
  },
];

// Генерируем цитату
let quoteBtn = document.querySelector('.generate');
let quoteContent = document.querySelector('.quote');
let quoteAuthor = document.querySelector('.author');

quoteBtn.addEventListener('click', function() {
  if (select.innerText === 'Выбрать страну' || select.innerText === 'Все страны') {
    let newCount = Math.floor(Math.random()*quotes.length);
    quoteContent.innerHTML = quotes[newCount].quoteText;
    quoteAuthor.innerHTML = quotes[newCount].quoteAuthor;
  } else {
    let countries = quotes.filter(item => item.quoteCountry === select.innerText);
    let newCountryCount = Math.floor(Math.random()*countries.length);
    quoteContent.innerHTML = countries[newCountryCount].quoteText;
    quoteAuthor.innerHTML = countries[newCountryCount].quoteAuthor;
  }
});

// Управление select
let select = document.querySelector('.select-body');
let dropDown = document.querySelector('.select-options');
let hiddenInput = document.querySelector('.select-body-hidden');

select.addEventListener('click', function(e){
  e.stopPropagation();
  dropDown.classList.toggle('active');
  select.classList.toggle('active');
});

// Создание списка уникальных стран
let uniqueCountries = new Set();
quotes.forEach(n => {
  uniqueCountries.add(n.quoteCountry);
})

// Функция, которая создаст опции выпадающего селекта
function createOption(name, element, parrent) { 
  let createDiv = document.createElement('div');
  createDiv.className = name;
  createDiv.innerText = element;
  parrent.appendChild(createDiv);
}

// Создаём все варианты стран при загрузке страницы
window.onload = function(){
  uniqueCountries.forEach(x => {
    createOption('option', x, dropDown);
  })
}
  // Присваиваем значение выбранной опции в селект
let options = document.querySelectorAll('.option');
dropDown.addEventListener('click', function(e){
  select.innerText = e.target.innerText;
  select.classList.remove('active');
  dropDown.classList.remove('active');
})

// Закрываем селект при клике не по нему
document.addEventListener('click', function(e){
  if(e.target !== document.querySelector('.select')) {
    dropDown.classList.remove('active');
    select.classList.remove('active');
  }
})

// Добавление новой цитаты
let addQuote = document.querySelector('.add-btn');
let newQuote = document.getElementById('new-quote');
let newAuthor = document.getElementById('new-author');
let newCountry = document.getElementById('new-country');
let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.add');
let closePopup = document.querySelector('.close-popup');

openPopup.addEventListener('click', function(e) {
  e.preventDefault();
  popup.classList.add('active');
})
closePopup.addEventListener('click', function(e) {
  e.preventDefault();
  popup.classList.remove('active');
})


addQuote.addEventListener('click', function(){
  if (newQuote.value === "" || newAuthor.value ==="" || newCountry.value === "") {
    alert('Заполните все обязательные поля')
  } else {
    let newQuoteFromForm = {
      quoteText: newQuote.value,
      quoteAuthor: newAuthor.value,
      quoteCountry: newCountry.value,
    }
    let uniqueCountriesArray = Array.from(uniqueCountries);
    if (uniqueCountriesArray.includes(newCountry.value) === false) {
      createOption('option', newCountry.value, dropDown);
      uniqueCountries.add(newQuoteFromForm.quoteCountry);
    }
    quotes.push(newQuoteFromForm);
    newQuote.value === "";
    newAuthor.value === "";
    newCountry.value === "";
    addQuote.innerHTML = "Цитата добавлена";
    popup.classList.remove('active');
  }
})

