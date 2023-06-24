   // sound effects - https://pixabay.com/sound-effects/search/draw/

    var soundEffect = new SoundEffect();
    var rock = 1
    var paper = 2
    var scissor = 3
    var draw = 4 
    var human = 5
    var computer = 6
    var humanScore = 0
    var computerScore = 0
    var maxScore = 1
    var roundWinner = 0;
    var computerChoice   = 0;
    var humanChoiceName   = '';
    var computerChoiceName = '';
    var round = 1;

    function initialized() { 
        // updateMaxScoreUI(maxScore)

        document.getElementById('round-counter').innerHTML = round;
        // document.getElementsByClassName("max-score").text = maxScore;


        // generate life based on maxScore
        // generate defauly human life
        let humanLife = document.getElementById("human-life");

        for (let i = 0; i < maxScore; i++) {
            var myCreatedElement = document.createElement("img");
            myCreatedElement.setAttribute("src", "./assets/images/heart-white.png")

            humanLife.appendChild(myCreatedElement);
        }


        // generate defauly computer life life
        let computerLife = document.getElementById("computer-life");

        for (let i = 0; i < maxScore; i++) {
            var myCreatedElement = document.createElement("img");
            myCreatedElement.setAttribute("src", "./assets/images/heart-white.png")

            computerLife.appendChild(myCreatedElement);
        }
    }

    function pickChoice(humanChoice) {
        if( humanScore >= maxScore || computerScore >= maxScore) return

        soundEffect.pickChoice();

        let message         = "";
        computerChoice      = 0;
        computerChoiceName  = '';
        humanChoiceName     = getName(humanChoice);

        updateHumanChoiceImage(getGIF(humanChoice))

        setTimeout(function(){    
            computerChoice      = getComputerChoice();
            computerChoiceName  = getName(computerChoice);

            setRoundWinner(humanChoice, computerChoice);

            // declair game winner
            if(maxScore === humanScore) {
                message = "WOW! YOU WON AGAINST JAMES."

                document.getElementById('play-again').style.display = "inline"


                soundEffect.winFinished()
            }
            else if(maxScore === computerScore) {
                message = "SORRY! YOU LOSE AGAINST JAMES."

                document.getElementById('play-again').style.display = "inline"

                soundEffect.loseFinished()
            }
            else {
                if(roundWinner === human) {
                    soundEffect.win()
                }
                if(roundWinner === draw) {
                    soundEffect.draw()
                }
                if(roundWinner === computer) {
                    soundEffect.lose()
                }

                message = "TAKE YOUR PICK"
            }

            document.getElementById("game-message").innerText = message;

            updateComputerChoiceImage(getGIF(computerChoice))
            document.getElementById("round-winner").innerHTML = getName(roundWinner)



            let humanLife = document.getElementById("human-life");
            // computer life update
            console.log(" humanScore ", humanScore)

            for (let i = 0; i < maxScore; i++) {
                if(i < humanScore) {
                    humanLife.children[i].src = './assets/images/heart-red.png'
                }
            }

            // computer life update
            console.log("computerScore ", computerScore)

            let computerLife = document.getElementById("computer-life");
            for (let i = 0; i < maxScore; i++) {
                if(i < computerScore) {
                    computerLife.children[i].src = './assets/images/heart-red.png'
                }
            }

            // round number update
            round++;

            document.getElementById('round-counter').innerHTML = round;
        }, 1000)
    }
    function playAgain() {
        soundEffect.playAgain()

        humanScore      = 0
        computerScore   = 0
        round = 1
        message = "TAKE YOUR PICK"

        document.getElementById("game-message").innerText = message;
        document.getElementById('play-again').style.display = "none"

        // human remove
        let humanLife = document.getElementById("human-life");

        while (humanLife.hasChildNodes()) {
            humanLife.removeChild(humanLife.firstChild)
        }

        // computer remove
        let computerLife = document.getElementById("computer-life");

        while (computerLife.hasChildNodes()) {
            computerLife.removeChild(computerLife.firstChild)
        }

        initialized()
    }
    function setRoundWinner(humanChoice, computerChoice) {
        // set round winner
        if(isChoice1Win(humanChoice, computerChoice)) {
            humanScore ++
            roundWinner = human
        }
        else if (
            ! isChoice1Win(humanChoice, computerChoice) && 
            ! isChoice1Win(computerChoice, humanChoice)) {
                roundWinner = draw
        } 
        else {
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
                    name = "YOU WIN";
                break;           
            case computer: 
                    name = "YOU LOSE";
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