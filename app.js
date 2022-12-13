function gameInit() {
    let gameObj = {
        min: 1,
        max: 10,
    };

    return gameObj
}

function game(gameObj) {       
    let playerName = prompt('Please enter your name to begin playing:');

    gameObj.secretNum = randomNumber(gameObj.min, gameObj.max)
    gameObj = playerInit(playerName, gameObj);
    gameObj = playGame(playerName, gameObj);
    playAgain(gameObj);
}

function playerInit(name, obj) {
    if (obj[name] === undefined) {
        obj[name] = {
            guesses: [],
            tryHistory: 0
        };
    }
    return obj
}

function playGame(name, obj) {
    let gameComplete = false;

    while (!gameComplete) {
        let userGuess = prompt(`${name}, please enter your number guess in a range of ${obj.min}-${obj.max}:`);
        if (parseInt(userGuess) === obj.secretNum) {
            obj[name].guesses.push(userGuess); // Added in the event a player guesses on the first try.           
            winMessage(name, obj);
            obj[name].tryHistory = obj[name].guesses.length; // Records history of "tries" for this game session
            gameComplete = true;
            return obj;
        } else if ((parseInt(userGuess) < obj.secretNum)) {
            alert(`Sorry ${name}, your guess of ${userGuess} was too low.`);
            obj[name].guesses.push(userGuess)
        } else {
            alert(`Sorry ${name}, your guess of ${userGuess} was too high.`);
            obj[name].guesses.push(userGuess)
        }
    }
}

function playAgain(obj) {
    let playerAnswer = prompt(`Would you like to play again? (y/n)`);
    let answerArr = ['Y', 'y', 'N', 'n'];
    while (!answerArr.includes(playerAnswer)) {
            playerAnswer = prompt(`Please enter a "y" or "n" for your response`);
    }
    if ((playerAnswer === 'Y') || (playerAnswer === 'y')) {
        game(obj);
    }
}

function winMessage(name, obj) {
    if (obj[name].tryHistory === 0) {
        return alert(`Excellent ${name}, you guessed the secret number ${obj.secretNum}!\nIt only took you ${obj[name].guesses.length} tries.\nYour previous guesses where ${obj[name].guesses.join(', ')}!`);
    } else if (obj[name].guesses.length > obj[name].tryHistory) {
        return alert(`Excellent ${name}, you guessed the secret number ${obj.secretNum}!\nIt only took you ${obj[name].guesses.length} tries, which was ${obj[name].guesses.length - obj[name].tryHistory} more than your previous game.\nYour guesses where ${obj[name].guesses.join(', ')}!`);
    } else if (obj[name].guesses.length < obj[name].tryHistory) {
        return alert(`Excellent ${name}, you guessed the secret number ${obj.secretNum}!\nIt only took you ${obj[name].guesses.length} tries, which was ${obj[name].tryHistory - obj[name].guesses.length} less than your previous game.\nYour guesses where ${obj[name].guesses.join(', ')}!`);
    } else {
        return alert(`Excellent ${name}, you guessed the secret number ${obj.secretNum}!\nIt only took you ${obj[name].guesses.length} tries which was the same as your previous game.\nYour previous guesses where ${obj[name].guesses.join(', ')}!`);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}