const PostId = document.getElementById('post-id').textContent;


// display comments
fetch(`/api/comments/` + PostId ).then(function (response) {
    response.json().then(function (data) {
        const comments = data

        if (comments.length === 0) { document.getElementById('comments').style.display = 'none' }
        for (var i = 0; i < comments.length; i++) {
            var thing = comments[i];

            var li = document.createElement("li");
            li.textContent = '"'+thing.content+'"  -'+thing.User.name;
            li.setAttribute("class", "card-text");
            document.getElementById('comments').appendChild(li);
        }
    });
});


// new comment
const newComment = document.querySelector("#commentSave");

newComment.addEventListener("click", e => {
    e.preventDefault();    
        const commentObj = {
            content: document.querySelector("#commentContent").value,
            PostId: PostId,
        }
        console.log(commentObj);
        
        fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify(commentObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert("failed")
                location.reload();
            }
        })
})