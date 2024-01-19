const newPost = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#post_title").value.trim();
  const post_subtitle = document.querySelector("#post_subtitle").value.trim();
  const content = document.querySelector("#post_content").value.trim();

  if (name && post_subtitle && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ name, post_subtitle, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create a post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

document.querySelector(".new_post-form").addEventListener("submit", newPost);
document
  .querySelector(".post_list")
  .addEventListener("click", delButtonHandler);
