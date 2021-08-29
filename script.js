// ambil semua tombol pada kalkulator
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const allClearButton = document.querySelector('[data-all-clear]');

// ambil elemen displayNumber
const previousNumber = document.querySelector('.previous-number');
const currentNumber = document.querySelector('.current-number');

// inisiasi variabel kalkulator
const calculator = {
	previousNumber: '',
	currentNumber: '',
	operation: undefined
}

function clearAll() {
	calculator.previousNumber = '';
	calculator.currentNumber = '';
	calculator.operation = undefined;
}

function clear() {
	calculator.currentNumber = calculator.currentNumber.toString().slice(0, -1);
}

function appendNumber(number) {
	if (number === '.' && calculator.currentNumber.includes('.')) return
	calculator.currentNumber = calculator.currentNumber.toString() + number.toString();
}

function chooseOperation(operation) {
	if (calculator.currentNumber === '') return
	if (calculator.previousNumber !== '') {
		compute()
	}
	calculator.operation = operation;
	calculator.previousNumber = calculator.currentNumber;
	calculator.currentNumber = '';
}

function compute() {
	let count;
	const prev = parseFloat(calculator.previousNumber);
	const current = parseFloat(calculator.currentNumber);

	// jika previousNumber atau currentNumber bukan angka maka batalkan fungsi
	if (isNaN(prev) || isNaN(current)) return

	switch (calculator.operation) {
		case '+':
			count = prev + current
			break 
		case '-':
			count = prev - current
			break 
		case 'x':
			count = prev * current
			break 
		case '÷':
			count = prev / current
			break 
		default: 
			return
	}

	calculator.currentNumber = count;
	calculator.operation = undefined;
	calculator.previousNumber = '';
}

function updateDisplay() {
	currentNumber.innerText = calculator.currentNumber; 
	if (calculator.operation != null) {
		previousNumber.innerText = `${calculator.previousNumber} ${calculator.operation}`; 
	} else {
		previousNumber.innerText = '';
	}
}

numberButtons.forEach((button) => {
	button.addEventListener('click', function() {
		appendNumber(button.innerText);
		updateDisplay();
	})
})

operatorButtons.forEach((button) => {
	button.addEventListener('click', function() {
		chooseOperation(button.innerText);
		updateDisplay();
	})
})

equalButton.addEventListener('click', function(button) {
	compute();
	updateDisplay();
})

allClearButton.addEventListener('click', function(button) {
	clearAll();
	updateDisplay();
})

clearButton.addEventListener('click', function(button) {
	clear();
	updateDisplay();
})