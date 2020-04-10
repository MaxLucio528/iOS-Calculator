/*
 *  iOS-Calculator
 *  CONTRIBUITORS:
 *  -> Max Lucio Martins de Assis (GitHub - MaxLucio528)
 * 
 *  PURPOSE: This project is a simple page that has a iOS Calculator implemented with JavaScript, 
 *  inspired by a project from Brian Holt's Complete Intro to Web Development course, in which 
 *  the students are asked to make a iOS Calculator, this is my version of this project. It's
 *  compatible with (probably) any web browser.
 */

/* 
 * Situation of the program:
 * 0 - No number selected, waiting for a number to be selected.
 * 1 - A number was seleted, waiting for the user to select a operation.
 * 2 - Operation selected, waiting for the second number to be selected.
 * 3 - Second number selected, waiting for the result.
 */
let state = 0;
let sign = 1; // The sign of the first number (0 - Negative / 1 - Positive).
let num1; // First number selected.
let num2; // Second number selected.
let op = null; // Operation selected.
let result; // Result from the operation.

/**
 * Obtaining all the buttons of the calculator, also adding a event listener to know when a
 * button was clicked.
 */
const button = document.querySelector(".buttons-div").addEventListener("click", buttonPressed);
const display = document.querySelector(".result"); // Obtaining what's on the calculator display.

// This function handles user's clicks on the buttons.
function buttonPressed(event){
    // Stores the char inside the button, to know which button was clicked.
    let optionText = event.target.innerText;

    // Selects the right option.
    switch(optionText){
        // Clear button.
        case "C":
            // Resets the calculator.
            display.innerText = 0;
            state = 0;
            sign = 1;
            num1 = null;
            num2 = null;
            op = null;
        break;

        // Erase button.
        case "←":
            // Receiving the text on display minus one char.
            display.innerText = display.innerText.substring(0, (display.innerText.length - 1));
            
            // When the display is empty, a zero is put on display.
            if(display.innerText == "" || display.innerText == "-"){
                if(state == 0)
                    op = null;

                if(state == 1)
                    state = 0;

                if(state == 3)
                    state = 2;

                display.innerText = 0;
            }
        break;

        // Button zero.
        case "0":
            numberHandler(optionText);
        break;

        // Button one.
        case "1":
            numberHandler(optionText);
        break;

        // Button two.
        case "2":
            numberHandler(optionText);
        break;

        // Button three.
        case "3":
            numberHandler(optionText);
        break;

        // Button four.
        case "4":
            numberHandler(optionText);
        break;

        // Button five.
        case "5":
            numberHandler(optionText);
        break;

        // Button six.
        case "6":
            numberHandler(optionText);
        break;

        // Button seven.
        case "7":
            numberHandler(optionText);
        break;

        // Button eigth.
        case "8":
            numberHandler(optionText);
        break;

        // Button nine.
        case "9":
            numberHandler(optionText);
        break;

        // Divide button.
        case "÷":
            operationHandler(optionText);
        break;
        
        // Times button.
        case "×":
            operationHandler(optionText);
        break;

        // Subtract button.
        case "−":
            operationHandler(optionText);
        break;

        // Plus button.
        case "+":
            operationHandler(optionText);
        break;

        // Equals button.
        case "=":
            resultHandler();
        break;

        // When something goes wrong with the program.
        default:
            console.log("Oops! Something went wrong...");
    }
}

// This function handles the numbers on display.
function numberHandler(optionText){
    if(state === 0){
        if(optionText == 0) // Number on display is already zero, nothing to change.
            return;
        else{ // Changing the number on display, since it was previously zero.
            if(sign === 0) // Situation where the first number is negative.
                display.innerText = "-" + optionText;
            else
                display.innerText = optionText;

            state = 1;
        }
    }else{
        if(state == 1){ // Appending on the first number.
            display.innerText = display.innerText + optionText;
        }else if(state == 2){ // Changing the number on display, for the second number.
            display.innerText = optionText;
            state = 3;
        }else{ // Appending on the second number.
            display.innerText = display.innerText + optionText;
        }
    }
}

// This function handles the operation selected by the user.
function operationHandler(optionText){
    /*  When the state is 0 or 1, the program will get the number on display and continue
     *  the operation. */
    if(state < 2){
        // Storing the operation selected.
        op = optionText;

        // When the user wants the first number to be negative.
        if(state == 0 && op == "−"){
            // Inverting the number signal.
            sign = 0;

            return;
        }
        
        // Storing the first number selected.
        num1 = parseInt(display.innerText);
    
        // Changing the state to allow the user to select the second number.
        state = 2;
    }else if(state == 2){ // When the user changed his mind about which operation he wants to do.
        // Storing the operation selected.
        op = optionText;
    }
}

// This function handles the result generation.
function resultHandler(){
    // Operation without a previous result stored.
    if(state >= 2){
        // Storing the second number;
        num2 = parseInt(display.innerText);

        // Making the operation.
        if(op == "+")
            result = num1 + num2;
        else if(op == "−")
            result = num1 - num2;
        else if(op == "×")
            result = num1 * num2;
        else
            result = num1 / num2;

        // Displaying the result.
        display.innerText = result;

        // Changing the state to allow the user to make a new operation.
        state = 0;

        // Changing the sign to the default (positive).
        sign = 1;
    }else if(op != null){ // When the user wants to repeat the same operation with the previous result.
        num1 = parseInt(display.innerText);

        // Making the operation.
        if(op == "+")
            result = num1 + num2;
        else if(op == "−")
            result = num1 - num2;
        else if(op == "×"){
            result = num1 * num2;
        }else
            result = num1 / num2;

        // Displaying the result.
        display.innerText = result;

        // Changing the state to allow the user to make a new operation.
        state = 0;
    }
}