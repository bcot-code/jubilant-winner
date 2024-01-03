const updatepost = async () => {
  //get the post id from url parameters
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  if (!id) {
    alert("No Post ID provided");
    window.location.href = "/";
  }
  const response = await fetch(`/api/posts/${id}`, { method: "GET" });
  if (response.ok) {
    document.querySelector("#title").value = response.title;
    document.querySelector("#body-content").innerHTML = response.body;
    document.querySelector("#blogId").value = response.blog_id;
    document.getElementById("submit").addEventListener("click", function () {
      submitForm();
    });
  } else {
    alert("Failed to load post");
  }
};
updatepost();
const submitForm = async () => {
  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body-content").value;
  let blogId = document.querySelector("#blogId").value;
  console.log(title, body, blogId);
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      blog_id: blogId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  if (response.errors) {
    let errors = response.errors;
    let field = Object.keys(errors)[0];
    alert(field + ": " + errors[field]);
  } else {
    location.replace("/dashboard");
  }
};
