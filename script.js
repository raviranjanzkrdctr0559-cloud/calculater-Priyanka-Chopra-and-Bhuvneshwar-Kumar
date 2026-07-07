const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const settingsBtn = document.getElementById("settingsBtn");

let expression = "";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        switch(value){

            case "AC":
                expression = "";
                display.value = "0";
                break;

            case "⌫":
                expression = expression.slice(0,-1);
                display.value = expression || "0";
                break;

            case "=":

                try{

                    let exp = expression
                    .replace(/×/g,"*")
                    .replace(/÷/g,"/");

                    display.value = eval(exp);

                    expression = display.value;

                }

                catch{

                    display.value = "Error";

                    expression = "";

                }

                break;

            case "%":

                if(expression!=""){

                    expression = (parseFloat(expression)/100).toString();

                    display.value = expression;

                }

                break;

            default:

                expression += value;

                display.value = expression;

        }

    });

});

settingsBtn.addEventListener("click",()=>{

    alert("⚙️ Settings Coming Soon");

});
