$(document).ready(function() {
    var timerCanvas = document.getElementById('timerCanvas');
    var ctx = timerCanvas.getContext('2d');

    var height = 600;
    var pomodoroMinutes = 1;
    var timerGraphRect = document.getElementById('timerRect');
    var isRunning = false;
    $('#startButton').button();

    var drawBaseRect = function(){
       ctx.fillStyle="darkgreen";
       ctx.fillRect(0, 0, 110, 610);
    } 

    var drawTimerRect = function(height){
        ctx.fillStyle="firebrick";
        ctx.fillRect(5, 5, 100, height);
    }

    drawBaseRect();
    drawTimerRect(600);
    
    $('#startButton').click(function () {
        if (isRunning){

        }else{
            pomodoroMinutes = Number($('#pomodoroLengthText').val()); 
            isRunning = true;
            $('#statusMessage').text('Pomodoro In Progress');
            var topicText = $('#pomodoroTopicText').val();
            if (topicText == ''){
                topicText = ' ';
            }

            $('#pomodoroTopic').text(topicText);

            var interval = setInterval(function() {
                height -= 600 / (pomodoroMinutes * 60);
                if (height < 0){
                    interval = clearInterval(interval);
                    var snd = new Audio('sounds/66951__benboncan__boxing-bell.wav');
                    snd.play();
                    $('#statusMessage').text('Break In Progress');

                }else{
                    //timerGraphRect.setAttribute('height', height);   
                    drawBaseRect();
                    drawTimerRect(height);
                    $('#statusTimerText').text('10:00');
                }
            }, 1000);
        }
    });

    $('#pomodoroLengthSlider').slider({
        value:25,
        min:5,
        max:60,
        step:5,
        slide: function( event, ui) {
            $('#pomodoroLengthText').val( ui.value );
        }
    });

    $('#pomodoroLengthText').val($('#pomodoroLengthSlider').slider('value'));


    $('#shortBreakLengthSlider').slider({
        value:5,
        min:5,
        max:15,
        step:5,
        slide: function( event, ui) {
            $('#shortBreakLengthText').val( ui.value );
        }
    });

    $('#shortBreakLengthText').val($('#shortBreakLengthSlider').slider('value'));


    $('#longBreakLengthSlider').slider({
        value:15,
        min:5,
        max:30,
        step:5,
        slide: function( event, ui) {
            $('#longBreakLengthText').val( ui.value );
        }
    });

    $('#longBreakLengthTex').val($('#longBreakLengthSlider').slider('value'));


    $('#pomodorosPerSetSlider').slider({
        value:4,
        min:1,
        max:10,
        step:1,
        slide: function( event, ui) {
            $('#pomodorosPerSetText').val( ui.value );
        }
    });

    $('#pomodorosPerSetText').val($('#pomodorosPerSetSlider').slider('value'));
});
