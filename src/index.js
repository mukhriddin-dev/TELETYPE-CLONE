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

$("#add_btn").addEventListener("click", () => {
    $(".modal-wrapper").classList.add("grid");
    $(".modal-wrapper").classList.remove("hidden");
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
            localStorage.setItem("user_id", result.user.id);
            localStorage.setItem("username", result?.user?.full_name);

            window.location.href = "./profile.html";

            if (result.statusCode == "400") {
                $("#login_password").classList.add("border", "border-2", "border-red-500");
                $("#login_user").classList.add("border", "border-2", "border-red-500");
            } else {
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

function authChek() {
    if (localStorage.getItem("token")) {
        $(".menu").classList.remove("hidden");
        $("#openModal").classList.add("hidden");
        $("#user_info").textContent = localStorage.getItem("username");
        $("#auth").classList.add("hidden");
        $("#addpost").classList.remove("hidden");
        $("#add_btn").classList.remove("hidden");
    } else {
        $(".menu").classList.add("hidden");
        $(".dropdown").classList.add("hidden");
        $("#openModal").classList.remove("hidden");

        $("#auth").classList.remove("hidden");
        $("#addpost").classList.add("hidden");
        $("#add_btn").classList.add("hidden");
    }
}

authChek();

$(".menu").addEventListener("click", () => {
    $(".dropdown").classList.toggle("hidden");
});

$("#logout").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

// ------------------------ BLOG POST ------------------------

function addPost() {
    const newBlog = {
        title: $("#blog_title").value,
        body: $("#blog_text").value,
        user_id: localStorage.getItem("user"),
    };

    if (newBlog.title.trim().length === 0 || newBlog.body.trim().length === 0) {
        alert("Please fill post title and body");
    } else {
        fetch("https://nest-blog-qdsa.onrender.com/api/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newBlog),
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
}

$("#save").addEventListener("click", () => {
    addPost();
});

// ------------------------ BLOG POST END ------------------------

// ----------------------- ALL BLOGS ----------------
$(".post_wrapper").innerHTML = "<div class='loader_wrapper'><span class='loader'></span></div>";

async function getAllPosts() {
    try {
        const response = await fetch(`https://nest-blog-qdsa.onrender.com/api/blog`);
        const results = await response.json();
        if (results.length) {
            $(".post_wrapper").innerHTML = "";
            listRender(results);
        } else {
            $(".post_wrapper").innerHTML = "<h1>DATA NOT FOUND</h1>";
        }
    } catch (err) {
        // alert(err.message);
    } finally {
        console.log("LOADED ALL POSTS");
    }
}

function listRender(state) {
    console.log(state);
    if (state.length) {
        state?.forEach((el) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                     <div class="post_item border relative shadow-md hover:shadow-xl duration-150 font-['inter'] rounded-lg p-4">
                          
                         


                            <h2 class="post__title text-3xl font-bold leading-[39px] mb-5">
                               ${el.title}
                            </h2>

                            <p class="post__text mb-[25.5px] leading-[25.5px] text-[17px] font-normal">
                                ${el.body?.substring(0, 256)} . . .
                            </p>

     
                            <a class="user" href="./profile.html" target="_blank"   data-user="${el?.user?.id}">
                               <strong class="mb-[10px]  user leading-[25.5px]" data-user="${el?.user?.id}"> ● ${
                el?.user?.full_name
            }</strong>
                            </a>

                            <div class="flex items-center gap-x-3 my-4">
                                <span>${el.createdAt.substring(0, 10)}</span>
                                <i class="bx bx-show"></i>
                                <span>${el.views}</span>
                            </div>
                        </div>
                `;
            $(".post_wrapper").append(card);
        });
    } else {
        $(".post_wrapper").innerHTML = `<h1 class='text-center'>${selector.toUpperCase()} NOT FOUND</h1>`;
    }
}

getAllPosts();

$(".post_wrapper").addEventListener("click", (e) => {
    if (e.target.classList.contains("user")) {
        console.log(e.target.textContent);
        let userId = e.target.getAttribute("data-user");
        console.log(userId);
        localStorage.setItem("user", userId);
    }
});

// ------------- redirect to my blog -------------

$$(".user_id").forEach((item) => {
    item.addEventListener("click", () => {
        localStorage.setItem("user", localStorage.getItem("user_id"));
    });
});
