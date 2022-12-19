const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log("prevent default")

    const userObj = {
        name: document.querySelector(".name-signup").value,
        email: document.querySelector(".email-signup").value,
        password : document.querySelector(".password-signup").value
    }

    console.log(JSON.stringify(userObj))

    fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type" : "application/json"
        }
    }).then (res => {
        if (res.ok) {
               return res.json()
        } else {
            alert("Sign Up failed")
            location.reload();
        }
    })
    .then(data=>{
        location.href = `/`
    })
})