const win = document.getElementById('win');
const score = document.getElementById('score');
const gameContainer = document.getElementById("game");
const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"blue",
	"green",
	"orange",
	"purple"
];
let click1 = null;
let click2 = null;
let total = 0;
let only2cards = false;
let result = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
	let counter = array.length;
	// while there are elements in the array
	while (counter > 0) {
		// pick a random index
		let index = Math.floor(Math.random() * counter);
		// decrease counter by 1
		counter--;
		// and swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement("div");
		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener("click", handleCardClick);
		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
// you can use event.target to see which element was clicked
function handleCardClick(e) {
	if (only2cards) { return; }
	if (e.target.classList.contains('clicked')) { return; }

	let card = e.target;
	card.style.backgroundColor = card.classList[0];
	card.classList.add('clicked');
	score.innerText = `Score: ${result += 1}`;

	if (!click1 || !click2) {
		click1 = click1 || card;
		click2 = card === click1 ? null : card;
	}
	if (click1 && click2) {
		only2cards = true;
		if (click1.className === click2.className) {
			click1.removeEventListener('click', handleCardClick);
			click2.removeEventListener('click', handleCardClick);
			click1 = null;
			click2 = null;
			total += 2;
			only2cards = false;
		} else {
			setTimeout(function () {
				click1.style.backgroundColor = '';
				click2.style.backgroundColor = '';
				click1.classList.remove('clicked');
				click2.classList.remove('clicked');
				click1 = null;
				click2 = null;
				only2cards = false;
			}, 500);
		}
	}
	if (total === COLORS.length) {
		win.innerText = 'YOU WIN!!!';
		win.style.color = 'green';
		score.style.color = 'red';
	}
}
// when the DOM loads
createDivsForColors(shuffledColors);
