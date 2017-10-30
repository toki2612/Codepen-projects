var timerElement = document.getElementById("timer");
timerElement.innerHTML = document.getElementById("worktime").innerHTML;
var worktimeElement = document.getElementById("worktime");
var breaktimeElement = document.getElementById("breaktime");

var counting = false;
var working = true;

var worktime;
var breaktime;

var timer_ms = Number(worktimeElement.innerHTML) * 60 * 1000;
var endTime_ms;
var duration = timer_ms;


timerElement.addEventListener("click", function() { 
  if (counting === false) {
    start();
    updateTimer();
  } else {
    pause();
  }
});
                             
function start() {
  console.log("starting");
  counting = true;
  endTime_ms = Date.now() + timer_ms;
  document.getElementById("timer").style.borderColor = "#6bdb7e";
  console.log("endTime " + endTime_ms);
}

function pause() {
  counting = false;
  timer_ms = duration;
  document.getElementById("timer").style.borderColor = "#d86868";
  console.log(timer_ms + " saved to resume");
}

function displayTimer(duration) {
  var seconds = Math.floor(duration / 1000) % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  
  var minutes = Math.floor(duration/ (60 * 1000));
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  timerElement.innerHTML = minutes + " : " + seconds;
}

function changeMode() {
  if(working) {
    working = false;
    document.getElementById("mode").innerHTML = "Have a break";
    timer_ms = Number(breaktimeElement.innerHTML) * 60 * 1000;
    start();
  } else {
    working = true;
    document.getElementById("mode").innerHTML = "Work hard";
    timer_ms = Number(worktimeElement.innerHTML) * 60 * 1000;
    start();
  }
}

var updateTimer = setInterval(function() { 
  if (!counting) {
    return;
  }
  
  duration = endTime_ms - Date.now();
  console.log("duration: " + duration);
  console.log(working);
  if (Math.floor(duration / 1000) > 0) {
    displayTimer(duration);
  } else {
    duration = Math.max(duration, 0);
    displayTimer(duration);
    changeMode();
  }
}, 1000);

// function to limit work and break time ranges from 0 to 60
function checkLimits(time) {
  console.log(time);
  if (time < 0) {
    time = 60;
  } else if (time > 60) {
    time = 0;
  }
  return time;
};

// funstions to update work and break time
var updateBreaktime = function(increment) {
  breaktime = Number(breaktimeElement.innerHTML);
  breaktime += increment;
  breaktime = checkLimits(breaktime);
  breaktimeElement.innerHTML = breaktime;
  if (!working) {
    timer_ms = breaktime * 60 * 1000;
    timerElement.innerHTML = breaktime;
  }
};

var updateWorktime = function(increment) {
  worktime = Number(worktimeElement.innerHTML);
  worktime += increment;
  worktime = checkLimits(worktime);
  worktimeElement.innerHTML = worktime;
  if (working) {
    timerElement.innerHTML = worktime;
    timer_ms = worktime * 60 * 1000;
  }
};


document.getElementById("moreWork").addEventListener("click", function() {
  if (!counting) {
    updateWorktime(1);
  } 
});

document.getElementById("lessWork").addEventListener("click", function() {
  if (!counting) {
    updateWorktime(-1);
  }
});

document.getElementById("moreBreak").addEventListener("click", function() {
  if (!counting) {
    updateBreaktime(1);
  }
});

document.getElementById("lessBreak").addEventListener("click", function() {
  if (!counting) {
    updateBreaktime(-1);
  }
});