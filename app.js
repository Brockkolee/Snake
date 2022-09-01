document.addEventListener('DOMContentLoaded',() => {

const squares = document.querySelectorAll('.grid div')
const score = document.querySelector("#score")
const text = document.querySelector("#text")

// width of the gameboard
const width = 20
//starting array of squares that the snake occupies
let snake = [2,1,0]

//"direction" of the snake head
let direction = 1;

let speed = 500;

//adding snake class via the array of snake to div
squares.forEach( (square,i) => {
    if (i < snake.length) {
        squares[snake[i]].classList.add('snake')
    }
})

function moveSnake() {

    if (
        //if snake hits the left wall
        (snake[0] % width === 0 && direction === -1 ) || 
        //if snake hits the right wall
        (snake[0] % width === width - 1 && direction === 1) || 
        //if snake hits the top wall
        (snake[0] < width && direction === -width) || 
        //if snake hits the bottom wall
        (snake[0] > squares.length - width && direction == width) || 
        //if snake hits the itself
        squares[snake[0] + direction].classList.contains('snake')
        ) {
            text.textContent = "Game Over! Click to try again! your final score is "
            text.addEventListener('click',()=> {
                location.reload()
            })

            return clearInterval(moveId)
        } 
    
    //move snake tail
    const tail = snake.pop();
    squares[tail].classList.remove('snake');
    //add next array to snake array, direction is derived from arrow keys user presses
    snake.unshift(snake[0] + direction);
    
    //if snake class div overlaps food class div (snake eats food)
    if (squares[snake[0]].classList.contains('food')) {
        //score increases
        score.innerHTML ++;
        //the food class div disappears
        squares[snake[0]].classList.remove('food')
        //snake becomes longer
        squares[tail].classList.add('snake')
        snake.push(tail);
        //resets and increase speed
        clearInterval(moveId)
        speed *= 0.95;
        moveId =setInterval(moveSnake,speed)
        //makeFood
        makeFood()
    } 

    //add snake class to div using snake head array 
    squares[snake[0]].classList.add('snake')

}


function control(e) {
    //if up arrow is press and snake is not moving down
    if (e.key == "ArrowUp" && direction != width || e.target.classList == "up" && direction != width) {
        direction = -width;
    //if down arrow is press and snake is not moving up
    } else if (e.key == "ArrowDown" && direction != -width || e.target.classList == "down" && direction != -width) {
        direction = +width;
    //if left arrow is press and snake is not moving right
    } else if (e.key == "ArrowLeft" && direction != 1 || e.target.classList == "left" && direction != 1) {
        direction = -1;
    //if right arrow is press and snake is not moving left
    } else if (e.key == "ArrowRight" && direction != -1 || e.target.classList == "right" && direction != -1) {
        direction = 1;
    }
    //prevent snake from moving in opposite direction to so snake will not colide to itself
}

//set speed of snake
let moveId = setInterval(moveSnake,speed)
function makeFood() {
    do {//create random number within gameboard size
        random = Math.floor(Math.random() * squares.length)
        //if snake eats food
    } while (squares[random].classList.contains('snake'));
    //create random food 
    squares[random].classList.add('food')
}

makeFood();

//execute the key function when key is up
document.addEventListener('keyup', control);
document.addEventListener('mousedown', control);


})

