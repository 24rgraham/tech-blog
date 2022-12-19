

let body;
let isPrivate;

async function newEventHandler(e) {
  e.preventDefault();
  console.log("hi");

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-body"]').value;
  const UserId = document.querySelector("#user-name").textContent;

  console.log(UserId);
  console.log(body);

  const res = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
        "Content-Type": "application/json",
    },
});
  console.log(res);
  if (res.ok) {
    location.replace("/");
  } else {
    alert("Failed to create event");
  }
}

  document.querySelector("#new-event-form").addEventListener("submit", newEventHandler);