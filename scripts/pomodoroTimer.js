$(document).ready(function () {
    var timerCanvas = document.getElementById('timerCanvas');
    var ctx = timerCanvas.getContext('2d');

    var height = $('#timerCanvas').height() - 10;
    var ticker = 0;
    var pomodoroMinutes = 1;
    var pomodoroSetsComplated = 0;
    var pomodorosPerSet = $('#pomodorosPerSetText').val();
    var shortBreakLength = $('#shortBreakLengthText').val();
    var longBreakLength = $('#longBreakLengthText').val();
    var interval;

    var timerGraphRect = document.getElementById('timerRect');
    var isRunning = false;
    $('#startButton').button();
    $('#showTimeRadio').buttonset();

    $('[for=timeOn]').click(function (){ toggleTimer("on"); });
    $('[for=timeOff]').click(function (){ toggleTimer("off"); });

    var toggleTimer = function (state){
        if (state === "on"){
            $('#statusTimerText').show();
        }else{
            $('#statusTimerText').hide();
        }
    };

    var drawBaseRect = function (){
        ctx.fillStyle="darkgreen";
        ctx.fillRect(0, 0, 110, 610);
    } 

    var drawTimerRect = function (height){
        ctx.fillStyle="firebrick";
        ctx.fillRect(5, 5, 100, height);
    }


    var reset = function (){
        ticker = 0;
        height = $('#timerCanvas').height() - 10;
        drawBaseRect();
        drawTimerRect(height);
        $('#startButton').text('Start Pomodoro');
    };
    
    reset();

    $('#startButton').click(function () {
        if (isRunning){
           interval = clearInterval(interval);
           isRunning = false; 
           $('#startButton').text('Continue Pomodoro');
        }else{
            pomodoroMinutes = Number($('#pomodoroLengthText').val()); 
            isRunning = true;
            $('#statusMessage').text('Pomodoro In Progress');
            var topicText = $('#pomodoroTopicText').val();
            if (topicText == ''){
                topicText = ' ';
            }
            $('#startButton').text('Pause Pomodoro');
            $('#pomodoroTopic').text(topicText);

            interval = setInterval(function () {
                height -= 600 / (pomodoroMinutes * 60);
                if (height < 0){
                    interval = clearInterval(interval);
                    var snd = new Audio('sounds/66951__benboncan__boxing-bell.wav');
                    snd.play();
                    $('#statusMessage').text('Break In Progress');
                    reset();
                    isRunning = false;
                    //updateStatusTimer();
                }else{
                    //timerGraphRect.setAttribute('height', height);   
                    drawBaseRect();
                    drawTimerRect(height);
                    updateStatusTimer();
                }
            }, 1000);
        }
    });

    var updateStatusTimer = function (){
        ticker += 1;
        var mins = Math.round(ticker / 60);
        var secs = Math.round(ticker % 60);
        var minsWithZero = '00' + mins;
        var secsWithZero = '00' + secs;

        var displayTime = minsWithZero.slice(minsWithZero.length - 2, minsWithZero.length) + ":" 
            + secsWithZero.slice(secsWithZero.length - 2, secsWithZero.length);
        $('#statusTimerText').text(displayTime );
    };

    $('#pomodoroLengthSlider').slider({
        value:25,
        min:5,
        max:60,
        step:5,
        slide: function ( event, ui) {
            $('#pomodoroLengthText').val( ui.value );
        }
    });

    $('#pomodoroLengthText').val($('#pomodoroLengthSlider').slider('value'));


    $('#shortBreakLengthSlider').slider({
        value:5,
        min:5,
        max:15,
        step:5,
        slide: function ( event, ui) {
            $('#shortBreakLengthText').val( ui.value );
        }
    });

    $('#shortBreakLengthText').val($('#shortBreakLengthSlider').slider('value'));


    $('#longBreakLengthSlider').slider({
        value:15,
        min:5,
        max:30,
        step:5,
        slide: function ( event, ui) {
            $('#longBreakLengthText').val( ui.value );
        }
    });

    $('#longBreakLengthTex').val($('#longBreakLengthSlider').slider('value'));


    $('#pomodorosPerSetSlider').slider({
        value:4,
        min:1,
        max:10,
        step:1,
        slide: function ( event, ui) {
            $('#pomodorosPerSetText').val( ui.value );
        }
    });

    $('#pomodorosPerSetText').val($('#pomodorosPerSetSlider').slider('value'));
});
