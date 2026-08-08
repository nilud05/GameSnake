// ---- CONSTANTE Y VARIABLES GLOBALES ----
// ----------------------------------------
const config = {
    GAME_SPEED: 100,                    // Velocidad en milisegundos
    CANVAS_BORDER_COLOUR: 'black',      // Color del borde del canvas
    CANVAS_BACKGROUND_COLOUR: 'white',  // Color de fondo del canvas
    SNAKE_COLOUR: 'lightgreen',         // Color de la serpiente
    SNAKE_BORDER_COLOUR: 'darkgreen',   
    FOOD_COLOUR:'red',                  // Color de la comida
    FOOD_BORDER_COLOUR: 'darkred',      
    CELL_SIZE: 10,                      // Tamaño de cada "celda" (serpiente y comida)
    INITIAL_SANKE: [                    // Posición inicial de la serpiente
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150}
    ]
};

let gameState = {
    snake: [...config.INITIAL_SANKE],
    score: 0,
    changingDirection: false,
    foodX: 0,
    foodY: 0,
    dx: 10,
    dy: 0
};


//----- OBTENER ELEMENTOS DEL DOM -----
//-------------------------------------
const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");  // Obtiene un dibujo 2D del canvas
const scoreDisplay = document.getElementById('score');


//------- INICIALIZAR EL JUEGO -------
//------------------------------------
const initGame = () => {
    createFood();
    document.addEventListener("keydown", changeDirection);
    gameLoop;
};


//-------- GAME LOOP (LOOP PRINCIPAL) --------
//--------------------------------------------
const gameLoop = () => {
    if (didGameEnd()) {
        console.log(`🕹️ GAME OVER＞﹏＜ Final Score: ${gameState.score}`);
        return;
    }

    setTimeout(() => {
        gameState.changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        gameLoop();
    }, config.GAME_SPEED);
};


//---------------- FUNCIONES DE DIBUJO ----------------
//-----------------------------------------------------
const clearCanvas = () => {                 // Limpia y redibuja el canvas
    ctx.fillStyle = config.CANVAS_BACKGROUND_COLOUR;
    ctx.strokeStyle = config.CANVAS_BORDER_COLOUR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
};

const drawFood = () => {                    // Dibuja la manzana roja
    ctx.fillStyle = config.FOOD_COLOUR;
    ctx.strokeStyle = config.FOOD_BORDER_COLOUR;
    ctx.fillRect(gameState.foodX, gameState.foodY, config.CELL_SIZE, config.CELL_SIZE);
    ctx.strokeRect(gameState.foodX, gameState.foodY, config.CELL_SIZE, config.CELL_SIZE);
};

const drawSnake = () => {                   // Dibuja la serpiente en el canvas
    gameState.snake.forEach(segment => {
        ctx.fillStyle = config.SNAKE_COLOUR;
        ctx.strokeStyle = config.SNAKE_BORDER_COLOUR;
        ctx.fillRect(segment.x, segment.y, config.CELL_SIZE, config.CELL_SIZE);
        ctx.strokeRect(segment.x, segment.y, config.CELL_SIZE, config.CELL_SIZE);
    })
};

//---------------- FUNCIONES DE LÓGICA DEL JUEGO ----------------
//---------------------------------------------------------------
const advanceSnake = () => {                //Avanza la serpiente y detecta comida
    const head = {x: gameState.snake[0].x + gameState.dx, y: gameState.snake[0].y + gameState.dy};
    gameState.snake.unshift(head);

    const didEatFood = head.x === gameState.foodX && head.y === gameState.foodY;
    if (didEatFood) {
        gameState.score += 1;
        scoreDisplay.textContent = gameState.score;
        createFood();
    } else {
        gameState.snake.pop();
    }
};

const didGameEnd = () => {                  // verifica colisiones con cuerpo y muros
    const head = gameState.snake[0];

    // Colisión con el cuerpo de la serpiente
    for (let i = 4; i < gameState.snake.length; i++) {
        if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) return true;
    }

    // colisión con los muros del canvas
    const hitLeftWall = head.x < 0;  // Si X es menor que 0, significa que salio del canvas por la izquierda.
    const hitRightWall = head.x >= gameCanvas.width; // Si X es mayor o igual al ancho del canvas, salió por la derecha.
    const hitTopWall = head.y < 0;     // Si Y es menor a 0, salió por arriba.
    const hitBottomWall = head.y >= gameCanvas.height;     // Si Y es mayor o igual al alto del canvas, salió por abajo.

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;      // Retorna en TRUE si la serpiente chocó con cualquiera de las 4 paredes, o FALSE si está dentro del canvas
};

//---------------- FUNCIONES DE CONTROL ----------------
//------------------------------------------------------
const changeDirection = (event) => {        // cambio de dirección de la serpiente
    const keyMap = {
        37: {dx: -config.CELL_SIZE,     dy: 0,},
    };
};




//------------ INICIAR JUEGO -----------
//--------------------------------------
initGame();