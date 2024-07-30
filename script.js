let game_sequence = [];
let usr_sequence = [];
let btns = ['first-btn','second-btn','third-btn','fourth-btn'];
let started = false;
let level = 0;
let color_btns = document.querySelectorAll('.btn');
let h2 = document.querySelector('h2');
let past_scores = [0];
let highest_score = document.querySelector('.highest-score');

function reset_game(){
    started = false;
    game_sequence = [];
    usr_sequence = [];
    level = 0;
}

function verifyColor(index){
    if(usr_sequence[index] === game_sequence[index]){
        if(game_sequence.length == usr_sequence.length){
            setTimeout(level_up,800);
        }
    }else{
        h2.innerHTML = `Game over ! Your score was <b>${level-1}</b> <br>Press any key to restart`;
        past_scores.push(level-1);
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor = 'white'
        },150)
        highest_score.innerText = `Highest Score : ${Math.max(...past_scores)}`;
        reset_game();
    }
}

function btn_press(){
    btn_flash(this);
    usr_sequence.push(this.classList[1]);
    verifyColor(usr_sequence.length - 1); 
}

function btn_flash(btn){
    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 200);
}

function level_up (){
    usr_sequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    let random_color = btns[Math.floor(Math.random() * 4)];
    
    game_sequence.push(random_color);

    btn_flash(document.querySelector(`.${random_color}`));
}

document.addEventListener('keypress',function(){
    if (started == false){
        console.log("Game started");
        started = true;
       
        // Update h2 to level row.
        level_up();
    }
})

for(color_btn of color_btns){
    color_btn.addEventListener('click',btn_press);
}
