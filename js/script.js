const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");
let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.textContent;
       console.log("Button clicked:", value);
  if (value === "AC") {
    display.value = "0";
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
}
else if (value === "%") {
  
}

else {
if (display.value === "0") {
    display.value = value;
}

else {
    display.value += value;
}
}
    });
});
