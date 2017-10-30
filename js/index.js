var quotes = {
  "Steve McConnell": "Good code is its own best documentation.",
  "Ward Cunningham": "It's all talk until the code runs.",
  "Antoine de Saint-Exupéry": "Perfection [in design] is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
  "E. W. Dijkstra": "The computing scientist’s main challenge is not to get confused by the complexities of his own making.",
  "Ron Jeffries": "Code never lies, comments sometimes do.",
  "Albert Einstein": "A clever person solves a problem. A wise person avoids it.",
  "Martin Fowler": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Linus Torvalds": "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.",
  "Grace Murray Hopper": "If it’s a good idea, go ahead and do it. It is much easier to apologize than it is to get permission."
}


function pickRandomQuote (quotes) {
  var result = [];
  var count = 0;
  
  for (var prop in quotes) {
     if (Math.random() < 1/++count) {
        result = [prop, quotes[prop]];
     }
  }
  return result;
}

/*$('#quote').text("\"" + Object.values(quotes)[0]);
$('#quoteAutor').text("- "+Object.keys(quotes)[0]);*/

var q = pickRandomQuote(quotes);

$('#newQuote').click(function() {
  q = pickRandomQuote(quotes);
  $('#quoteAutor').
    text("- "+ q[0]).effect("pulsate", {times:1}, 2500);
  $('#quote').
    text("\"" + q[1]).effect("slide", 1000);;
  
});  

$('#twitter').click(function() {
  $('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?text=' + q[1]);
})