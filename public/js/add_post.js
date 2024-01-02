const add_post = async () => {
  let title = document.querySelector("#title").value;
  let content = document.querySelector("#content").value;
  if (title === "" || content === "") {
    alert("Please fill out all fields");
  } else {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, content: content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success!", data);
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};
document.getElementById("addPostBtn").addEventListener("click", add_post);
