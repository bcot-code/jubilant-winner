const comment = async () => {
  /*
   * This is a JavaScript file that contains the code for creating and posting comments to a blog post.
   */
  // Get the necessary information from the user
  let username = prompt("Please enter your username: ");
  let password = prompt("Please enter your password: ");
  let postId = prompt("Enter the ID of the post you want to comment on: ");
  let commentText = prompt("Enter your comment here: ");
  // Check if the inputs are empty or null
  if (username == "" || password == "" || postId == "" || commentText == "") {
    alert("One or more fields were left blank.");
    return;
  }
  // Create an object with the user's credentials
  var data = JSON.stringify({ username: username, password: password });
  // Send a POST request to authenticate the user
  await fetch("http://localhost:8000/api/auth", { method: "POST", body: data })
    .then((response) => response.json())
    .then((userData) => {
      console.log(userData);
      // If authentication was successful, create a comment and send it to the server
      if (!userData["error"]) {
        // Add the user token to the headers of the request
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData["token"]}`);
        // Make the HTTP request
        fetch(`http://localhost:8000/api/posts/${postId}/comments`, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ text: commentText }),
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        alert("Incorrect username or password");
      }
    });
};
// Call the function when the page loads
window.onload = comment;
