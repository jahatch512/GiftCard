var $ = require("jquery");
var myStorage = localStorage;

var codes = {"1234567891234567": {"pin": "1234", "value": 100},
             "987654321987654": {"pin": "4321", "value": 350}};

var users = {"james@gmail.com": {"password": "password1", "credit": 250},
             "symphony@gmail.com": {"password": "password2", "credit": 4000}};



$("#sign-in-button" ).click(function() {
  event.preventDefault();
  window.location = "signIn.html";

  //COMMENT: If I wanted to keep this a single page application, I could simply
  // empty the main body of the doc using jQuery and then append the appropriate
  // HTML of the next page as such:

  // $("#main-body").empty();
  // var signInForm = '<form id="sign-in-form"><input type="text" value="email" ><input type="text" value="password"><input type="submit" value="Go"></form>';
  // $("#main-body").append(signInForm);
});

$("#sign-up-button" ).click(function() {
  event.preventDefault();
  window.location = "signUp.html";
});

$("#login").click(function() {
  event.preventDefault();
  var email = $("#email").val();
  var password = $("#password").val();

  if ((users[email]) && (users[email]["password"] === password)) {
    myStorage.setItem("currentUser", email);
    myStorage.setItem("credit", users[email]["credit"]);
    window.location = "validateCard.html";

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
    window.location = "validateCard.html";
  }
});

$("#redeem").click(function() {
  event.preventDefault();
  var code = $("#code").val();
  var pin = $("#pin").val();

  if ((code === "") || (code.length !== 16)) {
    alert("Please enter a 16-digit gift card code");

  } else if ((pin === "") || (pin.length !== 4)){
    alert("Please enter a 4-digit pin number");

  } else if (codes[code]){
      if (codes[code]["pin"] !== pin){
        alert("this pin does not match the card code");
      } else {
        myStorage.setItem("codeAmount", codes[code]["value"]);
        var newBalance = parseInt(myStorage.getItem("credit")) + codes[code]["value"];
        myStorage.setItem("newBalance", newBalance);
        window.location = "redemption.html";
      }
  } else {
    alert("this card code does not exist, please check to make sure you input correctly and try again");
  }

});


$("#welcome").text("Welcome " + myStorage.getItem("currentUser"));
$("#balance").text("Your current credit balance is " +
                    myStorage.getItem("credit"));

$("#current-balance").text("Previous Balance: " + myStorage.getItem("credit"));
$("#added-value").text("Gift Card Value: " + myStorage.getItem("codeAmount"));
$("#new-balance").text("New Balance: " + myStorage.getItem("newBalance"));

$("#closing-statement").text("This new balance will be assigned to your account at " + myStorage.getItem("currentUser"));
