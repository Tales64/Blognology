const commentBtn = document.getElementById('commentBtn')

console.log("help")

commentBtn.addEventListener('click',function(e){
    e.preventDefault()
    console.log("comment button click")
    const commentTxt = document.getElementById('comment-text').value
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(commentTxt),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res =>{
        if(res.ok){
            location.reload()
        } else {
            console.log(res);
            console.log(commentTxt)
            alert("Something went wrong!")
        }
    });
});