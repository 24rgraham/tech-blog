const postId = document.getElementById("postId").textContent;

async function newEventHandler(e) {
  e.preventDefault();
  console.log("hi");

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-body"]').value;  
 
  const res = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
    headers: {
        "Content-Type": "application/json",
    },
});
  console.log(res);
  if (res.ok) {
    location.replace("/");
  } else {
    alert("Failed to update post");
  }
}

  document.querySelector("#new-event-form").addEventListener("submit", newEventHandler);