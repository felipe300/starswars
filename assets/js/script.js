// https://www.digitalocean.com/community/tutorials/understanding-generators-in-javascript

// https://observablehq.com/@anjana/the-power-of-js-generators

// TIMELINE
// https://www.bootdey.com/snippets/view/timeline-events-area#preview
// https://freefrontend.com/bootstrap-timelines/
import Character from './classes/Character.js'

let stw1 = document.getElementById("stw1")
let list1 = document.getElementById("list1")
let stw2 = document.getElementById("stw2")
let list2 = document.getElementById("list2")
let stw3 = document.getElementById("stw3")
let list3 = document.getElementById("list3")
let uri = 'https://swapi.dev/api/people/'
let index1 = 1
let index2 = 6
let index3 = 11

function* generator1 () {
	while (index1 <= 5) {
		yield index1++
	}
}

function* generator2 () {
	while (index2 <= 5) {
		yield index2++
	}
}

function* generator3 () {
	while (index3 <= 5) {
		yield index3++
	}
}

const gen1 = generator1()
const gen2 = generator2()
const gen3 = generator3()

const getCharacters = async function (id = 1, idx = 0) {
	const response = await fetch(`${uri}/${id + idx}`)
	const json = await response.json()
	return json
}

const printCharacter = (character) => {
	let acc = ''
	let { name, height, mass } = character
	acc += `
	<div
		class="single-timeline-content d-flex justify-content-center align-items-center wow fadeInLeft 2021 row">
		<div class="d-flex justify-content-center align-items-baseline gap-2">
			<h6>${name}</h6>
			<p>Altura: <span id="heigth">${height}</span>cm.</p>
			<p>Peso: <span id="mass">${mass}</span>kg.</p>
		</div>
	</div>`
	return acc
}

stw1.addEventListener("click", (e) => {
	e.preventDefault()
	let id = gen1.next().value
	getCharacters(id, 0).then(response => {
		let character = new Character(response.name, response.height, response.mass)
		list1.innerHTML += printCharacter(character)
	})
	if (index1 === 6) {
		stw1.style.pointerEvents = "none"
	}
})

stw2.addEventListener("click", (e) => {
	e.preventDefault()
	let id = gen2.next().value
	getCharacters(id, 5).then(response => {
		let character = new Character(response.name, response.height, response.mass)
		list2.innerHTML += printCharacter(character)
	})
	if (index2 === 11) {
		stw2.style.pointerEvents = "none"
	}
})

stw3.addEventListener("click", (e) => {
	e.preventDefault()
	let id = gen3.next().value
	getCharacters(id, 11).then(response => {
		let character = new Character(response.name, response.height, response.mass)
		list3.innerHTML += printCharacter(character)
	})
	if (index3 === 16) {
		stw3.style.pointerEvents = "none"
	}
})
