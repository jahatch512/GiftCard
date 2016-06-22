var $ = require("jquery");
var myStorage = localStorage;

var codes = {"1234567891234567": "1234", "987654321987654": "4321"};
var users = {"james@gmail.com": {"password": "password1", "credit": 250},
            "symphony.gmail": {"password": "password2", "credit": 4000}};



$( "#sign-in-button" ).click(function() {
  window.location = "signIn.html";

  //COMMENT: If I wanted to keep this a single page application, I could simply
  // empty the main body of the doc using jQuery and then append the appropriate
  // HTML of the next page as such:

  // $("#main-body").empty();
  // var signInForm = '<form id="sign-in-form"><input type="text" value="email" ><input type="text" value="password"><input type="submit" value="Go"></form>';
  // $("#main-body").append(signInForm);

});

$( "#sign-up-button" ).click(function() {
  window.location = "signUp.html";
});

$("#login").click(function() {
  event.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  if ((users[email]) && (users[email]["password"] === password)) {
    myStorage.setItem("currentUser", email);
    myStorage.setItem("credit", users[email]["credit"]);
    window.location = "redeem.html";

  } else {
    alert("invalid username/password");
  }
});

$("#sign-up").click(function() {
  event.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  if (email === "") {
    alert("email can't be blank");

  } else if (password === ""){
    alert("password can't be blank");

  } else {
    myStorage.setItem("currentUser", email);
    myStorage.setItem("credit", 0);
    window.location = "redeem.html";
  }
});


$("#welcome").text("Welcome " + myStorage.getItem("currentUser"));
$("#balance").text("Your current credit balance is " +
                    myStorage.getItem("credit"));
