// $(function(){ 
    // function getName(choice) {    
        
    // }

    // choices 
    var rock = 1
    var paper = 2
    var scissor = 3
    var draw = 4 
    var human = 5
    var computer = 6
    var gameStarted = 7 
    var gameFinished = 8

    var idle = 0; 
    var play = 1
    var playAgain = 2
    var reset = 3; 

    // 0 - no winner
    // 1 - human
    // 2 - computer
    // 3 - draw
    // var winner = 0
    

    //
    var humanScore = 0

    // 
    var computerScore = 0
 
    // 
    var maxScore = 2

    // 0 - no winner
    // 1 - human
    // 2 - computer
    var roundWinner = 0;  

    // 0 - not started
    // 1 - in progress
    // 2 - game finished
    var gameStatus = 0; 

    // 
    var gameLevel = 0;

    var computerChoice   = 0;
    var humanChoiceName   = '';
    var computerChoiceName = '';
    // 
    // var humanChoiceGif = ''
    // var computerChoiceGif = ''

    function initialized() { 
        updateMaxScoreUI(maxScore)
        // document.getElementsByClassName("max-score").text = maxScore;
    }
    
    function setGameStatus(choice) {
        gameStatus = choice;

        console.log(" gameStatus ", gameStatus)
        if(gameStatus === reset) { 
            gameReset(); 
        }
        else if (gameStatus === playAgain) {
            gameReset(); 
        }
    }

    function gameReset() {
        humanScore = 0;
        computerScore = 0; 

        updateComputerScoreUI(computerScore) 
        updateHumanScoreUI(humanScore)

        hidePlayAgainUI()
        hideResetUI()
    }

    function pickChoice(humanChoice) { 
        computerChoice = 0;
        computerChoiceName = '';
        
        humanChoiceName     = getName(humanChoice);

 
        // console.log("human", humanChoiceName)
        // console.log("computer", computerChoiceName)
        
          // manage popup
        showPopupUI()
 
        updateHumanChoiceImage(getGIF(humanChoice))

        //




        setTimeout(function(){    
            computerChoice      = getComputerChoice();
            computerChoiceName  = getName(computerChoice);


            document.getElementById("human-choice").innerHTML = humanChoiceName;
            document.getElementById("computer-choice").innerHTML= computerChoiceName; 
        
            setRoundWinner(humanChoice, computerChoice);

            // declair game winner
            if(maxScore === humanScore) {
                alert("YOU WIN!")

                gameStatus = gameFinished;

                
              
            }
            else if(maxScore === computerScore) {
                alert("GAME OVER! ")
                gameStatus = gameFinished; 
            }

 
            // reset all values here.. if user chooses to continue or 
            // stay the game 
    
            if(gameStatus  === gameFinished) {
                // show play again?   
                hideResetUI()
                showPlayAgainUI()


               
            } else if(humanChoice > 0 && computerChoice > 0) {
                // show reset 
                showResetUI()
                hidePlayAgainUI()
            } 
 
            // display the computer choice
           
            updateComputerChoiceImage(getGIF(computerChoice))
            updatePopupRoundResultUI(roundWinner, human, computer, draw)
  
           // set scores
            document.getElementById("computer-score").innerHTML = computerScore
            document.getElementById("human-score").innerHTML = humanScore
            document.getElementById("round-winner").innerHTML = getName(roundWinner)
             
            setTimeout(function(){
                hidePopupUI()
            }, 3000)
        }, 5000)
  
        let i = setInterval(function() { 
            if(computerChoice > 0) {
                clearInterval(i)
            }
           
            let num =   Math.floor((Math.random() * 3) + 1); 
   
            // numbers.map((value, index) => {
                // console.log(" index ", index)
                // console.log(" value ", value)

                if(computerChoice === 0) {  
                    console.log(num)
                    console.log("Test")

                    updateComputerChoiceImage(getGIF(num))
                }
            // }) 
        }, 1000)
        
        // do {
        //     updateComputerChoiceImage(getGIF(computerChoice))
        // } while(computerChoice === 0)
    }

    function setRoundWinner(humanChoice, computerChoice) {
        // set round winner
        if(isChoice1Win(humanChoice, computerChoice)) {
            console.log("Human win!")
            humanScore ++
            roundWinner = human
        }
        else if (
            ! isChoice1Win(humanChoice, computerChoice) && 
            ! isChoice1Win(computerChoice, humanChoice)) { 
                console.log("Draw!")
                roundWinner = draw
        } 
        else {
            console.log("Computer win!")
            computerScore ++
            roundWinner = computer
        }
    }
    function getName(choice) {
        var name = ""; 

        switch(choice) {
            case rock:
                    name = "ROCK";
                break; 
            case paper: 
                    name = "PAPER";
                break;
            case scissor: 
                    name = "SCISSOR";
                break;
            case draw: 
                    name = "DRAW";
                break; 
            case human: 
                    name = "HUMAN";
                break;           
            case computer: 
                    name = "COMPUTER";
            break;
        }

        return name;
    }
    function getComputerChoice() {
        return Math.floor((Math.random() * 3) + 1); 
    }
    function isChoice1Win(choice1, choice2) {
        // rock -> scisor => rock
        if(choice1 === rock && choice2 === scissor) {
            return true;
        }

        // paper -> rock => paper
        if(choice1 === paper && choice2 === rock) {
            return true;
        }

        // scisor -> paper => scisor
        if(choice1 === scissor && choice2 === paper) {
            return true;
        }

        // rock -> paper => paper        
        if(choice1 === rock && choice2 === paper) {
            return false;
        }

        // paper -> scisor => scisor
        if(choice1 === paper && choice2 === scissor) {
            return false;
        }

        // scisor -> rock => rock
        if(choice1 === scissor && choice2 === rock) {
            return false;
        }

    }
    function getGIF(choice) {
        let gif = './assets/images';
        let randomRumber = Math.floor((Math.random() * 3) + 1); 

        if(choice === rock) {
            gif = `${gif}/rock${randomRumber}.gif`
        }
        else if(choice === paper) {
            gif = `${gif}/paper${randomRumber}.gif`
        }
        else if(choice === scissor) {
            gif = `${gif}/scissor${randomRumber}.gif`
        }

        return gif; 
    }
     


    // UI UPDATES
    function updateHumanChoiceImage(imageSrc) { 
        document.getElementById("human-choice-image").src = imageSrc;  
    }
    function updateComputerChoiceImage(imageSrc) {
        document.getElementById("computer-choice-image").src = imageSrc; 
    }
    function showPopupUI() {
        document.getElementById("container-popup").style.display = "block";
    }
    function hidePopupUI() {
        document.getElementById("container-popup").style.display = "none";

        // once we close the popup, we need to clear out the images and winner message
        // updateComputerChoiceImage("") 
        // updateHumanChoiceImage("")  
        clearPopupRoundResult()
    }
    function hidePlayAgainUI() {
        document.getElementById("game-status-play-again").style.display = "none";
    }
    function showPlayAgainUI() {
        document.getElementById("game-status-play-again").style.display = "inline";
    }
    function hideResetUI() {
        document.getElementById("game-status-reset").style.display = "none";
    }
    function showResetUI() {
        document.getElementById("game-status-reset").style.display = "inline";
    }
    function updateComputerScoreUI(computerScore) { 
        document.getElementById("computer-score").innerHTML = computerScore 
    }
    function updateHumanScoreUI(humanScore) {
        document.getElementById("human-score").innerHTML = humanScore 
    }
    function updateMaxScoreUI(maxScore) {
        document.getElementsByClassName("max-score")[0].innerHTML = maxScore;
        document.getElementsByClassName("max-score")[1].innerHTML = maxScore;
    }
    function updatePopupRoundResultUI(roundWinner, human, computer, draw) {
        if(roundWinner === human) {
            document.getElementById("popup-round-result").innerHTML = "You Win!";
        }
        else if(roundWinner === computer) {
            document.getElementById("popup-round-result").innerHTML = "Computer Win!";
        }
        else if(roundWinner === draw){
            document.getElementById("popup-round-result").innerHTML = "Draw!";
        }  
    }
    function clearPopupRoundResult() {
        document.getElementById("popup-round-result").innerHTML = "";
    } 
// })