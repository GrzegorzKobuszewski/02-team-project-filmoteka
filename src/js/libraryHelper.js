import { fetchMovieById, renderMoviesFirstLoad, galleryOfMovies } from './fetchData';
import { addModalListenerFunction } from './modal';

const getAllLibraryMovies = async (libraryList, listType) => {
  let moviesList = [];
  galleryOfMovies.innerHTML = '';
  listType === 'watchedList'
    ? galleryOfMovies.setAttribute('data-listtype', 'watched')
    : galleryOfMovies.setAttribute('data-listtype', 'queue');
  const tempObj = [];

  if (libraryList != undefined) {
    for (const movie of libraryList) {
      let response = await fetchMovieById(movie.movieId, movie.type).then(res => res);
      response = {
        ...response,
        genre_ids: [...response.genres.map(genre => genre.id)],
        media_type: movie.type,
      };
      tempObj.push(response);
    }
    moviesList = [...tempObj];
    await renderMoviesFirstLoad(moviesList);
    addModalListenerFunction();
  }
};

export { getAllLibraryMovies };
