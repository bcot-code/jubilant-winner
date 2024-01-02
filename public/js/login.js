const loginFormerHandler = async (event) => {
  //console.log("loginFormerHandler called");
  event.preventDefault();
  //Collect value from the login form
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();
  if (email && password) {
    //Send a post request to the server with this information
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    //If successful redirect user to dashboard page else display an error message
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signin").value.trim();
  const email = document.querySelector("#email-signin").value.trim();
  const password = document.querySelector("#password-signin").value;

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create account");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormerHandler);

document
  .querySelector("signin-form")
  .addEventListener("submit", signupFormHandler);
