import {
  fetchFirstLoadMovies,
  fetchInputMovieTitle,
  inputFormButton,
  inputFormTitle,
  renderMoviesFirstLoad,
  renderMoviesInputTitle,
} from './js/fetchData';
import { addModalListenerFunction } from './js/modal';
import { createPagination } from './js/pagination';
import './sass/main.scss';

// Scenariusz 1: FIRST LOAD krok 3
// Nasłuchiwanie pierwszego załadowania strony lub przeładowania
window.addEventListener('load', async event => {
  event.preventDefault();
  try {
    const array = await fetchFirstLoadMovies(1);
    await renderMoviesFirstLoad(array.results);
    addModalListenerFunction();
    console.log(array);
    createPagination(array);
  } catch (error) {
    console.error(error);
  }
});

// Scenariusz 2: SEARCH MOVIE krok 3
// Nasłuchiwanie zdarzenia wpisania filmu w input
inputFormButton.addEventListener('click', async event => {
  document.querySelector('.styledSelect').innerHTML = 'Choose genre';
  event.preventDefault();
  const movieTitle = inputFormTitle.value.trim();
  try {
    if (movieTitle != '') {
      const array = await fetchInputMovieTitle(1, movieTitle);
      await renderMoviesInputTitle(array.results);
      addModalListenerFunction();
      console.log(array);
      createPagination(array, movieTitle);
    } else {
      const array = await fetchFirstLoadMovies(1);
      await renderMoviesFirstLoad(array.results);
      addModalListenerFunction();
      console.log(array);
      createPagination(array);
    }
  } catch (error) {
    console.error(error);
  }
});
