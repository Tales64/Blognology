const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = {
      body:document.querySelector('#Newcomment').value,
      blogId:document.querySelector('#comment-description').value,
    }
  
        fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(comment ),
        headers: { 'Content-Type': 'application/json' },
      });
  
       
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Try again.');
        }
       
    };
   

    const delButtonHandler = async (event) => {
      if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        const response = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.replace('/comment');
        } else {
          alert('Failed to delete project');
        }
      }
    };
    
    document
      .querySelector('.delete-btn')
      .addEventListener('click', delButtonHandler);

    
  document
  .querySelector('#newComment')
  .addEventListener('submit', commentFormHandler);
  