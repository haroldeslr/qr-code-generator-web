// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// Prevent form is refreshing the page in submit form
let form = document.getElementById("main-form");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

function generateQRCode(userData) {
  $("#qr-code-modal").modal("show");

  let qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = "";

  new QRious({
    element: qrcodeContainer,
    value: userData,
    background: "#ffffff",
    backgroundAlpha: 1,
    foreground: "#000000",
    foregroundAlpha: 1,
    level: "H",
    padding: 25,
    size: 300,
  });

  document.getElementById("qrcode-container").style.display = "block";
}

function validateForm() {
  let fullName = document.forms["personal-information-form"]["full-name"].value;
  let contactNumber =
    document.forms["personal-information-form"]["contact-number"].value;
  let address = document.forms["personal-information-form"]["address"].value;
  let age = document.forms["personal-information-form"]["age"].value;
  let temperature =
    document.forms["personal-information-form"]["temperature"].value;
  let gender = document.querySelector(
    'input[name="gender-radio-input"]:checked'
  );
  let reason = document.forms["personal-information-form"]["reason"].value;

  if (
    fullName != "" &&
    contactNumber != "" &&
    Number.isInteger(parseInt(contactNumber)) &&
    address != "" &&
    age != "" &&
    Number.isInteger(parseInt(age)) &&
    temperature != "" &&
    Number.isInteger(parseInt(temperature)) &&
    gender != null &&
    reason != ""
  ) {
    let userData = getUserValues();
    generateQRCode(userData);
  }
}

function getUserValues() {
  let qrCodeIdentifier = "UPANG_QR_CODE";
  let fullName = document.forms["personal-information-form"]["full-name"].value;
  let contactNumber =
    document.forms["personal-information-form"]["contact-number"].value;
  let address = document.forms["personal-information-form"]["address"].value;
  let age = document.forms["personal-information-form"]["age"].value;
  let temperature =
    document.forms["personal-information-form"]["temperature"].value;
  let gender = "";
  let reason = document.forms["personal-information-form"]["reason"].value;

  let genders = document.getElementsByName("gender-radio-input");
  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked) {
      gender = genders[i].value;
      break;
    }
  }

  let userData =
    qrCodeIdentifier +
    fullName +
    ",,,," +
    contactNumber +
    ",,,," +
    address +
    ",,,," +
    age +
    ",,,," +
    temperature +
    ",,,," +
    gender +
    ",,,," +
    reason;

  return userData;
}
