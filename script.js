const pinInput = document.getElementById("pin");
const message = document.getElementById("message");
const buttons = document.querySelectorAll(".buttons button");

let savedPin = localStorage.getItem("vaultPin");

// Number Buttons
buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        if(value === "⌫"){

            pinInput.value = pinInput.value.slice(0,-1);

        }

        else if(value === "="){

            unlock();

        }

        else{

            if(pinInput.value.length < 4){

                pinInput.value += value;

            }

        }

    });

});

// Enter Key
pinInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        unlock();

    }

});

// Unlock Function

function unlock(){

    const enteredPin = pinInput.value;

    if(enteredPin.length !== 4){

        message.innerText = "PIN must be 4 digits";

        return;

    }

    // First Time

    if(savedPin === null){

        localStorage.setItem("vaultPin", enteredPin);

        savedPin = enteredPin;

        message.style.color = "lime";

        message.innerText = "PIN Saved Successfully";

        pinInput.value = "";

        return;

    }

    // Login

    if(enteredPin === savedPin){

        message.style.color = "lime";

        message.innerText = "Vault Unlocked";

        setTimeout(()=>{

            alert("Welcome To Private Vault");

        },500);

    }

    else{

        message.style.color = "#ff5555";

        message.innerText = "Wrong PIN";

    }

    pinInput.value="";

}
