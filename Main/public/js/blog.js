// /// for New Blog

// const blogFormHandler = async (event) => {
//     event.preventDefault();
  
//     const blogId = document.querySelector('#.new-blog-form').dataset.blogId;
//     const blogDescription = document.querySelector('#blog-description').value.trim();
  
//     if (blogDescription) {
//         await fetch('/api/blogs', {
//         method: 'POST',
//         body: JSON.stringify({ blogId, blogDescription }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.reload();
//       } else {
//         alert('Try again.');
//       }
//     }
//   };

//   document
//   .querySelector('.new-blog-form')
//   .addEventListener('submit', blogFormHandler);