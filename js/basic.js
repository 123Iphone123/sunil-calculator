const expression = document.getElementById("expression");
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");
let input = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        
        if (button.id === "clearBtn") {
            input = "";
            updateDisplay();
            return;
        }

        if (button.id === "deleteBtn") {
            input = input.slice(0, -1);
            updateDisplay();
            return;
        }

        if (button.id === "equalBtn") {
            if (input.trim() === "") return;

            try {
                let currentExpression = input;
                let answer = eval(input);

                // History me save karo
                if (typeof window.addToHistory === "function") {
                    window.addToHistory(currentExpression, answer);
                }

                input = answer.toString();

                expression.innerHTML = "";
                expression.style.display = "none";
                result.innerHTML = answer;
                result.style.color = "#ffffff";
                result.style.fontSize = "58px";
            } catch {
                expression.innerHTML = "";
                expression.style.display = "none";
                result.innerHTML = "Error";
                result.style.color = "#ffffff";
                result.style.fontSize = "58px";
                input = "";
            }
            return;
        }

        if (button.dataset.value) {
            input += button.dataset.value;
            updateDisplay();
        }
    });
});

function updateDisplay() {
    if (input === "") {
        expression.innerHTML = "";
        expression.style.display = "none";
        result.innerHTML = "0";
        result.style.color = "#ffffff";
        result.style.fontSize = "58px";
        return;
    }

    if (/[+\-*/]/.test(input)) {
        expression.style.display = "block";
        expression.innerHTML = input;
        expression.style.color = "#ffffff";
        expression.style.fontSize = "24px";
        try {
            result.innerHTML = eval(input);
            result.style.color = "#9ca3af";
            result.style.fontSize = "38px";
        } catch {
            result.innerHTML = "...";
            result.style.color = "#9ca3af";
            result.style.fontSize = "38px";
        }
    } else {
        expression.innerHTML = "";
        expression.style.display = "none";
        result.innerHTML = input;
        result.style.color = "#ffffff";
        result.style.fontSize = "58px";
    }
}
