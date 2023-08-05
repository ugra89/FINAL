window.onload = async () => {
  const response = await fetch('https://localhost:8080/register-user');
  const guests = await response.json();
  console.log(guests);
};
