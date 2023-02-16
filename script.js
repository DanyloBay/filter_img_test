const imagesInit = () => {
  const images = document.querySelectorAll('.article__image');
  if (images.length) {
    images.forEach(image => {
      const imageItem = image.querySelector('img');
      const padding = (imageItem.offsetHeight / imageItem.offsetWidth) * 100;
      image.style.paddingBottom = `${padding}%`;
      imageItem.classList.add('init');
    });
  }
};

const grid = () => {
  const items = document.querySelector('.articles__items');
  const itemsGrid = new Isotope(items, {
    itemSelector: '.article',
    masonry: {
      fitWidth: true,
      gutter: 20,
    },
  });

  document.addEventListener('click', documentActions);

  function documentActions(e) {
    const targetEL = e.target;
    if (targetEL.closest('.filter-articles__item')) {
      const filteredItems = targetEL.closest('.filter-articles__item');
      const filterValue = filteredItems.dataset.filter;
      const filterActive = document.querySelector(
        '.filter-articles__item.active'
      );

      filterValue === '*'
        ? itemsGrid.arrange({ filter: `` })
        : itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` });

      filterActive.classList.remove('active');
      filteredItems.classList.add('active');

      e.preventDefault();
    }
  }
};

window.addEventListener('load', windowload);

function windowload() {
  imagesInit();
  grid();
}
