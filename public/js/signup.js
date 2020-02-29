$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let firstNameInput = $("#first-name");
  let lastNameInput = $("#last-name");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");
  let passwordVerify = $("input#password-verify");
  let ageVerify = $("#verify-age");

  let boxStatus = false;

  // When the status of the checkbox changes, change the boxStatus variable   
  ageVerify.on("change", function(event){
      event.preventDefault();
      boxStatus = !boxStatus;
      console.log(boxStatus);
  })

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    // Making sure that only the first letter of each name is uppercase, and the entire email address is lowecase before putting it in our object
    let userData;
    if (firstNameInput.val() == "" || lastNameInput.val() == ""){
        handleIncompleteField();
    } else {

        let firstName = firstNameInput.val().trim()[0].toUpperCase().concat(firstNameInput.val().trim().substring(1).toLowerCase());
    
        let lastName = lastNameInput.val().trim()[0].toUpperCase().concat(lastNameInput.val().trim().substring(1).toLowerCase());
    
        let email = emailInput.val().trim().toLowerCase();

        userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: passwordInput.val().trim(),
          passwordVerify: passwordVerify.val().trim()
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
    if (boxStatus === false) {
        handleUnderEighteen();
        return;
    };
    // If we have an email and password, run the signUpUser function
    // signUpUser(userData.email, userData.password);
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    }   
});

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", userData)
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