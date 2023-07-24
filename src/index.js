import utils from "./assets/utils.js";
let {$$, $} = utils;

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
