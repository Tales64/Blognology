// const { response } = require("express");

const { response } = require("express");

/// for New Blog
const newBlog = document
.querySelector('#newBlog')
.addEventListener('submit', event =>{
  
  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;

  event.preventDefault();
  if (!title || !description) {
    alert('Type Title and Descriprion, please.')
    return;
  }
  const blogItem = {
    title: title, 
    description:description,
  }

    fetch('/api/blogs', {
    method: 'POST',
    body: JSON.stringify({ blogItem }),
    headers: { 'Content-Type': 'application/json' },
  }).then (res => {
    if(response.ok){
      
      createNew.setAttribute('hidden', 'false')
      document.location.reload();
    } else {
      alert('Try again.');
    }
  })
})

       

function hideCreateNew();{
hideCreateNew.hidden=true;
} 
hideCreateNew();


   
  
    // const newBlog = document.querySelector('#blog-title').value.trim();
    const newPost = document
    .querySelector('#newPost').value.trim();
     newPost.addEventListener('submit', event =>{
      event.preventDefault();
      currentBlog.hidden=true;
      newPost.hidden = true;
      createNew = hidden= false;
    });

    const currentBlog = document.querySelector('#currentblogs')
    const createNew = document.querySelector('createNew')
   
//     newPost.addEventListener('Submit',event =>{

//       event.preventDefault()

//     })
  
//     if (title && description) {
//       const response = await fetch('/api/blogs', {
//         method: 'POST',
//         body: JSON.stringify({ title, description }),
//         headers: { 'Content-Type': 'application/json' },
        
//       });
  
//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         alert('Failed to create blog.');
//       }
//     }
//   };
//   console.log('test');
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id)')){
//       const id = event.target.getAttribute('data-id');
//       const res = await fetch(`/api/blogs/${id}`, {
//         method: 'delete',
//       })
//       if (response.ok){
//         document.location.replace('/dashboard');
//       }else{
//         alert('Failed to delete blog.');
//       }
//       }
//     }
  

//   // document
//   // .querySelector('.new-blog-form')
//   // .addEventListener('submit', newFormHandler);

//   document.querySelector('#create-button')
//   .addEventListener('submit', newFormHandler);
// console.log('test2');

//   // document.querySelector('.blog-list')
//   // .addEventListener('click',delButtonHandler);