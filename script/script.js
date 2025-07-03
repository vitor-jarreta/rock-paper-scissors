window.onload = () => {
    wins = localStorage.getItem('wins');
    losses = localStorage.getItem('losses');
    draws = localStorage.getItem('draws');

    // Atualizar os elementos na página
    document.querySelector('.js-human-score p').innerHTML = wins;
    document.querySelector('.js-machine-score p').innerHTML = losses;
    document.querySelector('.js-draw-score p').innerHTML = draws;
}

function gameplayAnimation(element) {
    element.style.transform = 'scaleX(1.3)'
    element.style.transition = 'transform 0.5s ease-in-out';

    setTimeout(() => {
        element.style.transform = 'scaleX(1)';
    }, 350);
}


function scoreAnimation(element, resultPlay) {
    element.style.transition = 'transform 0.3s ease-in-out';
    element.style.transform = 'scale(1.1)';

    if (resultPlay === "win") {
        element.style.transition = 'background-color 0.5s ease-in-out'
        element.style.background = '#CAE8BD'
    } else if (resultPlay === "losse") {
        element.style.transition = 'background-color 0.5s ease-in-out'
        element.style.background = '#F8D7DA'
    }

    // Reverter a animação após 500ms
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.background = '#d1d7e0';
    }, 500);


}

function pointScoreAnimation(element) {
    element.style.transform = 'rotate(360deg)';
    element.style.transition = 'transform 0.3s ease-in-out';

    setTimeout(() => {
        element.style.transform = 'rotate(0deg)';
    }, 500);
}

function play(element) {

    var wins = localStorage.getItem('wins') || 0;
    var losses = localStorage.getItem('losses') || 0;
    var draws = localStorage.getItem('draws') || 0;

    wins = Number(wins);
    losses = Number(losses);
    draws = Number(draws);



    var machinePlay = Math.floor(Math.random() * 3);

    switch (machinePlay) {
        case 0:
            machinePlay = 'rock';
            break;
        case 1:
            machinePlay = 'paper';
            break;
        case 2:
            machinePlay = 'scissor';
            break;
        default:
            break;
    }

    console.log(machinePlay);

    if (element === machinePlay) {
        console.log('Draw');
        draws += 1

        draw_score = document.querySelector('.js-draw-score');
        draw_value = draw_score.querySelector('p');
        draw_value.innerHTML = draws;
        scoreAnimation(draw_score);
        pointScoreAnimation(draw_value);

        gameplay = document.querySelector(".js-gameplay");
        new_gameplay_layout = resultLayout(element, machinePlay, "It a Draw");
        gameplay.innerHTML = new_gameplay_layout;
        gameplayAnimation(gameplay);

        play_result = document.querySelector(".js-play-result");
        console.log(play_result);

    } else if ((element === 'rock' && machinePlay === 'scissor') ||
        (element === 'paper' && machinePlay === 'rock') ||
        (element === 'scissor' && machinePlay === 'paper')) {
        console.log('You win');

        wins += 1;

        win_score = document.querySelector('.js-human-score');
        win_value = win_score.querySelector('p');
        win_value.innerHTML = wins;
        scoreAnimation(win_score, "win");
        pointScoreAnimation(win_value);

        gameplay = document.querySelector(".js-gameplay");
        new_gameplay_layout = resultLayout(element, machinePlay, "You Win");
        gameplay.innerHTML = new_gameplay_layout;
        gameplayAnimation(gameplay);
    }
    else {
        console.log('You lose');

        losses += 1;

        losse_score = document.querySelector('.js-machine-score');
        losse_value = losse_score.querySelector('p');
        losse_value.innerHTML = losses;
        scoreAnimation(losse_score, "losse");
        pointScoreAnimation(losse_value);

        gameplay = document.querySelector(".js-gameplay");
        new_gameplay_layout = resultLayout(element, machinePlay, "You Lose");
        gameplay.innerHTML = new_gameplay_layout;
        gameplayAnimation(gameplay);

    }


    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
    localStorage.setItem('draws', draws);
}

function reset() {
    localStorage.setItem('wins', 0);
    localStorage.setItem('losses', 0);
    localStorage.setItem('draws', 0);

    draw_score = document.querySelector('.js-draw-score');
    draw_value = draw_score.querySelector('p');
    draw_value.innerHTML = 0;
    scoreAnimation(draw_score);
    pointScoreAnimation(draw_value);

    win_score = document.querySelector('.js-human-score');
    win_value = win_score.querySelector('p');
    win_value.innerHTML = 0;
    scoreAnimation(win_score);
    pointScoreAnimation(win_value);

    losse_score = document.querySelector('.js-machine-score');
    losse_value = losse_score.querySelector('p');
    losse_value.innerHTML = 0;
    scoreAnimation(losse_score);
    pointScoreAnimation(losse_value);
}

function imageLayout(play) {

    var img = "";
    switch (play) {
        case "rock":
            img = "https://res.cloudinary.com/dclnzborn/image/upload/v1751244999/Copilot_20250629_165007_iwctkz.png";
            break;
        case "paper":
            img = "https://res.cloudinary.com/dclnzborn/image/upload/v1751244999/Copilot_20250629_165633_yxhuza.png";
            break;
        case "scissor":
            img = "https://res.cloudinary.com/dclnzborn/image/upload/v1751244998/Copilot_20250629_165259_u8fst9.png";
            break
        default:
            break;
    }

    return img
}

function resultLayout(play, machinePlay, result) {
    human_play = imageLayout(play);
    machine_play = imageLayout(machinePlay);
    console.log(machinePlay);

    return ` <div class="you-game">
                    <h2>You</h2>
                    <div class="image ${play} js-play-result">
                        <img src="${human_play}" alt="${play}">
                    </div>
                </div>
                <div class="machine-game">
                    <h2>Machine</h2>
                    <div class="image ${machinePlay} js-play-result">
                        <img src="${machine_play}" alt="${machinePlay}">
                    </div>
                </div>
                <div class="result-game">
                    <h2>${result}</h2>
                </div>
                <div class="play-again" onclick = "playAgain()">
                    <p>Play Again</p>
                </div>`
}


function playAgain() {
    gameplay = document.querySelector(".js-gameplay");

    new_gameplay_layout = `
        <div class="image rock" onclick="play('rock')">
            <img src="https://res.cloudinary.com/dclnzborn/image/upload/v1751244999/Copilot_20250629_165007_iwctkz.png" alt="rock">
        </div>
        <div class="image paper" onclick="play('paper')">
            <img src="https://res.cloudinary.com/dclnzborn/image/upload/v1751244999/Copilot_20250629_165633_yxhuza.png" alt="paper">
        </div>
        <div class="image scissor" onclick="play('scissor')">
            <img src="https://res.cloudinary.com/dclnzborn/image/upload/v1751244998/Copilot_20250629_165259_u8fst9.png" alt="scissor">
        </div>
    `

    gameplay.innerHTML = new_gameplay_layout;
    gameplayAnimation(gameplay);
}
