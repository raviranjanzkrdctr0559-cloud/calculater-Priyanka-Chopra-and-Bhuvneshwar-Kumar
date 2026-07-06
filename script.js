const pinInput = document.getElementById("pin");
const statusText = document.getElementById("status");
const message = document.getElementById("message");

const buttons = document.querySelectorAll(".buttons button");

let savedPin = localStorage.getItem("vaultPin");

let firstPin = "";
let confirmMode = false;

updateStatus();

buttons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        let value = btn.innerText;

        if(value==="⌫"){

            pinInput.value=pinInput.value.slice(0,-1);

        }

        else if(value==="="){

            processPIN();

        }

        else{

            if(pinInput.value.length<4){

                pinInput.value+=value;

            }

        }

    });

});

pinInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        processPIN();

    }

});

function updateStatus(){

    if(savedPin===null){

        if(confirmMode){

            statusText.innerText="Confirm PIN";

        }else{

            statusText.innerText="Set New PIN";

        }

    }else{

        statusText.innerText="Enter PIN";

    }

}

function processPIN(){

    let pin=pinInput.value;

    if(pin.length!==4){

        message.style.color="red";
        message.innerText="PIN must be 4 digits";
        return;

    }
// Secret Reset Code
if(pin === "9661"){

    let reset = confirm("Reset PIN?");

    if(reset){

        localStorage.removeItem("vaultPin");

        savedPin = null;
        firstPin = "";
        confirmMode = false;

        pinInput.value = "";
        message.style.color = "lime";
        message.innerText = "PIN Reset Successfully";

        updateStatus();

    }else{

        pinInput.value = "";

    }

    return;
}
    if(savedPin===null){

        if(!confirmMode){

            firstPin=pin;

            confirmMode=true;

            pinInput.value="";

            message.style.color="orange";
            message.innerText="Enter same PIN again";

            updateStatus();

            return;

        }

        if(pin===firstPin){

            localStorage.setItem("vaultPin",pin);

            savedPin=pin;

            confirmMode=false;

            message.style.color="lime";
            message.innerText="PIN Saved Successfully";

            statusText.innerText="Enter PIN";

        }

        else{

            firstPin="";

            confirmMode=false;

            message.style.color="red";
            message.innerText="PIN doesn't match";

            updateStatus();

        }

        pinInput.value="";

        return;

    }

    if(pin===savedPin){

        message.style.color="lime";
        message.innerText="Vault Unlocked";

        setTimeout(() => {

    window.location.href = "vault.html";

}, 500);
    }

    else{

        message.style.color="red";
        message.innerText="Wrong PIN";

    }

    pinInput.value="";

}
