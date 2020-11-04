

class Calculator {
	constructor(previousNumberTxt, currentNumberTxt){
		this.previousNumberTxt = previousNumberTxt;
		this.currentNumberTxt = currentNumberTxt;
		this.clearResult();
	}
	clearResult(){
		this.previousOperand = '';
		this.currentOperand = '';
		this.operation = undefined;
	}

	addNumber(number){
		console.log(this.currentOperand)
		console.log(this.previousOperand)

		if(number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	compute(){
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if(isNaN(prev) || isNaN(current)) return;

		switch(this.operation){
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case 'x':
				computation = prev * current;
				break;
			case '÷':
				computation = prev / current;
				break;
			default:
				return
		}
		this.currentOperand = computation.toString();;
		this.operation = undefined;
		this.previousOperand = '';
	}

	chooseOperation(operation){
		if(this.currentOperand === '') return;
		if(this.previousOperand !== ''){
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}
	getDisplayNumber(number){
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];

		let integerDisplay;

		if(isNaN(integerDigits)){
			integerDisplay = '';
		}else{
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits:0
			});
		}
		if(decimalDigits != null){
			return `${integerDisplay}.${decimalDigits}`;

		} else{
			return integerDisplay;
		}
	}

	updateDisplay(){
		this.currentNumberTxt.innerText = this.getDisplayNumber(this.currentOperand);
		if(this.operation != null){
			this.previousNumberTxt.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		}else{
			this.previousNumberTxt.innerText = '';
		}
	}


}


const previousNumberTxtElement = document.querySelector('.previousNumber');
const currentNumberTxtElement = document.querySelector('.currentNumber');
const opeartionButtons = document.querySelectorAll('[data-operation]');
const clearAllButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');



const numbersButtons = document.querySelectorAll('[data-number]');



// Initiate Calculator Object
const calculator = new Calculator(previousNumberTxtElement, currentNumberTxtElement);




numbersButtons.forEach((num)=> num.addEventListener('click', (e)=>{
	calculator.addNumber(num.innerText);
	calculator.updateDisplay();
}));


opeartionButtons.forEach(btn=> {
	btn.addEventListener('click', ()=>{
		calculator.chooseOperation(btn.innerText);
		calculator.updateDisplay();
	})
});



equalButton.addEventListener('click', (e)=>{
	calculator.compute();
	calculator.updateDisplay();
});

clearAllButton.addEventListener('click', (e)=>{
	calculator.clearResult();
	calculator.updateDisplay();
});
