(function () {
  let errorFlag = true;

  // ::: DOM selction variables :::
  const subject = document.querySelector("#subject");
  const email = document.querySelector("#email");
  const msg = document.querySelector("#msg");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const fullnameReg = document.querySelector("#fullname");
  const usernameReg = document.querySelector("#usernameReg");
  const passwordReg = document.querySelector("#passwordReg");
  const passwordRegConfirm = document.querySelector("#passwordRegConfirm");
  const regBtn = document.querySelector("#regBtn");
  const logBtn = document.querySelector("#logBtn");
  const sendBtn = document.querySelector("#sendBtn");

  // ::: array of all the form elements :::
  const formElements = [
    subject,
    email,
    msg,
    username,
    password,
    fullnameReg,
    usernameReg,
    passwordReg,
    passwordRegConfirm,
  ];

  // form button array
  const formButtons = [regBtn, logBtn, sendBtn];

  // ::: regex :::
  const emailReg = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
  const passRexEx = /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[!@#$%^&*()'"]))[A-Za-z\d!@#$%^&*()'"](?!\s).{5,21}$/;
  const usernameRegEx = /^[a-zA-Z0-9][a-zA-Z0-9_]{2,29}$/;

  //error messages show and hide functions
  function showErr(current) {
    current.classList.add("is-invalid");
    current.classList.remove("is-valid");
    current.nextElementSibling.style.opacity = "0";
    current.nextElementSibling.nextElementSibling.style.opacity = "1";
  }

  function showOK(current) {
    current.classList.remove("is-invalid");
    current.classList.add("is-valid");
    current.nextElementSibling.style.opacity = "1";
    current.nextElementSibling.nextElementSibling.style.opacity = "0";
  }

  //enables submit button if there is no errors, selects button by input type
  function submitPass(btn) {
    if (errorFlag) {
      btn.disabled = true;
      console.log("btn disabling");
    } else {
      btn.disabled = false;
      console.log("btn enabling");
    }
  }

  //the form validation function
  function runValidation(e) {
    if (e.which == 13) {
      e.preventDefault();
    }
    const userInput = e.target.value;

    //   ::: checking emptiness for any in the list :::
    if (!userInput.length) {
      showErr(e.target);
      errorFlag = true;
    } else {
      showOK(e.target);
      errorFlag = false;
    }

    // :::extra validation for email :::
    if (e.target.getAttribute("type") == "email") {
      // check user input against expression
      if (!userInput.match(emailReg)) {
        showErr(e.target);
      } else {
        showOK(e.target);
        errorFlag = false;
      }
    }

    // ::: for username registration :::
    if (e.target.getAttribute("id") == "usernameReg") {
      if (!userInput.match(usernameRegEx)) {
        showErr(e.target);
        errorFlag = true;
      } else {
        showOK(e.target);
        errorFlag = false;
      }
    }

    if (e.target.getAttribute("id") == "passwordReg") {
      if (!userInput.match(passRexEx)) {
        showErr(e.target);
        errorFlag = true;
      } else {
        showOK(e.target);
        errorFlag = false;
      }
    }
    if (e.target.getAttribute("id") == "passwordRegConfirm") {
      if (
        passwordReg.value != passwordRegConfirm.value ||
        !userInput.match(passRexEx)
      ) {
        showErr(e.target);
        errorFlag = true;
      } else {
        showOK(e.target);
        errorFlag = false;
      }
    }
  }
  console.log(formButtons);
  //adding submit button validations (mouse hover trigger not working)
  formButtons.forEach((item) => {
    if (item) {
      item.addEventListener("mouseenter", submitPass(item));
    }
  });

  // ::adding event listener to all the elements in the formElements array
  formElements.forEach((item) => {
    if (item) {
      item.addEventListener("keyup", runValidation);
    }
  });
  formElements.forEach((item) => {
    if (item) {
      item.addEventListener("blur", runValidation);
    }
  });

  // console.log(email.nextElementSibling);
  // email.previousElementSibling.style.opacity = "1";
})();
