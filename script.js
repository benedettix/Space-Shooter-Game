let gun = document.querySelector('.gun');
let loader = document.querySelector('.loader');
let container = document.querySelector('.container');
let containerWidth = 560;
let score = document.querySelector('#score');
let cowSound = new Audio('cow.m4a');
let sniperSound = new Audio('sniper.m4a');
let doubleSound = new Audio('double.mp3');

window.addEventListener('keydown', (e) => {
    let left = parseInt(window.getComputedStyle(gun).getPropertyValue('left'));
    if (e.key == "ArrowLeft" && left >= 0) {
        gun.style.left = left - 10 + "px";

    }else if(e.key == "ArrowRight" && left <= containerWidth) {
        gun.style.left = left + 10 + "px";
    }

    if(e.key=="ArrowUp") {
        sniperSound.play();
        let bullet = document.createElement('div');
        bullet.classList.add('bullet');
        let bottom = parseInt(window.getComputedStyle(bullet).getPropertyValue('bottom'));
        bullet.style.left = left + 13 +"px";
  
        bullet.style.bottom = bottom + 10 + "px";
        container.appendChild(bullet);

        let bulletCount = 0;

       let moveBullet = setInterval(() => {
           let cows = document.querySelectorAll('.cow');
           cows.forEach((cow) => {
            let cowBound = cow.getBoundingClientRect();
            let cowBoundLeft = cow.getBoundingClientRect().left + 60;

            let cowBoundRight = cow.getBoundingClientRect().right + 30;
            let bulletBound = bullet.getBoundingClientRect();
            let bulletBoundLeft = bullet.getBoundingClientRect().left + 80;
            let bulletBoundRight = bullet.getBoundingClientRect().right;
            if(bulletBoundLeft >= cowBoundLeft && 
                bulletBoundRight <= cowBoundRight &&
                bulletBound.top <= cowBound.top && 
                bulletBound.bottom <= cowBound.bottom) {
                    bulletCount++;
                    if (bulletCount == 2) {
                        doubleSound.play();
                    }
                    score.innerHTML = parseInt(score.innerHTML) + 1;
                    cowSound.play();
                cow.remove();
               
                
            }
           })
        let bottom = parseInt(window.getComputedStyle(bullet).getPropertyValue('bottom'));
        bullet.style.left = left + 13 +"px";
        bullet.style.bottom = bottom + 10 + "px";
        if (bottom > 900) {
          
            bullet.remove();
        }
       },10)
    }
})
var t = 3000; // Timer
         
// Stores the setInterval ID used by
// clearInterval to stop the timer
var interval;
let calculateTimerWidth = 0;
generateCows();

// Function that changes the timer
function changeTimer(){
    t = t - 100;


    if (t == 200) {
        alert("Pobedio si");
       
            window.location.reload();
    }else if(t == 1500) {
        generateCows();
    }
}

function generateCows() {
    clearInterval(interval);
    calculateTimerWidth+=16.5;
loader.style.width = calculateTimerWidth + 'px';
    let randomPosition = Math.floor(Math.random() * containerWidth);
    let newCow = document.createElement('div');

    newCow.className = "cow";
    newCow.style.left = randomPosition + "px";
    container.appendChild(newCow);
    changeTimer();
    interval = setInterval(generateCows, t);
}

// let generateCows = setInterval(() => {
//     clearInterval(interval);
//     let randomPosition = Math.floor(Math.random() * containerWidth);
//     let newCow = document.createElement('div');

//     newCow.className = "cow";
//     newCow.style.left = randomPosition + "px";
//     container.appendChild(newCow);
  
// },cowDificulty)


let moveCow = setInterval(() => {
let cows = document.querySelectorAll('.cow');
    cows.forEach(arg => {
        let top = parseInt(window.getComputedStyle(arg).getPropertyValue('top'));
        arg.style.top = top + 4 + "px";
        if (top > 575) {
            alert('Game over');
            clearInterval(moveCow)
            arg.remove();
            window.location.reload();
        }
    })
    
},50)
    
