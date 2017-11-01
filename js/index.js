$(function() {
  
  var player1 = true;
  var finish = false;
  var playWithPC = false;
  
  // resetting the game
  $("p").on("click", function() {
    $("td").html("");
    $("td").css("background-color", "white");
    $("h3").html("Player 1");
    player1 = true;
    finish = false;
  })
  
  // choosing play mode
  //$("").on("click", function())
  
  // checking if the field is already filled
  function checkField(field) {
    if (field.html().length > 0) {
      field.unbind("click");
    }
  }
  
  // comparing if 3 fields are filled by the same player
  function compare(s1, s2, s3) {
    if (s1 !== "" && s1 === s2 && s1 === s3) {
      return true;
    }
  }
  
  //checking if somebody is winner
  function isWinner() {
    
    var field1 = $("#field1").html();
    var field2 = $("#field2").html();
    var field3 = $("#field3").html();
    var field4 = $("#field4").html();
    var field5 = $("#field5").html();
    var field6 = $("#field6").html();
    var field7 = $("#field7").html();
    var field8 = $("#field8").html();
    var field9 = $("#field9").html();
    
    if (compare(field1, field2, field3)) {
      $("#field1, #field2, #field3").css("background-color", "green");
      finish = true;
    } else if (compare(field4, field5, field6)) {
      $("#field4, #field5, #field6").css("background-color", "green");
      finish = true;
    } else if (compare(field7, field8, field9)) {
      $("#field7, #field8, #field9").css("background-color", "green");
      finish = true;
    } else if (compare(field1, field4, field7)) {
      $("#field1, #field4, #field7").css("background-color", "green");
      finish = true;
    } else if (compare(field2, field5, field8)) {
      $("#field2, #field5, #field8").css("background-color", "green");
      finish = true;
    } else if (compare(field3, field6, field9)) {
      $("#field3, #field6, #field9").css("background-color", "green");
      finish = true;
    } else if (compare(field1, field5, field9)) {
      $("#field1, #field5, #field9").css("background-color", "green");
      finish = true;
    } else if (compare(field3, field5, field7)) {
      $("#field3, #field5, #field7").css("background-color", "green");
      finish = true;
    }
    
    if (finish) {
      if (!player1) {
        $("h3").html("Player 1 wins!");
      } else {
        $("h3").html("Player 2 wins!");
      }
    }
  }
  
  
    // filling playground
    $("td").on("click", function() {
      //console.log(this.html);
      if (!finish) {
        checkField($(this));
        if (player1) {
          $(this).html("x");
          player1 = false;
          $("h3").html("Player 2");
        } else {
          $(this).html("o");
          player1 = true;
          $("h3").html("Player 1");
        }

      isWinner();
      
    }
  });
});