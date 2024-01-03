const deletepost = async (event) => {
  // console.log("delete button clicked");
  event.preventDefault();
  let post_id = window.location.toString().split("/").pop();
  if (post_id) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  } else {
    alert("No Post ID found!");
  }
};
// Listen for a click on the delete button, and run the deletePost function
document.querySelector(".delBtn").addEventListener("click", deletepost);
