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
