	let startWidth = 105;
	let endWidth = 250;
	document.getElementById('searchButton').addEventListener('click', function() {
	var searchInput = document.getElementById('searchInput');
	var img = this.querySelector('img');
	if (searchInput.classList.contains('show'))
	{
		searchInput.classList.remove('show');
		this.style.width = `${startWidth}px`;
		const spanText = this.querySelector('span');
		spanText.innerHTML = '';
		spanText.appendChild(img);
		spanText.appendChild(document.createTextNode('Поиск'));
	}
	else
	{
		searchInput.classList.add('show');
		searchInput.focus();
		this.style.width = `${endWidth}px`;
		const spanText = this.querySelector('span');
		spanText.innerHTML = '';
		spanText.appendChild(img);
	}
});

let currentIndex = 0;
let shiftAmount = 0;
const images = document.querySelectorAll('.image');
const nextButton = document.querySelectorAll('.arrow-transition')[0];
const prevButton = document.querySelectorAll('.arrow-transition')[1];
function updateImages() {
	images.forEach((img, index) => {
		img.classList.remove('active', 'blured', 'blured-opacity');
		if (index === currentIndex) {
			img.classList.add('active');
		} else if (index === currentIndex - 1 || index === currentIndex + 1) {
			img.classList.add('blured');
		} else if (index <= currentIndex - 2 || index >= currentIndex + 2) {
			img.classList.add('blured-opacity');
		}
	});
	const box = document.getElementById('gallary');
	const shiftAmount = -currentIndex * 263;
	box.style.transform = `translateX(${shiftAmount}px)`;
}
prevButton.addEventListener('click', () => {
	currentIndex = (currentIndex + 1) % images.length;
	updateImages();
});
nextButton.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + images.length) % images.length;
	updateImages();
});
updateImages();

let currentOffset = 0;
let increment = 310;
let maxOffset = 0;
let ratioResolution = 1;
const prevButtonGenres = document.querySelectorAll('.arrow-genres-transition')[0];
const nextButtonGenres = document.querySelectorAll('.arrow-genres-transition')[1];
const genres = document.querySelectorAll('.genres-list');
nextButtonGenres.addEventListener('click', () => {
	const box = document.getElementById('genres');
	maxOffset = -increment * ratioResolution * 2;
	if (currentOffset > maxOffset)
	{
		currentOffset -= increment;
		box.style.transform = `translateX(${currentOffset}px)`;
	}
});
prevButtonGenres.addEventListener('click', () => {
	const box = document.getElementById('genres');
	if (currentOffset < 0)
	{
		currentOffset += increment;
		box.style.transform = `translateX(${currentOffset}px)`;
	}
});

var button = document.getElementById('searchButton');
const mediaQuery1024 = window.matchMedia('(max-width: 1024px)');
const mediaQuery768 = window.matchMedia('(max-width: 768px)');
const mediaQuery430 = window.matchMedia('(max-width: 430px)');
function handleMedia(x1024, x768, x430) {
	ratioResolution = 1440 / 1024;
	if (x430.matches)
	{
		let width = parseFloat(getComputedStyle(searchInput).width);
		searchInput.style.width = `${width * 0.9}px`;
		endWidth = endWidth * 0.9;
		ratioResolution = 3;
		increment = increment * 1140 / 654 * 0.5;
		return;
	}
	if (x768.matches)
	{
		let width = parseFloat(getComputedStyle(searchInput).width);
		searchInput.style.width = `${width * 0.9}px`;
		endWidth = endWidth * 0.9;
		increment = increment * 1140 / 824;
		return;
	}
	if (x1024.matches)
	{
		increment = increment * 1140 / 1024;
		return;
	}
	ratioResolution = 1;
	searchInput.style.width = '180px';
	endWidth = 250;
}
handleMedia(mediaQuery1024, mediaQuery768, mediaQuery430);

mediaQuery1024.addListener(handleMedia);
mediaQuery768.addListener(handleMedia);
mediaQuery430.addListener(handleMedia);