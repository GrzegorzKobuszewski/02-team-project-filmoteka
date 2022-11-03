import {
  fetchFirstLoadMovies,
  fetchMoviesByGenre,
  renderMoviesFirstLoad,
  renderMoviesInputTitle,
} from './fetchData';
import genresData from './genres.json';
import { addModalListenerFunction } from './modal';
import { createPagination } from './pagination';

const handleGenreListClick = selectDivText => {
  document.querySelector('.search-form__input').value = '';
  let selectedGenreId;
  let selectedGenreIdNotFound = false;
  genresData.forEach(genre => {
    if (genre.name === selectDivText) {
      selectedGenreId = genre.id;
    }
  });
  if (selectedGenreId == undefined) selectedGenreIdNotFound = true;
  getAllMoviesByGenre(selectedGenreId, 1, selectedGenreIdNotFound);
};

const getAllMoviesByGenre = async (genre, page, idNotFound) => {
  try {
    if (idNotFound) {
      const array = await fetchFirstLoadMovies(1);
      await renderMoviesFirstLoad(array.results);
      addModalListenerFunction();
      console.log(array);
      createPagination(array);
    } else {
      const data = await fetchMoviesByGenre(page, genre);
      await renderMoviesInputTitle(data.results);
      addModalListenerFunction();
      console.log(data);
      createPagination(data, '', genre);
    }
  } catch (error) {
    console.error(error);
  }
};

export { handleGenreListClick };
