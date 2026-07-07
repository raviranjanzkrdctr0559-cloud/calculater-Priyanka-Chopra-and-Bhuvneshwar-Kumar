const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const settingsBtn = document.getElementById("settingsBtn");

let expression = "";
let savedPin = localStorage.getItem("vaultPin");

// Button Click
buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        const value = btn.innerText;

        handleInput(value);

    });

});

// Keyboard Support
document.addEventListener("keydown", (e) => {

    if ("0123456789".includes(e.key)) {

        handleInput(e.key);

    }

    if (e.key === "+") handleInput("+");

    if (e.key === "-") handleInput("-");

    if (e.key === "*") handleInput("×");

    if (e.key === "/") {

        e.preventDefault();

        handleInput("÷");

    }

    if (e.key === ".") handleInput(".");

    if (e.key === "Backspace") handleInput("⌫");

    if (e.key === "Escape") handleInput("AC");

    if (e.key === "Enter") {

        e.preventDefault();

        handleInput("=");

    }

});

function handleInput(value){

    switch(value){

        case "AC":

            expression = "";
            updateDisplay();

            break;

        case "⌫":

            expression = expression.slice(0,-1);
            updateDisplay();

            break;

        case "=":

            processEqual();

            break;

        default:

            expression += value;
            updateDisplay();

    }

}

function updateDisplay(){

    display.value = expression || "0";

}

function processEqual(){

    // Secret Reset
    if(expression === "9661"){

        if(confirm("Reset PIN?")){

            localStorage.removeItem("vaultPin");

            savedPin = null;

            alert("PIN Reset");

        }

        expression="";

        updateDisplay();

        return;

    }

    // First PIN
    if(savedPin === null){

        if(/^\d{4}$/.test(expression)){

            savedPin = expression;

            localStorage.setItem("vaultPin",savedPin);

            alert("PIN Saved");

            expression="";

            updateDisplay();

            return;

        }

    }

    // Unlock
    if(expression === savedPin){

        display.value="Unlocked";

        setTimeout(()=>{

            location.href="vault.html";

        },500);

        return;

    }

    // Calculator

    try{

        let result = eval(

            expression

            .replace(/×/g,"*")

            .replace(/÷/g,"/")

        );

        expression = result.toString();

        updateDisplay();

    }

    catch{

        display.value="Error";

        expression="";

        setTimeout(updateDisplay,1000);

    }

}

settingsBtn.onclick = ()=>{

    alert(
`⚙️ Settings

V2

PIN : ${savedPin ? "Already Set" : "Not Set"}

V3 me Change PIN aur Security add hogi.`
);

};
