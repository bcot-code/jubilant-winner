async function registerFormHanlder(event) {
  event.preventDefault();
  let username = document.querySelector("username").value;
  let password = document.querySelector("password").value;
  let repeatPassword = document.querySelector("#repeat-pass").value;
  if (username == "" || password == "" || repeatPassword == "") {
    alert("All fields must be filled!");
  } else {
    if (password != repeatPassword) {
      alert("Passwords do not match");
    } else {
      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };
      fetch("/register", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          window.location.href = "/";
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  }
}

document
  .getElementById("registration")
  .addEventListener("submit", registerFormHanlder);
