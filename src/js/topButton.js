const toTop = document.querySelector('.go-top-button');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 450) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});

toTop.addEventListener('click', scrollToTop);
function scrollToTop() {
  window.scrollTo(0, 0);
} 
