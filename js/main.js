'use strict';

const form = document.querySelector('#search-form');
const input = document.querySelector('[name=search-field]');
const body = document.querySelector('body');

const doFetch = async (input) => {
  try {
    const response = await fetch('http://api.tvmaze.com/search/shows?q=' + input);

    if (!response.ok) {
      throw new Error('something went wrong');
    }

    const data = await response.json();
    console.log(data);
    setContent(data);
  }
  catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(input.value);
  doFetch(input.value);
});

function setContent(data) {
  const articles = document.querySelectorAll('article');

  for (let i = 0; i < articles.length; i++) {
    body.removeChild(articles[i]);
  }

  for (let i = 0; i < data.length; i++) {
    const article = document.createElement('article');
    const name = document.createElement('h2');
    article.appendChild(name);
    const officialSite = document.createElement('a');
    article.appendChild(officialSite);
    const image = document.createElement('img');
    article.appendChild(image);
    const summary = document.createElement('p');
    article.appendChild(summary);
    const genres = document.createElement('p');
    article.appendChild(genres);
    body.appendChild(article);

    if (data[i].show.name == null) {
      name.textContent = 'Name not available';
    }
    else {
      name.textContent = data[i].show.name;
    }

    if (data[i].show.officialSite == null) {
      officialSite.textContent = 'Official site not available';
    }
    else {
      officialSite.href = data[i].show.officialSite;
      officialSite.textContent = 'Official site';
    }

    if (data[i].show.image == null) {
      image.src = 'img/no_image.png';
    }
    else {
      image.src = data[i].show.image.medium;
    }

    if (data[i].show.summary == null) {
      summary.textContent = 'Summary not available';
    }
    else {
      summary.outerHTML = data[i].show.summary;
    }

    let genresText = 'Genres: ';

    if (data[i].show.genres.length < 1) {
      genresText += 'Not available';
    }
    else {
      genresText += data[i].show.genres.join(', ');
    }

    genres.textContent = genresText;
  }
}