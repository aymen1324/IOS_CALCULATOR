const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");
let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;
let showingResult = false;
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.textContent;
       console.log("Button clicked:", value);
  if (value === "AC") {
    display.value = "0";
}
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

else if (
    value === "+" ||
    value === "−" ||
    value === "×" ||
    value === "÷"
) {
    firstNumber = display.value;
    operator = value;
    waitingForSecondNumber = true;
    display.value = "0";
}
else if (value === "=") {
const secondNumber = display.value;
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
                result = Number(firstNumber) / Number(secondNumber);
            }

            display.value = result;
            waitingForSecondNumber = false;
            showingResult = true;
}
else if (value === "%") {
  display.value = String(Number(display.value) / 100);
}
else if (value === "+/−") {

    if (display.value !== "0") {
        display.value = String(Number(display.value) * -1);
    }

}

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

    display.value += value;

}

}
    });
});
