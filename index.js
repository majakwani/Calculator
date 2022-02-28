const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete');
const allClearButton = document.querySelector('[data-all-clear');
const equalsButtons = document.querySelector('[data-equals');
const previousOperandTextElement = document.querySelector('[data-previous-operand');
const currentOperandTextElement = document.querySelector('[data-current-operand');
var count = 0;
var operator;

let number1 = '', number2 = '';

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        if(count >= 16) return;
        if(button.innerHTML === '.' && number1.includes('.')) return;
        number1 += button.innerHTML;
        count++;
        currentOperandTextElement.innerHTML = `${number1}`;
    })
});


operatorButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        if(currentOperandTextElement.innerHTML !== ''){
            if(previousOperandTextElement.innerHTML == ''){
            operator = button.innerHTML;
            number2 = number1;
            number1 = '';
            count = 0;
            currentOperandTextElement.innerHTML = "";
            previousOperandTextElement.innerHTML = `${number2} ${operator}`;
            }
        
        else if(previousOperandTextElement!= ''){
            number1 = parseFloat(number1);
            number2 = parseFloat(number2);
            let result = compute(number2, number1, operator);
            result = Math.round(10*result)/10; 
            number1 = '';
            number2 = result;
            operator = button.innerHTML;
            previousOperandTextElement.innerHTML = `${result} ${operator}`;
            currentOperandTextElement.innerHTML = ""; 
}
        }
    });
});

equalsButtons.addEventListener('click', () =>{
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    let result = compute(number2, number1, operator);
    result = Math.round(10*result)/10; 
    result = result.toString();
    number1 = result;
    number2 = '';
    operator = '';
    currentOperandTextElement.innerHTML = `${number1}`;
    previousOperandTextElement.innerHTML = "";
})

function compute(firstNumber, SecondNumber, operation){
    switch(operation){
        case  '+':
            return firstNumber + SecondNumber;
            break;

        case '-':
            return firstNumber - SecondNumber;
            break;
        
        case '*':
            return firstNumber * SecondNumber;
            break;
        
        case '/':
            return firstNumber / SecondNumber;
            break;

        default:
            break;
    }
}

deleteButton.addEventListener('click', () =>{
    if(currentOperandTextElement.innerHTML !== ''){
        number1 = number1.slice(0, -1);
    currentOperandTextElement.innerHTML = `${number1}`;
    count--;
    }
});

allClearButton.addEventListener('click', () =>{
    count = 0;
    number1 = '';
    number2 = '';
    operator = '';
    currentOperandTextElement.innerHTML = ``;
    previousOperandTextElement.innerHTML = ``;
});
