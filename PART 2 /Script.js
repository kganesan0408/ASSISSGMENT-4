const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const images = [
  { file: 'pic1.jpg', alt: 'Bugs Bunny' },
  { file: 'pic2.jpg', alt: 'Donald Duck ' },
  { file: 'pic3.jpg', alt: 'looneytunes sparrow' },
  { file: 'pic4.jpg', alt: 'looneytunesdogs' },
  { file: 'pic5.jpg', alt: 'twetty' }
];

images.forEach(img => {
  const newImg = document.createElement('img');
  newImg.src = 'images/' + img.file;
  newImg.alt = img.alt;
  thumbBar.appendChild(newImg);

  newImg.addEventListener('click', () => {
    displayedImage.src = newImg.src;
    displayedImage.alt = newImg.alt;
  });
});

btn.addEventListener('click', () => {
  const dark = btn.className === 'dark';
  btn.className = dark ? 'light' : 'dark';
  btn.textContent = dark ? 'Lighten' : 'Darken';
  overlay.style.backgroundColor = dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)';
});
