$(document).ready(function () {
    
   
   
   
    //Questions, answers and correct answer arrays
    
    var options = [
        
        { question: "What is the main color of Pepsi?",
          choice: ["White", "Blue", "Red", "Grey"],
            answer: 1,
            
         },
         {
             question: "What is the main color of Sprite?", 
            choice: ["Green", "White", "Black", "Blue"],
            answer: 0,
            
         }, 
         {
             question: "What is the main color of Coke?", 
            choice: ["White", "Black", "Red", "Grey" ],
            answer: 2,
            
        }, 
        {
            question: "What is the main color of Fanta", 
            choice: ["Green", "Blue", "Orange", "White" ],
            answer: 2,
        
        }, 
        {
            question: "What is the main color of DR. Pepper?", 
            choice: ["Black", "White", "Red", "Maroon" ],
            answer: 3,
            
        }]
    
        // variables
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    // button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
   
   
   
        //timer 
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //Countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        
        
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
   
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice)
    }
    
    
    
    // function to click answer 
    $(".answerchoice").on("click", function () {
        
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    function hidepicture(){
    
    var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    ;
       
    
    
        //game results
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Results: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 2000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
    