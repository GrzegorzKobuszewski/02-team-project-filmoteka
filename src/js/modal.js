import { fetchMovieById, galleryOfMovies, noPosterImage } from './fetchData';
import { getAllLibraryMovies } from './libraryHelper';
import { addToLibrary, load, removeFromLibrary } from './utils';
const modalElement = document.querySelector('[data-modal]');
const closeBtn = require('../images/svg/symbol-defs.svg');

document.addEventListener('click', event => {
  if (event.target.matches('[data-modal-close]') || !event.target.closest('.modal')) {
    modalElement.classList.add('is-hidden');
  }
});
document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    modalElement.classList.add('is-hidden');
  }
});

const addModalListenerFunction = () => {
  let liElements = document.querySelectorAll('.movie-card');
  liElements.forEach(element => {
    element.addEventListener('click', () => {
      getMovieAndDisplayModal(element.dataset.id, element.dataset.type);
    });
  });
};

const getMovieAndDisplayModal = async (id, type) => {
  const movieDetails = await fetchMovieById(id, type);
  console.log(movieDetails);
  let onWatched = false;
  let onQueue = false;
  load('watchedList')?.forEach(movie => {
    if (movie.movieId == id && movie.type === type) {
      onWatched = true;
    }
  });
  load('queueList')?.forEach(movie => {
    if (movie.movieId == id && movie.type === type) {
      onQueue = true;
    }
  });
  modalElement.classList.remove('is-hidden');

  let modalHTML = `
  <div class="modal">
      <ul class="modal__pic">
          <li class="pic">
              <picture>
                  <source
                      src="${
                        movieDetails.poster_path
                          ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
                          : noPosterImage
                      }"
                      srcset="${
                        movieDetails.poster_path
                          ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
                          : noPosterImage
                      } 2x"
                      media="(min-width:320px) and (max-width:767px)"/>
                  <source
                      src="${
                        movieDetails.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                          : noPosterImage
                      }"
                      srcset="${
                        movieDetails.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                          : noPosterImage
                      } 2x"
                      media="(min-width:768px) and (max-width:1023px)"/>
                  <source
                      src="${
                        movieDetails.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                          : noPosterImage
                      }"
                      srcset="${
                        movieDetails.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                          : noPosterImage
                      } 2x"
                      media="(min-width:1024px)"/>
                  <img src="${
                    movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                      : noPosterImage
                  }" 
                      alt="A FISTFUL OF LEAD"
                  />
              </picture>
          </li>

          <button class="modal__close-btn" type="button">
              <svg class="modal__close-icon" viewBox="-3 -3 60 55" data-modal-close>
              <use xlink:href="${closeBtn}#icon-close"></use>
              </svg>
          </button>
        
        <ul class="modal__description">
            <ul class="description__list">
                <li class="description__film">${
                  movieDetails.title === undefined ? movieDetails.name : movieDetails.title
                }</li>
                    <ul class="description__vote">
                        <li class="vote__text">Vote / Votes</li>
                        <li class="vote__value"><span class="vote__mark">${movieDetails.vote_average.toFixed(
                          1,
                        )}</span> / <span class="votes__mark">${movieDetails.vote_count}
                        </span></li>
                    </ul>
                    <ul class="description__popularity">
                        <li class="popularity__text">Popularity</li>
                        <li class="popularity__value">${movieDetails.popularity.toFixed(1)}</li>
                    </ul>
                    <ul class="description__title">
                        <li class="title__text">Original Title</li>
                        <li class="title__value">${
                          movieDetails.original_title === undefined
                            ? movieDetails.original_name
                            : movieDetails.original_title
                        }</li>
                    </ul>
                    <ul class="description__genre">
                        <li class="genre__text">Genre</li>
                        <li class="genre__value">${[
                          ...movieDetails.genres.map(genre => genre.name),
                        ].join(', ')}</li>
                    </ul>
                <li class="description__header">ABOUT</li>
                <li class="description__text">${movieDetails.overview}</li>
                <ul class="description__btn">
                    <li><button class="watched-btn">ADD TO WATCHED</button></li>
                    <li><button class="queue-btn">ADD TO QUEUE</button></li>
                    <li></li>
                </ul>
            </ul>
        </ul>
  </div>`;
  modalElement.innerHTML = modalHTML;
  let watchedBtn = document.querySelector('.watched-btn');
  let queueBtn = document.querySelector('.queue-btn');

  if (onWatched) {
    watchedBtn.innerHTML = 'On List';
  }
  if (onQueue) {
    queueBtn.innerHTML = 'On List';
  }

  const checkIfOnList = (button, listType, listTypeText) => {
    let watched;
    if (listTypeText == undefined) return;
    if (listTypeText === 'watched') {
      watched = onWatched;
    } else if (listTypeText === 'queue') {
      watched = onQueue;
    }
    if (watched) {
      removeFromLibrary(id, type, listType);
      button.innerHTML = `Add to ${listTypeText}`;
    } else {
      addToLibrary(id, type, listType);
      button.innerHTML = `Added`;
    }
    if (listTypeText === 'watched') {
      onWatched = !onWatched;
    } else if (listTypeText === 'queue') {
      onQueue = !onQueue;
    }
  };

  watchedBtn.addEventListener('click', () => {
    checkIfOnList(watchedBtn, 'watchedList', 'watched');
    if (
      document.location.href.includes('library') &&
      galleryOfMovies.dataset.listtype === 'watched'
    ) {
      let tempLibraryList = load('watchedList');
      getAllLibraryMovies(tempLibraryList, 'watchedList');
    }
  });
  queueBtn.addEventListener('click', () => {
    checkIfOnList(queueBtn, 'queueList', 'queue');
    if (
      document.location.href.includes('library') &&
      galleryOfMovies.dataset.listtype === 'queue'
    ) {
      let tempLibraryList = load('queueList');
      getAllLibraryMovies(tempLibraryList, 'queueList');
    }
  });
};

export { getMovieAndDisplayModal, addModalListenerFunction };
