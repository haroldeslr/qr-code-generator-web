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
    reason != "" &&
    fullName.length >= 5 &&
    fullName.length <= 70 &&
    contactNumber.length >= 9 &&
    contactNumber.length <= 12 &&
    address.length >= 3 &&
    address.length <= 70 &&
    age.length <= 2 &&
    temperature.length >= 2 &&
    temperature.length <= 5
  ) {
    let userData = getUserValues();
    generateQRCode(userData);
  } else {
    alert("Please fill up the form properly");
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
