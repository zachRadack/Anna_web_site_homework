function dateValidator(){

    

    var meetingDate = document.getElementById("meetingDate").value.replaceAll("-", "/");
    var meetingTime = document.getElementById("meetingTime").value + ":00 gmt-7";
    console.log(meetingTime);
    console.log(meetingDate + " " + meetingTime);
    let dateObj = new Date(meetingDate + " " + meetingTime);
    
    console.log(dateObj);
    // Get the current date
    const currentDate = new Date();

    console.log(currentDate);

    if(currentDate>=dateObj){
        error = "Cant schdule in the past"; 
        ErrorHandeling("meetingTimeError", error);
        return false;
    }else if(timeFromNow(dateObj)<meetingTimeOffset){
        error = `Cant schedule a meeting within ${meetingTimeOffset} hours of current time`; 
        ErrorHandeling("meetingTimeError", error);
        return false;
    }
    console.log(timeFromNow(dateObj));
    
    return true;
}


function timeFromNow(dateObj){
    
    var now = Date.parse(new Date);
    console.log(now);
    console.log(dateObj);
    
    var dateObjMilli = Date.parse(dateObj); 

    return diffMinutes = Math.round(((dateObjMilli - now )/1000/60/60)) ;
}



/**
 * This handels all the work on what details are valid
 * 
 * @returns {bool} True = valid account False = invalid account
 */
function validator(){
    if(dateValidator() == true){
        return true;
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


function convertTimeToAnotherTimeZone(originalTime = '06:00:00',originalTimezone= "gmt-7",TimeZoneLocation = "America/Phoenix"){

    var date = new Date(`March 13, 08 ${originalTime} ${originalTimezone}`);
    var options = {
        hour: "2-digit",
        timeZone: TimeZoneLocation
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);

}


// the number here represents how many hours ahead can a person schedule a meeting
var meetingTimeOffset = 14;


var Opening = convertTimeToAnotherTimeZone();
var Closing = convertTimeToAnotherTimeZone(originalTime = '19:00:00');
//Display the correct time range in the client's local time zone
document.getElementById('time-warning').textContent = `Meetings allowed only between ${Opening} and ${Closing}  (your local time) along with ${meetingTimeOffset} hour heads up:`;



// submit is event listened to here.
const formElem = document.querySelector("form");
formElem.addEventListener("submit", (e) => {
    // on form submission, prevent default
    e.preventDefault();

    // does not do much until 1 error appears.
    removeAllErrorMsg();

    validation();
})