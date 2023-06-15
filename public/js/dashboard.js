const newPostBtn = document.getElementById('new-post-btn')
const submitNewPostBtn = document.getElementById('submit-new-post-btn')
const newPostForm = document.getElementById('new-post-form')

newPostBtn.addEventListener("click", function () {
    console.log("clicked")
    newPostForm.setAttribute("class", "")
})

// Create new blog
submitNewPostBtn.addEventListener("click", function (e) {
    e.preventDefault()
    console.log("clicked submit btn")
    const postTitle = document.getElementById('post-title').value
    const postBody = document.getElementById('post-body').value
    const postObj = {title: postTitle, body: postBody}
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res =>{
        if(res.ok){
            location.reload()
            console.log(res)
        } else {
            console.log(res);
            console.log(postObj)
            alert("Something went wrong!")
        }
    });
});


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("card")) {
        console.log("clicked card")
        e.target.setAttribute("class","hidden");
        let editCard = document.getElementById(`edit-${e.target.id}`)
        editCard.setAttribute("class","")
    }
});


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.delete-btn')
    .addEventListener('click', delButtonHandler);


const updateBtn = document.getElementsByClassName('update-btn');

updateBtn.addEventListener("click", function (e)  {
    console.log("clicked!");
});
