import utils from "./assets/utils.js";
import api from "./assets/auth.js";

let { $$, $ } = utils;
let { signIn, signUp } = api;



/// ----------- BTN CHANGE ACTION --------------------

$$(".change-btn").forEach((button, index) => {
    button.addEventListener("click", () => {
        localStorage.setItem("tabNumber", index);

        console.log(localStorage.getItem("tabNumber"));

        showContent(index);
    });
});

// ---------------- TAB ACTIVATION ACTIONS ------------

function hideContent() {
    $$(".tab-item").forEach((tab) => {
        tab.style.display = "none";
    });
}

function showContent(index) {
    hideContent();
    $$(".tab-item")[index].style.display = "block";
}

hideContent();
showContent( localStorage.getItem("tabNumber") || 1);

// ----------------- modal actions --------------------


$('#openModal').addEventListener('click', () => {
    $('.modal-wrapper').classList.add('grid');
    $('.modal-wrapper').classList.remove('hidden');
})

$("#closeModal").addEventListener("click", () => {
     $(".modal-wrapper").classList.add("hidden");
     $(".modal-wrapper").classList.remove("grid");
});

// ----------------- modal actions end -------------------- 

// -------------------- authorization actions  --------------------













// -------------------- authorization actions end  --------------------


$('#signup').addEventListener('click', (e) => { 

    e.preventDefault();

    const signUpForm = {
        full_name: $('#full_name').value,
        password: $('#password').value,
        username: $('#user_name').value
    }

    if ($('#confirm_password').value.trim() === signUpForm.password.trim()) { 
        $("#password").classList.add("border",'border-2', 'border-green-500');
        $("#confirm_password").classList.add("border", 'border-2', 'border-green-500');
        
        signUp(signUpForm).then((response) => response.json()).then((result) => {
            console.log(result)
        })

    } else {
        $("#password").classList.add("border",'border-2', 'border-red-500');
        $("#confirm_password").classList.add("border",'border-2', 'border-red-500');
    }

});