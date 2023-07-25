import utils from "./assets/utils.js";
import api from "./assets/auth.js";

let {$$, $} = utils;
let {signIn, signUp} = api;

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
showContent(localStorage.getItem("tabNumber") || 1);

// ----------------- modal actions --------------------

$("#openModal").addEventListener("click", () => {
    $(".modal-wrapper").classList.add("grid");
    $(".modal-wrapper").classList.remove("hidden");
});

$("#closeModal").addEventListener("click", () => {
    $(".modal-wrapper").classList.add("hidden");
    $(".modal-wrapper").classList.remove("grid");
});

// ----------------- modal actions end --------------------

// -------------------- authorization actions  --------------------

$("#signup").addEventListener("click", (e) => {
    e.preventDefault();

    const signUpForm = {
        full_name: $("#full_name").value,
        password: $("#password").value,
        username: $("#user_name").value,
    };

    if ($("#confirm_password").value.trim() === signUpForm.password.trim()) {
        $("#password").classList.add("border", "border-2", "border-green-500");
        $("#confirm_password").classList.add("border", "border-2", "border-green-500");

        signUp(signUpForm)
        .then((response) => response.json())
        .then((result) => {
            if (result.statusCode == "400") {
                alert(result.message);
            } else {
                alert("Success!");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
    } else {
        $("#password").classList.add("border", "border-2", "border-red-500");
        $("#confirm_password").classList.add("border", "border-2", "border-red-500");
    }
});

$("#signin").addEventListener("click", (e) => {
    e.preventDefault();

    const signInForm = {
        password: $("#login_password").value,
        username: $("#login_user").value,
    };

    if (signInForm.password.trim().length === 0 || signInForm.username.trim().length === 0) {
        alert("Please enter your password or username");
        $("#login_password").classList.add("border", "border-2", "border-red-500");
        $("#login_user").classList.add("border", "border-2", "border-red-500");
    } else {
        signIn(signInForm)
        .then((response) => response.json())
        .then((result) => {
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", result.user.id);
            localStorage.setItem("username", result?.user?.full_name);
            window.location.href = "./profile.html";
            if (result.statusCode == "400") {
                alert(result.message);
                $("#login_password").classList.add("border", "border-2", "border-red-500");
                $("#login_user").classList.add("border", "border-2", "border-red-500");
            } else {
                alert("Success!");
                $("#login_password").classList.add("border", "border-2", "border-green-500");
                $("#login_user").classList.add("border", "border-2", "border-green-500");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
    }
});

// -------------------- authorization actions end  --------------------
