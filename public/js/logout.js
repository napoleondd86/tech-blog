const logOut = async () => {
  console.log("logout post")
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log("inside logout post")

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout')?.addEventListener('click', logOut);
