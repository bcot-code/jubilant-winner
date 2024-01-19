const current_posts = async (event) => {
  event.preventDefault();
  let postId = event.target.dataset.id;
  console.log(postId);
  if (!postId) {
    postId = 0;
  }

  const title = document.querySelector('input[name="post_title"]').value;
  const ptext = document.querySelector('textarea["name=post').value;
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      ptext,
    }),
    headers: { "Content-Type": "application/json" },
  });
  //checking to make sure the response was successful
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to load posts");
  }
};
document.querySelector("").addEventListener("submit", myposts);
