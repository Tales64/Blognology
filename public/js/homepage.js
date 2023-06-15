document
.querySelector('#delete')
.addEventListener('click', (e)=> {
  e.preventDefault();

  const blogID = document.querySelector("#edit-blog-id").value;
  fetch(('api/blogs/${blogId}'), {
      method:"DELETE",
  }).then (res => {
      if(res.ok){
          location.href="/dashboard"
      } else {
          alert("Failed to delete blog.")
      }
  })



});