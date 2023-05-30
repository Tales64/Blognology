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
   

  document
  .querySelector('#newComment')
  .addEventListener('submit', commentFormHandler);