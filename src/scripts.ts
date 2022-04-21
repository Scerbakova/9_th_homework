const container = document.querySelector<HTMLDivElement>(".container")
const navMenu = document.querySelector<HTMLElement>(".navigation")
const watch = document.querySelector<HTMLButtonElement>(".watch")
const slider = document.querySelector<HTMLDivElement>(".slider")
const image = document.querySelector<HTMLImageElement>(".destination")
const buttonLeft = document.querySelector<HTMLButtonElement>(".left")
const buttonRight = document.querySelector<HTMLButtonElement>(".right")
const input = document.querySelector<HTMLInputElement>(".input")
const footer = document.querySelector<HTMLElement>(".footer");
const buttonSubscribe = document.querySelector<HTMLButtonElement>(".subscribe")
const list = document.querySelector<HTMLUListElement>(".list")
const form = document.querySelector<HTMLFormElement>(".form")
const regx = /\S+@\S+\.lv/

const navigation = ["Home", "Events", "About", "Blog", "Contact"];

navigation.forEach((item) => {
	let aHref = document.createElement("a");
	aHref.innerText = item;
	aHref.href = "#"
	navMenu.appendChild(aHref);
})

watch.addEventListener('click', () => {
	const toast = document.createElement("div");
	toast.innerHTML = "This is a toast for info";
	toast.classList.add("toast");
	container.appendChild(toast);
	watch.disabled = true;
	setTimeout(() => { toast.className = toast.className.replace("toast", "hidden"), watch.disabled = false; }, 5000);
});

let offset = 0;
buttonLeft.addEventListener("click", () => {
	offset -= 590;
	if (offset < 0) {
		offset = (590 * 2);
	}
	slider.style.left = -offset + "px";
});
buttonRight.addEventListener("click", () => {
	offset += 590;
	if (offset > (590 * 2)) {
		offset = 0;
	}
	slider.style.left = -offset + "px";
});

let i = 0
const possibleColors = ["#7c5b61", "#63745c", "#839462", "#8180b4", "#b25a59"];
input.addEventListener("input", () => {
	const changeColor = () => {
		footer.style.backgroundColor = possibleColors[i];
		i = (i + 1) % possibleColors.length
	}; changeColor()
});

form.addEventListener("submit", (ev: Event) => {
	ev.preventDefault();
});


const inputAlert = () => {
	const error = document.createElement("div")
	error.innerText = "Wrong email format"
	list.appendChild(error);
	buttonSubscribe.disabled = true;
	input.addEventListener("input", () => {
		error.remove();
		buttonSubscribe.disabled = false;
	})
}

buttonSubscribe.addEventListener("click", () => {
	const makeEntry = () => {
		const listItem = document.createElement("li");
		listItem.classList.add("li")
		listItem.innerText = input.value;
		input.value = "";
		list.appendChild(listItem);

		input.addEventListener("keypress", ({ key }) => {
			key === "Enter"
			if (listItem.innerHTML === input.value && listItem.innerHTML !== "") {
				alert("This email already exists");
				input.value = "";
			}
		});
	};
	
	if (input.value.match(regx)) {
		makeEntry();
	} else if (input.value.length < 3 || input.value.length > 20) {
		inputAlert();
	} else {
		inputAlert();
	}; 
}); input.focus();

const inputPlaceholder = input.placeholder
input.addEventListener("focus", () => {
	input.placeholder = "";
})
input.addEventListener("blur", () => {
	input.placeholder = inputPlaceholder;
})