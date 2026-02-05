var Linkless = document.getElementById("Less");
var Linkmore = document.getElementById("More");
var inputContainer = document.getElementById("input-container");

Linkless.addEventListener('click',removeInputField);
Linkmore.addEventListener('click', addInputField);

function addInputField(){
        if (countInputs().length <= 4){
        newfield = document.createElement('input');

        inputContainer.appendChild(newfield);
        inputContainer.appendChild(document.createElement('br'));
        
        } else {
                alert("No more than 5 fields allowed bitch, calm yourself!!!!!");
        }
}


function removeInputField(){
        if (countInputs().length > 0){
                lastInput = inputContainer.querySelector('input:last-of-type');
                if (lastInput) lastInput.remove();
                countInputs[countInputs.length-1].remove();
        } else{
                alert('bitch are you dumb, there are no fields to remove, wtf?!');
        }
}

function countInputs(){
        return document.querySelectorAll('input');
}



