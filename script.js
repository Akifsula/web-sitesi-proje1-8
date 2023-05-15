const slider = document.querySelector('.memleketim-liste');
const sliderItems = document.querySelectorAll('.memleket-fotolar');
const arrowRight = document.querySelector('.arrow-right');


let activeIndex = 0;
let clickCount = 0;

arrowRight.addEventListener('click', () => {
  clickCount++;
  activeIndex++;
  if (activeIndex >= sliderItems.length) {
    activeIndex = 0;
  }
  slider.style.transition = 'transform 1.5s ease-in-out';
  slider.style.transform = `translateX(-${activeIndex * sliderItems[0].clientWidth}px)`;
  if (clickCount >= 5) {
    clickCount = 0;
    activeIndex = 0;
    slider.style.transition = 'transform 1.5s ease-in-out';
    slider.style.transform = `translateX(0)`;
  }
});




const accessKey = 'V6v6O8EN5NguWg5w2XvwnubMIg7JeS4ig1dVb9qC0pI';
const apiUrl = 'https://api.unsplash.com/';

// Unsplash API'den fotoğrafları alacak bir fonksiyon oluşturun
async function getPhotosFromUnsplash() {
  try {
    const response = await fetch(apiUrl + 'photos/random?client_id=' + accessKey + '&count=10'); // 10 adet rastgele fotoğraf almak için
    const data = await response.json();

    if (response.ok) {
      return data; // API'den alınan fotoğraf verilerini döndür
    } else {
      throw new Error('API Error');
    }
  } catch (error) {
    console.error(error);
  }
}

// createCards fonksiyonunu çağırarak card'ları oluşturun
async function createCards() {
  const cardsContainer = document.getElementById('cards-container');

  const photos = await getPhotosFromUnsplash();

  photos.forEach((photo) => {
    const card = document.createElement('div');
    card.className = 'card';

    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    cardImage.style.backgroundImage = `url(${photo.urls.regular})`;

    const cardHead = document.createElement('div');
    cardHead.className = 'card-head';

    const title = document.createElement('h5');
    title.innerText = 'togg';

    const description = document.createElement('p');
    description.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quibusdam recusandae.';

    cardHead.appendChild(title);
    cardHead.appendChild(description);

    card.appendChild(cardImage);
    card.appendChild(cardHead);

    card.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'modal';

      const modalImage = document.createElement('img');
      modalImage.src = photo.urls.regular;

      modal.appendChild(modalImage);
      document.body.appendChild(modal);
    });

    cardsContainer.appendChild(card);
  });
}

createCards();

