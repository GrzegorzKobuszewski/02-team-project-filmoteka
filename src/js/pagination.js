import {
  fetchFirstLoadMovies,
  fetchInputMovieTitle,
  fetchMoviesByGenre,
  renderMoviesFirstLoad,
  renderMoviesInputTitle,
} from './fetchData';
import { addModalListenerFunction } from './modal';
const paginationContainer = document.querySelector('.pagination-container');

const createPagination = ({ page, total_pages }, query = '', genre = '') => {
  if (total_pages > 500 && (query != '' || genre != '')) total_pages = 500;
  paginationContainer.innerHTML = '';
  //Creating main helper elements.
  const mainDiv = document.createElement('div');
  const first = document.createElement('a');
  const previous = document.createElement('a');
  const next = document.createElement('a');
  const last = document.createElement('a');
  const threeDots1 = document.createElement('a');
  const threeDots2 = document.createElement('a');
  mainDiv.classList.add('pagination');
  first.innerHTML = '&laquo;';
  previous.innerHTML = '&lt;';
  next.innerHTML = '&gt;';
  last.innerHTML = '&raquo;';
  threeDots1.innerHTML = '...';
  threeDots2.innerHTML = '...';
  threeDots1.ariaDisabled = true;
  threeDots2.ariaDisabled = true;

  if (query != '') {
    first.addEventListener('click', () => {
      createLinkInputMovie(1, query);
    });
    last.addEventListener('click', () => {
      createLinkInputMovie(total_pages, query);
    });
    if (page > 1) {
      previous.addEventListener('click', () => {
        createLinkInputMovie(page - 1, query);
      });
    } else {
      previous.ariaDisabled = true;
      first.ariaDisabled = true;
    }
    if (page < total_pages) {
      next.addEventListener('click', () => {
        createLinkInputMovie(page + 1, query);
      });
    } else {
      next.ariaDisabled = true;
      last.ariaDisabled = true;
    }
  } else if (genre != '') {
    first.addEventListener('click', () => {
      createLinkGenreMovie(1, genre);
    });
    last.addEventListener('click', () => {
      createLinkGenreMovie(total_pages, genre);
    });
    if (page > 1) {
      previous.addEventListener('click', () => {
        createLinkGenreMovie(page - 1, genre);
      });
    } else {
      previous.ariaDisabled = true;
      first.ariaDisabled = true;
    }
    if (page < total_pages) {
      next.addEventListener('click', () => {
        createLinkGenreMovie(page + 1, genre);
      });
    } else {
      next.ariaDisabled = true;
      last.ariaDisabled = true;
    }
  } else {
    first.addEventListener('click', () => {
      createLinkAllMovies(1);
    });
    last.addEventListener('click', () => {
      createLinkAllMovies(total_pages);
    });
    if (page > 1) {
      previous.addEventListener('click', () => {
        createLinkAllMovies(page - 1);
      });
    } else {
      previous.ariaDisabled = true;
      first.ariaDisabled = true;
    }
    if (page < total_pages) {
      next.addEventListener('click', () => {
        createLinkAllMovies(page + 1);
      });
    } else {
      next.ariaDisabled = true;
      last.ariaDisabled = true;
    }
  }

  // Adding the middle pages part.
  if (total_pages == 1) {
    return;
  } else if (total_pages > 1 && total_pages < 6) {
    mainDiv.appendChild(first);
    mainDiv.appendChild(previous);
    generateMainPagesButtons(page, total_pages, query, mainDiv, genre);
    mainDiv.appendChild(next);
    mainDiv.appendChild(last);
  } else {
    mainDiv.appendChild(first);
    mainDiv.appendChild(previous);
    if (page > 3) {
      mainDiv.appendChild(threeDots1);
    }
    generateMainPagesButtons(page, total_pages, query, mainDiv, genre);
    if (page + 2 < total_pages) {
      mainDiv.appendChild(threeDots2);
    }
    mainDiv.appendChild(next);
    mainDiv.appendChild(last);
  }
  paginationContainer.appendChild(mainDiv);
};

//Function for creating main anchor tags for pages with listeners
const generateMainPagesButtons = (page, total_pages, query, mainDiv, genre) => {
  let tempPage = page;
  if (page == 2) tempPage = page - 1;
  if (page == 3) tempPage = page - 2;
  if (page == 4) tempPage = page - 3;
  if (page == 5) tempPage = page - 4;
  if (total_pages < 6) {
    for (let index = tempPage; index <= total_pages; index++) {
      let pageAnchor = document.createElement('a');
      pageAnchor.innerHTML = index;
      if (page == index) {
        pageAnchor.classList.add('active');
      }
      if (query != '') {
        pageAnchor.addEventListener('click', () => {
          createLinkInputMovie(index, query);
        });
      } else if (genre != '') {
        pageAnchor.addEventListener('click', () => {
          createLinkGenreMovie(index, genre);
        });
      } else {
        pageAnchor.addEventListener('click', () => {
          createLinkAllMovies(index);
        });
      }
      mainDiv.appendChild(pageAnchor);
    }
  } else {
    let testPage = page - 2;
    let testLastPage = page + 2;

    //Testing for cases at the beginning.
    if (page == 2) {
      testPage = page - 1;
      testLastPage = page + 3;
    } else if (page == 1) {
      testPage = page;
      testLastPage = page + 4;
    }

    //Testing for cases at the end.
    if (page + 1 == total_pages) {
      testLastPage = page + 1;
      testPage = page - 3;
    } else if (page == total_pages) {
      testLastPage = page;
      testPage = page - 4;
    }

    for (let index = testPage; index <= testLastPage; index++) {
      let pageAnchor = document.createElement('a');
      pageAnchor.innerHTML = index;
      if (page == index) {
        pageAnchor.classList.add('active');
      }
      if (query != '') {
        pageAnchor.addEventListener('click', () => {
          createLinkInputMovie(index, query);
        });
      } else if (genre != '') {
        pageAnchor.addEventListener('click', () => {
          createLinkGenreMovie(index, genre);
        });
      } else {
        pageAnchor.addEventListener('click', () => {
          createLinkAllMovies(index);
        });
      }
      mainDiv.appendChild(pageAnchor);
    }
  }
};

const createLinkAllMovies = async page => {
  let data = await fetchFirstLoadMovies(page);
  data.results = data.results.filter(movie => !('gender' in movie));
  await renderMoviesFirstLoad(data.results);
  addModalListenerFunction();
  createPagination(data);
};
const createLinkInputMovie = async (page, query) => {
  let data = await fetchInputMovieTitle(page, query);
  data.results = data.results.filter(movie => !('gender' in movie));
  await renderMoviesInputTitle(data.results);
  addModalListenerFunction();
  createPagination(data, query);
};
const createLinkGenreMovie = async (page, genre) => {
  let data = await fetchMoviesByGenre(page, genre);
  data.results = data.results.filter(movie => !('gender' in movie));
  await renderMoviesInputTitle(data.results);
  addModalListenerFunction();
  createPagination(data, '', genre);
};

export { createPagination };
