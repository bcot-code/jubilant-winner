const signup = async () => {
  // Get user info from the form fields.
  let name = document.getElementById("username").value;
  let email = document.getElementById("email-sign").value;
  let password1 = document.getElementById("passWord").value;
  let password2 = document.getElementById("password2").value;
  if (password1 !== password2) {
    alert("Passwords do not match!");
    return false;
  }
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password: password1,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log("User created!");
    document.location.replace("/dashboard");
  } catch (err) {
    console.log(err);
    alert("Failed to create account! Please try again later.");
  }
};

document.querySelector("#sign_up_form").addEventListener("submit", signup);
