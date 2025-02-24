// HTML structure for the calculator
const calculatorHTML = `
<div class="calculator">
    <input type="text" class="display" id="display" disabled>
    <div class="buttons">
        <button class="function" onclick="clearDisplay()">CE</button>
        <button class="spacer"></button>
        <button class="spacer"></button>
        <button class="operator" onclick="appendOperator('/')" style="background-color: #666666;">÷</button>
        
        <button onclick="appendNumber('7')">7</button>
        <button onclick="appendNumber('8')">8</button>
        <button onclick="appendNumber('9')">9</button>
        <button class="operator" onclick="appendOperator('*')">×</button>
        
        <button onclick="appendNumber('4')">4</button>
        <button onclick="appendNumber('5')">5</button>
        <button onclick="appendNumber('6')">6</button>
        <button class="operator" onclick="appendOperator('-')">-</button>
        
        <button onclick="appendNumber('1')">1</button>
        <button onclick="appendNumber('2')">2</button>
        <button onclick="appendNumber('3')">3</button>
        <button class="operator" onclick="appendOperator('+')">+</button>
        
        <button onclick="appendNumber('0')" style="grid-column: span 2;">0</button>
        <button onclick="appendNumber('.')">.</button>
        <button class="operator" onclick="calculate()">=</button>
    </div>
</div>

<style>
.calculator {
    width: 280px;
    padding: 20px;
    border-radius: 15px;
    background-color: #e0e0e0;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    border: 1px solid #ccc;
}

.display {
    width: 90%;
    height: 60px;
    margin-bottom: 20px;
    padding: 5px 15px;
    font-size: 30px;
    text-align: right;
    background-color: #c8d9a9;
    border: none;
    border-radius: 5px;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
    font-family: 'Digital', monospace;
    letter-spacing: 2px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    padding: 5px;
}

button {
    padding: 15px;
    font-size: 24px;
    border: none;
    border-radius: 8px;
    background-color: #808080;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

button:hover {
    background-color: #707070;
}

button.function {
    background-color: #ff9933;
}

button.function:hover {
    background-color: #ff8811;
}

button.operator {
    background-color: #666666;
}

button.operator:hover {
    background-color: #555555;
}

.spacer {
    visibility: hidden;
    pointer-events: none;
}

.operator {
    margin-left: 8px;  /* Add some extra space before operators */
}

@font-face {
    font-family: 'Digital';
    src: url('//db.onlinewebfonts.com/c/8e22783d707ad140bffe18b2a3812529?family=Digital-7');
}
</style>
`;

// Add calculator to the document
document.body.innerHTML = calculatorHTML;

let currentInput = '';
let previousInput = '';
let operation = null;

    // Function to update display
    function updateDisplay() {
        document.getElementById('display').value = currentInput || '0';
    }

    // Function to append numbers
    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        updateDisplay();
    }

    // Function to append operators
    function appendOperator(op) {
        if (currentInput === '') return;
        
        if (previousInput !== '') {
            calculate();
        }
        
        previousInput = currentInput;
        currentInput = '';
        operation = op;
    }

    // Function to clear display
    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Function to calculate result
    function calculate() {
        if (previousInput === '' || currentInput === '') return;
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch(operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    clearDisplay();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Initialize display
    updateDisplay();
