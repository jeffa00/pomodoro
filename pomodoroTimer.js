$(document).ready(function() {
    var height = 600;
    var pomodoroMinutes = 1;
    var timerGraphRect = document.getElementById('timerRect');

    var interval = setInterval(function() {
        height -= 600 / (pomodoroMinutes * 60);
        if (height <= 0)
    {
        interval = clearInterval(interval);
    }else{
        timerGraphRect.setAttribute('height', height);   
    }
    }, 1000);
});
