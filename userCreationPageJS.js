
var error;

/**
 * Validates both first and last name.
 * 
 * If any names are invalid then its stops there and sends the info to ErrorHandeling to report it.
 * 
 * @returns {bool} true means both names are valid, false means that 1 is invalid.
 */
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

    return true;
}

/**
 * Catches most non names and allows only alphbetical characters along with characters used in names
 * such as hypeons, also does not allow spaces. Uses regex
 * 
 * This function is a catch all, less specific but will catch most issues
 * 
 * @param {string} str - enter in a first or last name (not both)
 * @returns {bool} if true then this would follows most characteristics of a real name
 */
function seeIfStringHasNonLetterWords(str) {
    // Create a regular expression to match any non-letter characters. Prevents spaces and anthing above 30 characters
    const nonLetterRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]\s]{2,30}$/;
  
    // Return true if the regular expression matches the string.
    return nonLetterRegex.test(str);
  }
  

  /**
   * Validates email
   * @returns {bool} If true, then the email is valid otherwise, its an invalid email
   */
function validateEmail(){
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

    //checks to see if the email is valid catchall, less specific, however it catches most issues
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (regexEmail.test(email)===false){
        error = "Invalid Email"; 
        ErrorHandeling("emailError", error);
        return false;
    }
    return true;

}


/**
 * This handels all the work on what details are valid
 * 
 * @returns {bool} True = valid account False = invalid account
 */
function validator(){
    if(validateName() == true){
        if(validateEmail() == true){
            return true;
        }
    }
    return false;
}


/**
 * The final decider on if the account is valid
 */
function validation(){
    
    if(validator()==false){
        // If invalid details are in here, then it gives a log
        console.log(error);
    }else{
        // place holder saying we are good.
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

/**
 * removes all msgs from ErrorHandeling any time submit is pressed
 * not the most eloquent but gets job done.
 */
function removeAllErrorMsg(){
    // Find all error msgs
    const elements = document.querySelectorAll(".errorMessage");

    // Iterate over the elements and remove each one.
    for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
}

}


// submit is event listened to here.
const formElem = document.querySelector("form");
formElem.addEventListener("submit", (e) => {
    // on form submission, prevent default
    e.preventDefault();

    // does not do much until 1 error appears.
    removeAllErrorMsg();

    validation();
})