// SECTION 1: DOM Elements Setup
// Selects the calculator display input and all calculator buttons.
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Formats numbers with commas while preserving decimals.
function formatNumber(value) {

    // Don't format empty values or just a minus sign.
    if (value === "" || value === "-") return value;

    // Handle numbers ending with a decimal point.
    if (value.endsWith(".")) {
        const integer = value.slice(0, -1);
        return Number(integer).toLocaleString("en-US") + ".";
    }

    // Handle decimal numbers.
    if (value.includes(".")) {
        const [integer, decimal] = value.split(".");
        return Number(integer).toLocaleString("en-US") + "." + decimal;
    }

    // Handle whole numbers.
    return Number(value).toLocaleString("en-US");
}

// SECTION 2: Calculator State Variables
// Tracks inputs, operations, and state flags for continuous calculations.
let firstNumber = "";
let operator = "";
let lastSecondNumber = "";
let waitingForSecondNumber = false;
let showingResult = false;
let hasError = false;

// SECTION 3: Event Listeners
// Attaches a click event listener to every button on the calculator.
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.textContent;
      if (hasError && value !== "AC") {
           return;
      }
      console.log("Button clicked:", value);

// SECTION 4: Clear All (AC) Handling
// Resets the calculator back to its initial state.
if (value === "AC") {
    display.value = "0";
    firstNumber = "";
    operator = "";
    lastSecondNumber = "";
    waitingForSecondNumber = false;
    showingResult = false;
    hasError = false;
}

// SECTION 5: Backspace Button Handling
// Removes the last character entered or resets to 0 if only one character remains.
else if (value === "⌫") {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
        
        // Safeguard: If we just sliced off the last digit of a negative number
        if (display.value === "−") {
            display.value = "0";
        }
    } else {
        display.value = "0";
    }

}

// SECTION 6: Operator Selection (+, −, ×, ÷)
// Saves the current number and operator, then resets display for second input.
else if (
    value === "+" ||
    value === "−" ||
    value === "×" ||
    value === "÷"
) {
    firstNumber = display.value.replace(/,/g, "");
    operator = value;
    waitingForSecondNumber = true;
    display.value = "0";
}

// SECTION 7: Equals Button & Calculation Logic
// Evaluates the math problem, handles division by zero, and supports repeated equals clicks.
else if (value === "=") {
let secondNumber;

if (showingResult) {
    secondNumber = lastSecondNumber;
} else {
    secondNumber = display.value.replace(/,/g, "");
    lastSecondNumber = secondNumber;
}
let result;

            if (operator === "+") {
                result = Number(firstNumber) + Number(secondNumber);
            }
            else if (operator === "−") {
                result = Number(firstNumber) - Number(secondNumber);
            }
            else if (operator === "×") {
                result = Number(firstNumber) * Number(secondNumber);
            }
            else if (operator === "÷") {

    if (Number(secondNumber) === 0) {
        display.value = "Error";
        waitingForSecondNumber = false;
        showingResult = true;
        hasError = true;
        return;
    }

    result = Number(firstNumber) / Number(secondNumber);

}
            firstNumber = String(result);
            display.value = formatNumber(String(result));
            waitingForSecondNumber = false;
            showingResult = true;
}

// SECTION 8: Percentage Converter
// Converts current display number into a percentage value (divides by 100).
else if (value === "%") {
  display.value = String(Number(display.value) / 100);
}

// SECTION 9: Toggle Positive / Negative (+/−)
// Flips positive display numbers to negative and vice versa.
else if (value === "+/−") {

    if (display.value !== "0") {
        display.value = String(Number(display.value) * -1);
    }

}

// SECTION 10: Number and Decimal Input Handling
// Handles digits and periods, managing initial zeroes, decimal duplication, and new entry states.
else {

   if (showingResult) {

    if (value === ".") {
        display.value = "0.";
    }
    else {
        display.value = value;
    }

    showingResult = false;
}

   else if (display.value === "0") {

    if (value === ".") {
        display.value = "0.";
    }
    else {
        display.value = value;
    }

}
else {

    if (value === "." && display.value.includes(".")) {
        return;
    }

    // Remove commas before adding the new character.
    let rawValue = display.value.replace(/,/g, "");
    rawValue += value;

    // Display the formatted value.
    display.value = formatNumber(rawValue);

}

}
    });
});
