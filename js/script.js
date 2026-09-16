/// ==========================================
// SECTION 1: DOM Elements Setup
// ==========================================
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// ==========================================
// SECTION 2: State Variables
// ==========================================
let firstNumber = "";
let operator = "";
let lastSecondNumber = "";
let waitingForSecondNumber = false;
let showingResult = false;
let hasError = false;

// ==========================================
// SECTION 3: Utility Functions
// ==========================================

// Strips existing visual formatting commas for calculations
function getRawValue(val = display.value) {
  return val.replace(/,/g, "");
}

// Formats numbers with localized thousands separators while preserving decimals
function formatNumber(value) {
  if (value === "" || value === "-") return value;

  if (value.endsWith(".")) {
    const integer = value.slice(0, -1);
    return Number(integer).toLocaleString("en-US") + ".";
  }

  if (value.includes(".")) {
    const [integer, decimal] = value.split(".");
    return Number(integer).toLocaleString("en-US") + "." + decimal;
  }

  return Number(value).toLocaleString("en-US");
}

// Handles core mathematical operations with floating-point stabilization
function calculate(num1, op, num2) {
  const n1 = Number(num1);
  const n2 = Number(num2);

  switch (op) {
    case "+":
      return n1 + n2;
    case "−":
      return n1 - n2;
    case "×":
      return n1 * n2;
    case "÷":
      return n2 === 0 ? null : n1 / n2;
    default:
      return n2;
  }
}

// Resets calculator to its default operational state
function resetCalculator() {
  display.value = "0";
  firstNumber = "";
  operator = "";
  lastSecondNumber = "";
  waitingForSecondNumber = false;
  showingResult = false;
  hasError = false;
}

// Triggers locked error state (e.g., division by zero)
function showError() {
  display.value = "Error";
  waitingForSecondNumber = false;
  showingResult = true;
  hasError = true;
}

// ==========================================
// SECTION 4: Button Event Listener (Dispatcher)
// ==========================================
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    // Lock input if in error state until AC is hit
    if (hasError && value !== "AC") return;

    if (value === "AC") return resetCalculator();
    if (value === "⌫") return handleBackspace();
    if (value === "%") return handlePercent();
    if (value === "+/−") return handlePlusMinus();
    if (["+", "−", "×", "÷"].includes(value)) return handleOperator(value);
    if (value === "=") return handleEquals();

    handleNumber(value);
  });
});

// ==========================================
// SECTION 5: handleNumber()
// ==========================================
function handleNumber(value) {
  // Overwrite screen if starting a new input cycle or second operand
  if (showingResult || waitingForSecondNumber) {
    display.value = value === "." ? "0." : value;
    showingResult = false;
    waitingForSecondNumber = false;
    return;
  }

  // Prevent leading zeros
  if (display.value === "0") {
    display.value = value === "." ? "0." : value;
    return;
  }

  // Prevent duplicate decimals
  if (value === "." && display.value.includes(".")) return;

  const rawValue = getRawValue() + value;
  display.value = formatNumber(rawValue);
}

// ==========================================
// SECTION 6: handleOperator()
// ==========================================
function handleOperator(value) {
  firstNumber = getRawValue();
  operator = value;
  waitingForSecondNumber = true;
  showingResult = false;
}

// ==========================================
// SECTION 7: handleEquals()
// ==========================================
function handleEquals() {
  if (!operator) return;

  let secondNumber;
  if (showingResult) {
    secondNumber = lastSecondNumber;
  } else {
    secondNumber = getRawValue();
    lastSecondNumber = secondNumber;
  }

  const rawResult = calculate(firstNumber, operator, secondNumber);

  if (rawResult === null || isNaN(rawResult)) {
    showError();
    return;
  }

  // Fix JS floating point drift (e.g., 0.1 + 0.2 = 0.30000000000000004)
  const sanitizedResult = Number(Math.round(rawResult + "e12") + "e-12");

  firstNumber = String(sanitizedResult);
  display.value = formatNumber(String(sanitizedResult));
  showingResult = true;
  waitingForSecondNumber = false;
}

// ==========================================
// SECTION 8: handleBackspace()
// ==========================================
function handleBackspace() {
  if (showingResult) return;

  const raw = getRawValue();
  if (raw.length > 1) {
    const sliced = raw.slice(0, -1);
    display.value = (sliced === "-" || sliced === "") ? "0" : formatNumber(sliced);
  } else {
    display.value = "0";
  }
}

// ==========================================
// SECTION 9: handlePercent()
// ==========================================
function handlePercent() {
  const current = Number(getRawValue());
  const result = current / 100;
  display.value = formatNumber(String(result));
}

// ==========================================
// SECTION 10: handlePlusMinus()
// ==========================================
function handlePlusMinus() {
  const raw = getRawValue();
  if (raw === "0") return;

  const toggled = Number(raw) * -1;
  display.value = formatNumber(String(toggled));
}
