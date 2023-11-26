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


// if comments container is "display-none" turn to "display-block"
// if comments container is "display-block" to to "display- none"

// DISPLAY COMMENTS OR UNDISPLAY
function toggleComments(blogpostId) {
  let commentsContainer = document.getElementById('comments-' + blogpostId);
  if(commentsContainer.style.display === "none") {
    commentsContainer.style.display = "block"  
  } else {
    commentsContainer.style.display = "none"  
  }
}

async function deleteBlogpost(blogpostId){
  console.log("inside client  deleteblogpost function")
  // let blogpost = document.getElementById("blogpost-" + blogpostId);
  const response = await fetch(`/api/blogpost/${blogpostId}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  })
  if(response.ok){
    window.location.reload() // WHEN RELOADS IT RUNS "newBlogpost()"
  }
}

function updateBlogpost(blogpostId){
  const title = document.getElementById(`title-${blogpostId}`)
  var currentTitle = title.innerText;
  const content = document.getElementById(`content-${blogpostId}`)
  var currentContent = content.innerText;

  // REPLACE THE H2-tag with input fields
  var titleInputField = `<input type="text" id="update-title-${blogpostId}" value="${currentTitle}" />`;
  title.outerHTML = titleInputField
  
  var contentInputField = `<input type="text" id="update-content-${blogpostId}" value="${currentContent}" />`;
  contentInputField += `<button onclick="submitUpdate('${blogpostId}')" >Save</button>`;
  content.outerHTML = contentInputField

}

async function submitUpdate(blogpostId){
  console.log("inside client updateBlogpost function");
  var content = document.getElementById("update-content-" + blogpostId)
  var title = document.getElementById("update-title-" + blogpostId)

  const response = await fetch(`/api/blogpost/${blogpostId}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: {"Content-Type": "application/json"}
  })
  if(response.ok){
    // Replace the inputfields back to ptag and h2 respectively
    var contentInput = document.getElementById("update-content-" + blogpostId);
    var titleInput = document.getElementById("update-title-" + blogpostId);
    contentInput.outerHTML = `<p id="content-${blogpostId}">${content}</p>`;
    titleInput.outerHTML = `<h2 id="title-${blogpostId}">${title}</h2>`

    window.location.reload()
  }
}

function newBlogpost(){
  const myBlogpostsContainer = document.getElementById("blogpostsContainer");
  let newBlogpost = document.getElementById("new-blogpost")
  if(newBlogpost){
    console.log("new blogpost el exists")
    newBlogpost.style.display = "block"
    return
  } 
  console.log("outside of the if statment")
    const blogpostEl = `
    <div id="new-blogpost" >
      <header>
        <h2>Create New Blogpost</h2>
      </header>
      <div>
        <form id="new-blogpost-form">
          <label for="title">Title</label>
          <input type="text" id="title" name="new-blogpost">
          <label for="title">Content</label>
          <input type="text" id="content" name="new-blogpost">
          <input type="submit" value="Create" >
        </form>
      </div>
    </div>
  
    `
 
   myBlogpostsContainer.innerHTML += blogpostEl;

  const newBlogpostEl = document.getElementById("new-blogpost-form");
  newBlogpostEl?.addEventListener("submit", blogpost)
}


// NEW BLOGPOST
const blogpost = async function(e){
    e.preventDefault();
    console.log("inside newBlogpost")
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    
    const response = await fetch ("/api/blogpost", {
      method: "POST",
      body: JSON.stringify({title, content}),
      headers: {"Content-Type": "application/json"},
    })
    console.log("blogpost submitted")
    if(response.ok){
      window.location.reload()
    }
}



// NEW COMMENT
const newComment = async function(e){
  const commentForm = e.target;
  const blogpost_id = commentForm.id.split("-")[1];
  console.log(blogpost_id)
  const content = document.getElementById(`newComment-${blogpost_id}`).value;
  console.log(content)
  const response = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({content, blogpost_id}),
    headers: {"Content-Type": "application/json"}
  })
  console.log("comment submitted");
  if(response.ok){
    window.location.reload()
  }
}

document.getElementById("blogpostsContainer")?.addEventListener("submit", (e) => {
  e.preventDefault();
  newComment(e)
})

// ACTUAL LOGIN
const login = document.getElementById("login-here");
login?.addEventListener("submit", async function(e){
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  if (username && password) {
    console.log(username, password);

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password}),
      headers: {"Content-Type": "application/json"}
    });
    // cleaning the response
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("failed to Login")
    }
  }
})

const signup = document.getElementById("signup-here");
signup?.addEventListener("submit", async function(e){
  e.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  if (username && password) {
    console.log(username, password);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ username, password}),
      headers: {"Content-Type": "application/json"}
    });
    // cleaning the response
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("failed to Signup")
    }
  }
})

const newblogBtn = document.getElementById("newBlogBtn");  
newblogBtn?.addEventListener("click", (e) => {
  e.preventDefault()
  newBlogpost()
})

signupLink?.addEventListener("click", function(e){
  e.preventDefault()
  handleSignupClick()
})

loginLink?.addEventListener("click", function(e){
  e.preventDefault()
  handleLoginClick()
})


//////////////////// ALTERNATIVE TO ABOVE, WHICH IS BETTER ???????????????
// const login = document.getElementById("login-here");

// const formHandler = async(e) => {
//   e.preventDefault();
//   console.log("hello")
//   const form = e.target;
//   const username = document.getElementById("login-username").value.trim();
//   const password = document.getElementById("login-password").value.trim();

//   let payload = {username, password}
//   let url= "";

//   if (form.id === "login-here"){
//     url = "/api/user/login"
//   } else if (form.id === "signup-here"){
//     //if we wanted to add an email input
//     //const email = form.querySelector("#email").value.trim();
//     // payload.email = email;
//     url = "/api/user/signup"
//   }

//   if (username && password) {
//     console.log(username, password);
    
//     const response = await fetch(url, {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: {"Content-Type": "application/json"}
//     });
//     // cleaning the response
//     const result = await response.json(payload);
//     console.log(result);
    
//     if (response.ok) {
//       document.location.replace("/");
//     } else {
//       alert("failed to login or signup")
//     }
//   }
// }

// document.getElementById("login-here")?.addEventListener("submit", formHandler)
// document.getElementById("signup-here")?.addEventListener("submit", formHandler)


// document.getElementById("blogpost-container").addEventListener("click", toggleComments)