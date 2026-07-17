const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

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
    value === "÷" ||
    value === "=" ||
    value === "%"
) {
    // Do nothing for now
}
else if (display.value === "0") {
    display.value = value;
}
else {
    display.value += value;
}
    });
});
