// const loginFormHandler = async (event) => {
//   event.preventDefault();

//   const username = document.querySelector('#username-login').value.trim();
//   const password = document.querySelector('#password-login').value.trim();

//   if (username && password) {
//     console.log(username, password)
    
//     const response = await fetch('/api/users/login', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const result = await response.json()
//     console.log(result)

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert('Failed to log in.');
//     }
//   }
// };


// document.querySelector('#login-form')?.addEventListener('submit', loginFormHandler);




















// const signupFormHandler = async (event) => {
//   event.preventDefault();

//   const username = document.querySelector('#username-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();
  
//   if ( username && password) {
//     console.log(username, password)
//     const response = await fetch('/api/users/signup', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const result = await response.json()
//     console.log(result)

//     console.log(response)
  
//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert(result.payload);
//     }
//   }
// };


// document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);
