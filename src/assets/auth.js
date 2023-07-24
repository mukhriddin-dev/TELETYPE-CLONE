let BASE_URL = "https://nest-blog-qdsa.onrender.com";

// data -> auth Object 

function signUp(data) {
    return fetch(`${BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

function signIn(data) {
    return fetch(`${BASE_URL}/api/user/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}


export default { signIn , signUp  };