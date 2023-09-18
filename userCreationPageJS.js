
var error;

function validateName(){
    var firstName = document.getElementById("clientFirstName").value;
    var lastName = document.getElementById("clientLastName").value;

    if(firstName.length <= 2){
        error = "First name too short"; 
        ErrorHandeling("firstNameError", error);
        return false;
    }else if(seeIfStringHasNonLetterWords(firstName)===false){
        error = "First name is invalid"; 
        ErrorHandeling("firstNameError", error);
        return false;
    }else if(lastName.length <= 2){
        error = "Last name too short"; 
        ErrorHandeling("lastNameError", error);
        return false;
    }else if(seeIfStringHasNonLetterWords(lastName)===false){
        error = "Last name is invalid"; 
        ErrorHandeling("lastNameError", error);
        return false;
    }
    console.log(seeIfStringHasNonLetterWords(firstName));

    return true;
}

function seeIfStringHasNonLetterWords(str) {
    // Create a regular expression to match any non-letter characters. Prevents spaces and anthing above 30 characters
    const nonLetterRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]\s]{2,30}$/;
  
    // Return true if the regular expression matches the string.
    return nonLetterRegex.test(str);
  }
  

function validateEmail(email){
    var email = document.getElementById("clientEmail").value;
    if(email.length== 0){
        error = "Please add email"; 
        ErrorHandeling("emailError", error);
        return false;
    }else if (email.includes("@")== false){
        error = "Email lacks an @"; 
        ErrorHandeling("emailError", error);
        return false;
    }


    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (regexEmail.test(email)===false){
        error = "Invalid Email"; 
        ErrorHandeling("emailError", error);
        return false;
    }
    return true;

}


function validator(){
    if(validateName() == true){
        if(validateEmail() == true){
            return true;
        }
    }
    return false;
}


function validation(){
    
    if(validator()==false){
        console.log(error);
    }else{
        console.log("We good");
    }


}

/** 
 * Displays errors as boxes
 * 
 * 
 * @param {string} ErrorLocation - The Br below the input as a string, ie <br id = "firstNameError"> would be firstNameError
 * @param {string} ErrorMsg - The message
 **/
function ErrorHandeling(ErrorLocation, ErrorMsg){
    var errorDiv = document.createElement('div');
    errorDiv.textContent = ErrorMsg;
    errorDiv.className= "errorMessage";
    document.getElementById(ErrorLocation).insertAdjacentElement("afterend",errorDiv);
    document.getElementById("SubmitButton").insertAdjacentElement("beforebegin",errorDiv.cloneNode(true));

}

function removeAllErrorMsg(){
    // Find all error msgs
    const elements = document.querySelectorAll(".errorMessage");

    // Iterate over the elements and remove each one.
    for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
}

}

const formElem = document.querySelector("form");
formElem.addEventListener("submit", (e) => {
    // on form submission, prevent default
    e.preventDefault();

    removeAllErrorMsg();


    validation();
})