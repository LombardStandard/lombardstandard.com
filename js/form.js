const handleSubmit = (event) => {
  event.preventDefault();
  
  const registerform = event.target;
  const formData = new FormData(registerform);
     
  fetch("/", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams(formData).toString(),
  })
  .then(() => alert("Thanks for your submission."))
  .then(() => document.getElementById("registerform").reset())  
  .then(() => document.getElementById("submitButton").disabled = true)  
  .catch((error) => alert(error))
  };

function validateEmail() {
  var email = document.getElementById("textEmail").value;
  var Error = document.getElementById("errorEmail");
  Error.innerHTML = "";
  
  var expr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!expr.test(email)) {
      Error.innerHTML = "Invalid email address";
      document.getElementById("submitButton").disabled = true;
  }
  else {document.getElementById("submitButton").disabled = false;}
}

document.querySelector("form").addEventListener("submit", handleSubmit);
