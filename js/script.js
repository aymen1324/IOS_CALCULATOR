const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        console.log(button.textContent);
    });
});
