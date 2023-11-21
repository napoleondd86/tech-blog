const loginArea = document.querySelector("#login-here")
const loginLink = document.querySelector("#login-link")

const signupLink = document.querySelector("#signup-link")
const signupArea = document.querySelector("#signup-here")









function handleLoginClick(){
  const url = window.location.href.split("?")[0];
  window.location.href = `${url}?showlogin=true`
}


function checkForLogin(){
  const href = window.location.href
  const params = href.split("?")[1]
  console.log(params)
  if(params?.split("=")[0] === "showlogin"){
    console.log("show login")
    loginArea.style.display = "block"
  }
}

loginLink?.addEventListener("click", function(e){
  e.preventDefault()
  handleLoginClick()
})

checkForLogin()







function handleSignupClick(){
  const url = window.location.href.split("?")[0];
  window.location.href = `${url}?showsignup=true`
}

function checkForSignup(){
  const href = window.location.href;
  const params = href.split("?")[1];
  console.log(params)
  if(params?.split("=")[0] === "showsignup") {
    signupArea.style.display = "block"
  }
}

checkForSignup()

signupLink?.addEventListener("click", function(e){
  e.preventDefault()
  handleSignupClick()
})







function toggleComments(blogpostId) {
  let commentsContainer = document.getElementById('comments-' + blogpostId);
  if(commentsContainer.innerHTML === "") {
    fetchComments(blogpostId)
  } 
  commentsContainer.style.display = comments.style.display === "none" ? "block" : "none";
}

function fetchComments(blogpostId){
  fetch("/api/comments" + blogpostId)
    .then(response => response.json())
    .then(comments => {
      const commentsContainer = document.getElementById("comments-" + blogpostId);
      comments.foreach(comment => {
        const commentEl = `
        <div class="comment">
          <p>${comment.content}</p>
          <p>--${comment.user_id}, ${new Date(comment.created_at).toLocaleString()}</p>
        </div>
        `;
        commentsContainer.innerHTML += commentEl;
      })
      
})
  .catch(error => console.error("Error:", error));
}