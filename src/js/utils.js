const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const addToLibrary = (movieId, type, listType = 'watchedList') => {
  const libraryList = load(listType);
  if (libraryList == undefined) {
    let tempWatchedList = [];
    tempWatchedList.push({
      movieId,
      type,
    });
    return save(listType, tempWatchedList);
  }

  let alreadyInList = false;
  libraryList.forEach(movie => {
    if (movie.movieId == movieId && movie.type === type) {
      alreadyInList = true;
    }
  });

  if (alreadyInList) return alert('Movie already on the list.');

  libraryList.push({
    movieId,
    type,
  });
  return save(listType, libraryList);
};

const removeFromLibrary = (movieId, type, listType = 'watchedList') => {
  let libraryList = load(listType);

  libraryList = libraryList.filter(movie => {
    if (movie.movieId != movieId) {
      return movie;
    }
  });

  return save(listType, libraryList);
};

export { save, load, remove, addToLibrary, removeFromLibrary };
