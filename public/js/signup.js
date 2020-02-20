$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let firstNameInput = $("#first-name");
  let lastNameInput = $("#last-name");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");
  let passwordVerify = $("input#password-verify");
  let ageVerify = $("#verify-age");

  let boxStatus = "unchecked"

  // When the status of the checkbox changes, change the boxStatus variable   
  ageVerify.on("change", function(event){
      event.preventDefault();
      if (boxStatus === "unchecked"){
          boxStatus = "checked"
      } else if (boxStatus = "checked") {
          boxStatus = "unchecked"
      }
      console.log(boxStatus);
  })

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      passwordVerify: passwordVerify.val().trim(),
    };

    // Checks to see if all fields have input
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.passwordVerify) {

        handleIncompleteField();
      return;
    }

    // Checks to see if passwords match
    if (passwordInput.val().trim() !== passwordVerify.val().trim()){
        handleMismatchingPasswords();;
        return;
    }
    
    // Checks to see if user is of age
    if (boxStatus === "unchecked") {
        handleUnderEighteen();
        return;
    };
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleDuplicateAccount);
  }

  function handleDuplicateAccount() {
    $("#alert .msg").text("An account with this email has already been created");
    $("#alert").fadeIn(500);
  }
  function handleIncompleteField() {
    $("#alert .msg").text("Please fill out every field");
    $("#alert").fadeIn(500);
  }
  function handleUnderEighteen(){
    $("#alert .msg").text("You must be at least 18 years of age to create an account");
    $("#alert").fadeIn(500);
  }
  function handleMismatchingPasswords(){
    $("#alert .msg").text("Please make sure that your passwords match");
    $("#alert").fadeIn(500);
  }
});
