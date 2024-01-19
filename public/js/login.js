const loginFormerHandler = async (event) => {
  console.log("loginFormerHandler called");
  event.preventDefault();
  //Collect value from the login form
  const username = document.querySelector("#user-input").value.trim();
  const password = document.querySelector("#password_login").value.trim();
  if (username && password) {
    //Send a post request to the server with this information
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    //If successful redirect user to dashboard page else display an error message
    if (response.ok) {
      console.log("Sucessful login!");
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const elem = document.querySelector(".login-form");

console.log(elem);
elem.addEventListener("submit", loginFormerHandler);
