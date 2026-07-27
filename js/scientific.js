// ======================================
// SCIENTIFIC CALCULATOR
// Version 1.0
// ======================================

// ---------- Display ----------

const expression = document.getElementById("expression");
const result = document.getElementById("result");

// ---------- Buttons ----------

const buttons = document.querySelectorAll(".btn, .sbtn");

// ---------- Variables ----------

let input = "";
let answer = "";
let memory = 0;
let degreeMode = true;

// ======================================
// Update Display
// ======================================

function updateDisplay(){

    if(input === ""){

        expression.innerHTML = "";

        result.innerHTML = "0";

        return;

    }

    expression.innerHTML = input;

    try{

        let exp = input
        .replace(/×/g,"*")
        .replace(/÷/g,"/")
        .replace(/π/g,Math.PI)
        .replace(/\^/g,"**");

        result.innerHTML = eval(exp);

    }

    catch{

        result.innerHTML = "...";

    }

}

// ======================================
// Final Calculation
// ======================================

function calculate(){

    try{

        let exp = input
        .replace(/×/g,"*")
        .replace(/÷/g,"/")
        .replace(/π/g,Math.PI)
        .replace(/\^/g,"**");

        answer = eval(exp);

        input = answer.toString();

        expression.innerHTML = "";

        result.innerHTML = answer;

    }

    catch{

        result.innerHTML = "Error";

        input = "";

    }

}
// ======================================
// Button Click Event
// ======================================

buttons.forEach((button)=>{

    button.addEventListener("click",()=>{

        const value = button.innerText;

        // ---------- AC ----------

        if(value==="AC"){

            input="";

            updateDisplay();

            return;

        }

        // ---------- Delete ----------

        if(value==="⌫"){

            input=input.slice(0,-1);

            updateDisplay();

            return;

        }

        // ---------- Equal ----------

        if(value==="="){

            calculate();

            return;

        }

        // ---------- Percentage ----------

        if(value==="%"){

            try{

                input=(eval(input)/100).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Pi ----------

        if(value==="π"){

            input+="π";

            updateDisplay();

            return;

        }

        // ---------- Square Root ----------

        if(value==="√"){

            try{

                input=Math.sqrt(eval(input)).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Square ----------

        if(value==="x²"){

            try{

                input=Math.pow(eval(input),2).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Cube ----------

        if(value==="x³"){

            try{

                input=Math.pow(eval(input),3).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Reciprocal ----------

        if(value==="1/x"){

            try{

                input=(1/eval(input)).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }
              // ---------- Sine ----------

        if(value==="sin"){

            try{

                let num = eval(input);

                if(degreeMode){

                    num = num * Math.PI / 180;

                }

                input = Math.sin(num).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Cosine ----------

        if(value==="cos"){

            try{

                let num = eval(input);

                if(degreeMode){

                    num = num * Math.PI / 180;

                }

                input = Math.cos(num).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Tangent ----------

        if(value==="tan"){

            try{

                let num = eval(input);

                if(degreeMode){

                    num = num * Math.PI / 180;

                }

                input = Math.tan(num).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Log ----------

        if(value==="log"){

            try{

                input = Math.log10(eval(input)).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Natural Log ----------

        if(value==="ln"){

            try{

                input = Math.log(eval(input)).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- eˣ ----------

        if(value==="eˣ"){

            try{

                input = Math.exp(eval(input)).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }

        // ---------- Cube Root ----------

        if(value==="∛x"){

            try{

                input = Math.cbrt(eval(input)).toString();

            }

            catch{

                input="";

            }

            updateDisplay();

            return;

        }
              // ---------- xʸ ----------

        if(value==="xʸ"){

            input += "^";

            updateDisplay();

            return;

        }

        // ---------- Factorial ----------

        if(value==="x!"){

            try{

                let n = parseInt(eval(input));

                if(n < 0){

                    result.innerHTML = "Error";

                    return;

                }

                let fact = 1;

                for(let i=2;i<=n;i++){

                    fact *= i;

                }

                input = fact.toString();

            }

            catch{

                input = "";

            }

            updateDisplay();

            return;

        }

        // ---------- Random ----------

        if(value==="Rand"){

            input = Math.random().toString();

            updateDisplay();

            return;

        }

        // ---------- Memory Clear ----------

        if(value==="MC"){

            memory = 0;

            return;

        }

        // ---------- Memory Add ----------

        if(value==="M+"){

            try{

                memory += Number(eval(input));

            }

            catch{}

            return;

        }

        // ---------- Memory Recall ----------

        if(value==="M-"){

            input = memory.toString();

            updateDisplay();

            return;

        }

        // ---------- Degree Mode ----------

        if(value==="Deg"){

            degreeMode = true;

            alert("Degree Mode");

            return;

        }

        // ---------- Radian Mode ----------

        if(value==="Rad"){

            degreeMode = false;

            alert("Radian Mode");

            return;

        }
              // ---------- Normal Numbers & Operators ----------

        input += value;

        updateDisplay();

    });

});

// ======================================
// Start Calculator
// ======================================

updateDisplay();

// ======================================
// END OF FILE
// ======================================