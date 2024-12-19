const displaySmall = document.getElementById('display-small');
const displayLarge = document.getElementById('display-large');

let firstOperand = '';
let operator = '';
let secondOperand = '';
let resetScreen = false;

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const value = button.textContent;

        if (!action) {
            appendNumber(value);
        } else {
            handleAction(action, value);
        }
    });
});

function appendNumber(number) {
    if (displayLarge.textContent === '0' || resetScreen) {
        resetDisplay();
    }
    displayLarge.textContent += number;
}

function resetDisplay() {
    displayLarge.textContent = '';
    resetScreen = false;
}

function handleAction(action, value) {
    switch (action) {
        case 'clear':
            clearCalculator();
            break;
        case 'toggle-sign':
            toggleSign();
            break;
        case 'percent':
            calculatePercentage();
            break;
        case 'decimal':
            addDecimal();
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            chooseOperator(value);
            break;
        case 'calculate':
            calculateResult();
            break;
    }
}

function clearCalculator() {
    displayLarge.textContent = '0';
    displaySmall.textContent = '';
    firstOperand = '';
    operator = '';
    secondOperand = '';
}

function toggleSign() {
    displayLarge.textContent = String(parseFloat(displayLarge.textContent) * -1);
}

function calculatePercentage() {
    displayLarge.textContent = String(parseFloat(displayLarge.textContent) / 100);
}

function addDecimal() {
    if (!displayLarge.textContent.includes('.')) {
        displayLarge.textContent += '.';
    }
}

function chooseOperator(selectedOperator) {
    if (operator) calculateResult();
    firstOperand = displayLarge.textContent;
    operator = selectedOperator;
    displaySmall.textContent = `${firstOperand} ${operator}`;
    resetScreen = true;
}

function calculateResult() {
    if (!operator || resetScreen) return;

    secondOperand = displayLarge.textContent;
    let result;

    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);

    switch (operator) {
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case '×':
            result = first * second;
            break;
        case '÷':
            result = second !== 0 ? first / second : 'Error';
            break;
        default:
            return;
    }

    displayLarge.textContent = result;
    displaySmall.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    operator = '';
    resetScreen = true;
}
