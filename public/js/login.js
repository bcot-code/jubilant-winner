const loginFormerHandler = async (event) => {
  //console.log("loginFormerHandler called");
  event.preventDefault();
  //Collect value from the login form
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#passWord_login").value.trim();
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

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormerHandler);
