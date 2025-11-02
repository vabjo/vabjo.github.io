/**
 * Lägg till din JavaScript-kod här under.
 * 
 */
'use strict';

//Invänta DOM => ladda funktioner
document.addEventListener('DOMContentLoaded', () => {
    generateCard();
    clearAll();
});

/*
FUNCTION 1: GENERATE CARD ON CLICK
- Read values, check if valid: if valid, display on card; if not valid, error message
- Store error messages in storage
- Clear existing error messages when input is valid
- Change font based on select-element
*/

//Vid knapptryck: kör dessa funktioner
function generateCard() {
    generateBtn.addEventListener('click', () => {
        errorMessages();
        setFont();
    })
}

function errorMessages() {
    let errors = []; //array för felmeddelanden
    let inputs = []; //array för input values

    if (fullName.value === '' || fullName.value === null) { //om fullname.value = tom sträng eller null...
        let nameErrorText = document.createTextNode('Namn får inte vara tomt'); //...skapa variabel som är textnod med följande meddelande...
        errors.push(nameErrorText.data); //om tomt, lagra felmeddelande i errors array

        let displayNameError = document.createElement('li'); //skapa list item för errorlist
        displayNameError.appendChild(nameErrorText); //gör name error till list items barn 
        errorList.appendChild(displayNameError); //gör list item till errorlists barn
    } else {
        let nameEl = document.createTextNode(fullName.value);
        inputs.push(nameEl.textContent);

        fullNamePreview.textContent = ''; //tar bort orginal texten
        fullNamePreview.appendChild(nameEl); //lägger till nameEl som barn
    }
        
    if (email.value === '' || email.value === null) { 
        let emailErrorText = document.createTextNode('Email får inte vara tom'); 
        errors.push(emailErrorText.data);

        let displayEmailError = document.createElement('li');
        displayEmailError.appendChild(emailErrorText);
        errorList.appendChild(displayEmailError);
    } else {
        let emailEl = document.createTextNode(email.value);
        inputs.push(emailEl.textContent);

        emailPreview.textContent = '';
        emailPreview.appendChild(emailEl);

    }
        
    if (phone.value === '' || phone.value === null) { 
        let phoneErrorText = document.createTextNode('Telefon får inte vara tom'); 
        errors.push(phoneErrorText.data);

        let displayPhoneError = document.createElement('li');
        displayPhoneError.appendChild(phoneErrorText);
        errorList.appendChild(displayPhoneError);
    } else {
        let phoneEl = document.createTextNode(phone.value);
        inputs.push(phoneEl.textContent);

        phonePreview.textContent = '';
        phonePreview.appendChild(phoneEl);
    }

    //Lagra typsnitts val i inputs 
    let fontEl = document.createTextNode(font.value);
    inputs.push(fontEl.textContent);

    const jsonErrors = JSON.stringify(errors); //konvertera array till text
    localStorage.setItem('errorMsgs', jsonErrors); //lagra i localstorage
    
    const jsonInputs = JSON.stringify(inputs);
    localStorage.setItem('details', jsonInputs);

}

function setFont() {
    const fontChoice = font.value; //variabel som innehåller val (option) av typsnitt
    
    /* Ändrar typsnitt: se variabler i dokumentets slut*/
    cardArr.forEach(detail => {
        detail.style.fontFamily = fontChoice;
    })
}

/*
FUNCTION 2: CLEAR FORM ON CLICK
- Clear form + change card values back to default
- Add values to history (optional)
*/

function clearAll() {
    clearBtn.addEventListener('click', () => {  
        //RESET
        fullName.value = '';
        email.value = '';
        phone.value = '';
        font.value = 'Georgia';

        errorList.remove();

        fullNamePreview.textContent = 'Namn';
        emailPreview.textContent = 'E-post';
        phonePreview.textContent = 'Telefon';
        cardArr.forEach(detail => {
            detail.style.fontFamily = "'Open Sans', Helvetica, sans-serif";
        });
    })
}

//buttons + error list + history
const errorList = document.querySelector('#errorlist'); //skapar variabel som innehåller felmeddelanden om de uppstår
const generateBtn = document.querySelector('#generate') //skapar variabel för knappen som genererar studentkort 
const clearBtn = document.querySelector('#clear') //skapar variabel som nollställer formuläret och studentkortet

//get input values
const fullName = document.querySelector('#fullname'); //skapar variabel som hämtar värde angett för namn
const email = document.querySelector('#email'); //skapar variabel som hämtar värde angett för e-mail
const phone = document.querySelector('#phone'); //skapar variabel som hämtar värde angett för telefon
const font = document.querySelector('#font'); //skapar variabel som hämtar det värde som är selected

//card values
const fullNamePreview = document.querySelector('#previewfullname');
const emailPreview = document.querySelector('#previewemail');
const phonePreview = document.querySelector('#previewphone');

//variables for changing font
let body = document.querySelector('body'); //hämta body element
let cardDetails = body.querySelectorAll('.card-info'); //hämta klassen card-info inom body (ger nodelist)
let cardArr = Array.from(cardDetails); //gör nodelist till array som kan loopas