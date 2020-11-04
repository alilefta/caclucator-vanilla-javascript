
const result = document.querySelector('.resultFormula');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const cross = document.querySelector('.cross');
const divide = document.querySelector('.divide');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const zero = document.querySelector('.zero');
const dot = document.querySelector('.dot');
const clearBtn = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const calcForm = document.querySelector('.calculateFormula')

let numbers = [dot, zero, one, two, three, four, five, six, seven, eight, nine];
let leftOperand = '';
let rightOperand = '';
let formula = [];
let operand = '';
let operator = false;

let operations = {
	'+': function(x, y){
		if(formula[0] == '-'){
			return -x + y;
		}else{
			return x + y;
		}
	},
	'-': function(x, y){
		if(formula[0] == '-'){
			return -x - y;
		}else{
			return x - y;
		}
	},
	'/': function(x, y){return x / y},
	'*': function(x, y){return x * y}
}

numbers.forEach((num)=> num.addEventListener('click', (e)=>{
	formula.push(e.target.innerText);
	if(formula[0] === '-' || formula[0] === '+'){
		leftOperand += e.target.innerText;
	}
	else if(operator){
		rightOperand += e.target.innerText;
	}
	else{
		leftOperand += e.target.innerText;
	}
	view();
}))



plus.addEventListener('click', e=>{
	formula.push(e.target.innerText);
	operand = '+';
	if(formula[0] === '+'){
		operator = false;
	}else{
		operator = true;
	}
})

minus.addEventListener('click', e=>{
	formula.push(e.target.innerText);
	operand = '-';
	if(formula[0] === '-'){
		operator = false;
	}else{
		operator = true;
	}
})

divide.addEventListener('click', e=>{
	formula.push(e.target.innerText);
	operand = '/';
	operator = true;
})

cross.addEventListener('click', e=>{
	formula.push(e.target.innerText);
	operand = '*';
	operator = true;
})




equal.addEventListener('click', e=>{
	result.innerText = 0;
	if(leftOperand !== '' && rightOperand !== ''){
		calculate(leftOperand, rightOperand);
	}else{
		result.innerText = 0;
		leftOperand = '';
		rightOperand = '';
		operand = '';
		operator = false;
		formula = [];
	}
});



// Clear
clearBtn.addEventListener('click', e=>{
	formula = [];
	operator = false;
	leftOperand = '';
	rightOperand = '';
	result.innerText = 0;
})

// Show Results
function view(){
	let x = new String();
	for (let i of formula){
		x += i;
	}
	calcForm.innerText = x;
	return result.innerText = 0;
}


function calculate(leftPart, rightPart){
	const calculateResult = operations[operand](Number(leftPart), Number(rightPart));
	if(leftPart && rightPart){
		result.textContent = '';
		result.textContent = calculateResult;
	}
	formula = [];
	operator = false;
	leftOperand = '';
	operand = '';
	rightOperand = '';
}
