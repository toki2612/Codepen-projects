$(document).ready(function() {

var wikiAPI;
var keyword;

var KEY_ENTER = 13;

var ARTICLE_TITLE = 1;
var ARTICLE_DESCRIPTION = 2;
var ARTICLE_LINK = 3;


$('#myInput').keypress(function(e) {
  keyword = $(this).val();
  if (e.which == KEY_ENTER) {    
    wikiView();
    }
});

$("button").click(function() {
    keyword = $("#myInput").val();
    wikiView();
});
    
// wikiView function to make request and output list of articles

var wikiView = function() {
  
    // Clear unordered list of results
    $("ul").html("");
  
    wikiAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + keyword + "&limit=10&namespace=0&format=json&callback=?";
    $('#searchResults').css('visibility', "visible");
  
    $.getJSON(wikiAPI, function (data) {
      var search = data;
      
      // Define a number of articles, if it is less than default = 10
    
      var size = search[ARTICLE_TITLE].filter(function(value) { 
        return value !== undefined }).length;
      
      // Check if article exists and giving a message if not
      if (size == 0) {
        $('#searchResults').html("<p>The page <span style=\"color: red;\">" + keyword + "</span> doesn't exist.</p>");
        return;
      }
        
      // Create li elements equal to number of request articles
      for (var i = 0; i < size; i++) {
        var li = document.createElement("li");
        document.getElementById('searchResults').appendChild(li);
       };
      
      // Print list of articles with links opening in new tabs  
      $('li').each( function(index) {
        var result = "<span style=\"font-weight: bold;font-size:20px;\">" + search[ARTICLE_TITLE][index] + "</span>"+"<br><br>";
        result += search[ARTICLE_DESCRIPTION][index];
        $(this).html(result); 
        $(this).click(function() {
          window.open(search[ARTICLE_LINK][index]);
        });
      });
    });
  };
});