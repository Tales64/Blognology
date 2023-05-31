// const blogFormHandler = async (event) => {
//     event.preventDefault();
  
//     const blog_id = document.querySelector('#.new-blog-form').dataset.blogid;
//     const blog_description = document.querySelector('#blog-description').value.trim();
  
//     if (blog_description) {
//         await fetch('/api/blog', {
//         method: 'POST',
//         body: JSON.stringify({ blog_id, blog_description }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.reload();
//       } else {
//         alert('Try again.');
//       }
//     }
//   };

document
.querySelector('#delete')
.addEventListener('click', (e)=> {
  (e).preventDefault();

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