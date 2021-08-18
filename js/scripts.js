const elmCancel = document.getElementById("cancel")
const elmClose = document.getElementById("close"); 
const elmForm = document.getElementById("signup-form");
const elmHeader = document.getElementsByClassName("pop-up__header")[0];
const elmModal = document.getElementById("modal");
const elmReceipt = document.getElementById("receipt");
const elmSignup = document.getElementById("sign-up");

elmCancel.addEventListener("click", togglePopup);
elmClose.addEventListener("click", togglePopup);
elmSignup.addEventListener("click", togglePopup);

function togglePopup() {
  elmModal.classList.toggle("hidden");
}
function closeReceipt() {
  elmForm.classList.remove("hidden");
  elmReceipt.innerHTML = "";
  elmHeader.innerHTML = "Sign up form";
  elmClose.removeEventListener("click", closeReceipt);
  elmClose.addEventListener("click", togglePopup);
  togglePopup();
}

elmForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://reqres.in/api/users'); // Using users because the create end point doesn't seem to work properly

  let data = new FormData(elmForm);

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  xhr.send(data); 

  xhr.onload = () => {
      showReceipt(data);
  }
  
});

var showReceipt = ((data) => {
  elmForm.classList.add("hidden");
  elmForm.reset();
  elmHeader.innerHTML = "Succes!";
  const receiptHTML = 
  `
    <p>You created a profile with the following data:</p>
    <p>First name: ${data.get("firstname")}</p>
    <p>Last name: ${data.get("lastname")}</p>
    <p>Gender: ${data.get("gender")}</p>
    <p>Phone: ${data.get("phone")}</p>
    <p>E-mail: ${data.get("email")}</p>
  `;
  elmReceipt.innerHTML = receiptHTML;
  elmClose.removeEventListener("click", togglePopup);
  elmClose.addEventListener("click", closeReceipt);
});