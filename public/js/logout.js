const logout = async () => {
  console.log("Logging out");
  await fetch("/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};
console.log("test!");
document.querySelector("#logout").addEventListener("click", logout);
