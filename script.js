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
        .replace(/%/g,"/100")
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


const modal = document.getElementById("settingsModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const changePinBtn = document.getElementById("changePinBtn");
const resetPinBtn = document.getElementById("resetPinBtn");

settingsBtn.onclick = () => {
    modal.style.display = "flex";
};

closeModalBtn.onclick = () => {
    modal.style.display = "none";
};

resetPinBtn.onclick = () => {

    let code = prompt("Enter Secret Reset Code");

    if(code === "9661"){

        localStorage.removeItem("vaultPin");

        savedPin = null;

        alert("PIN Reset Successfully");

        modal.style.display = "none";

    }else{

        alert("Wrong Secret Code");

    }

};

changePinBtn.onclick = () => {

    if(savedPin === null){

        alert("No PIN Set");

        return;

    }

    let oldPin = prompt("Enter Old PIN");

    if(oldPin !== savedPin){

        alert("Wrong PIN");

        return;

    }

    let newPin = prompt("Enter New PIN");

    if(!/^\d{4}$/.test(newPin)){

        alert("PIN must be 4 digits");

        return;

    }

    savedPin = newPin;

    localStorage.setItem("vaultPin", savedPin);

    alert("PIN Changed Successfully");

    modal.style.display = "none";

};
