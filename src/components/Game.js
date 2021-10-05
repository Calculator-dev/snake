import { CssBaseline } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import ButtonStart from "./ButtonStart";
import { CANVAS_SIZE, DIRECTIONS, FOOD_COLOR, FOOD_START, SCALE, SNAKE_COLOR, SNAKE_START, SPEED } from "./constants";
import GameOver from "./GameOver";
import Score from "./Score";
import useInterval from "./useInterval";
import gif from "./assets/snake.gif"
import { Typography } from "@mui/material"



export default function Game() {
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [food, setFood] = useState(FOOD_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [playAgain, setPlayAgain] = useState(false);

    useInterval(() => gameLoop(), speed);

    const startGame = () => {
        setSnake(SNAKE_START);
        setFood(FOOD_START);
        setDir([0, -1]);
        setSpeed(SPEED);
        setGameOver(false);
        setPlayAgain(false)
    }

    const levelUp = (snake) => {
        if (snake >= 4 && snake <= 5)
            setSpeed(185);
        if (snake === 6)
            setSpeed(170);
        if (snake === 7)
            setSpeed(160);
        if (snake === 8)
            setSpeed(150);
        if (snake === 9)
            setSpeed(140);
        if (snake === 10)
            setSpeed(130);
        if (snake === 11)
            setSpeed(120);
        if (snake > 11 && snake <= 13)
            setSpeed(110);
        if (snake > 13 && snake <= 15)
            setSpeed(105);
        if (snake > 15 && snake <= 17)
            setSpeed(100);
        if (snake > 17 && snake <= 19)
            setSpeed(95);
        if (snake > 19 && snake <= 21)
            setSpeed(85);
        if (snake > 21 && snake <= 23)
            setSpeed(80);
        if (snake > 23 && snake <= 25)
            setSpeed(70);
        if (snake > 25 && snake <= 27)
            setSpeed(60);
        if (snake > 27)
            setSpeed(50);
    }

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);

        setPlayAgain(true)
    }

    const moveSnake = ({ keyCode }) => {
        if (dir[0] === 0 && dir[1] === -1)
            keyCode >= 37 && keyCode <= 39 && setDir(DIRECTIONS[keyCode]);

        if (dir[0] === 0 && dir[1] === 1)
            (keyCode >= 39 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])) || (keyCode === 37 && setDir(DIRECTIONS[keyCode]));

        if (dir[0] === 1 && dir[1] === 0)
            keyCode >= 38 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

        if (dir[0] === -1 && dir[1] === 0)
            (keyCode >= 37 && keyCode <= 38 && setDir(DIRECTIONS[keyCode])) || (keyCode === 40 && setDir(DIRECTIONS[keyCode]));
    }

    const createFood = () =>
        food.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));


    const checkCollision = (piece, snk = snake) => {
        if (
            piece[0] * SCALE >= CANVAS_SIZE[0] ||
            piece[0] < 0 ||
            piece[1] * SCALE >= CANVAS_SIZE[1] ||
            piece[1] < 0
        )
            return true;

        for (const segment of snk) {
            if (piece[0] === segment[0] && piece[1] === segment[1])
                return true;

        }

        setPlayAgain(false)
        return false;

    };

    const checkFoodCollision = newSnake => {
        if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
            let newFood = createFood();
            while (checkCollision(newFood, newSnake)) {
                newFood = createFood();
            }
            setFood(newFood);
            return true;
        }

        return false;
    }

    const gameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
        snakeCopy.unshift(newSnakeHead);
        levelUp(snake.length);
        if (checkCollision(newSnakeHead)) {
            endGame();
        }
        if (!checkFoodCollision(snakeCopy)) snakeCopy.pop();
        setSnake(snakeCopy);
    }

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = SNAKE_COLOR;
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = FOOD_COLOR;
        context.fillRect(food[0], food[1], 1, 1);
    }, [snake, food, gameOver])

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ background: "#22577A", width: "100%", height: "100%", position: "absolute" }}>

                <img style={{ width: "120px", height: "60px" }} src={gif} alt="" />
                <Typography variant="overline" display="block" style={{ fontSize: "30px", color: "white", fontWeight: "800" }}>Snake Game</Typography>
                {gameOver && <GameOver />}

                <Score score={snake.length - 2} />
                <div role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>

                    <canvas
                        style={{ border: "5px solid #7EB5A6" }}
                        ref={canvasRef}
                        width={`${CANVAS_SIZE[0]}px`}
                        height={`${CANVAS_SIZE[1]}px`}
                    />
                    <br />
                    <ButtonStart start={() => startGame()} playAgain={playAgain} />
                </div>
            </div>
            <CssBaseline />
        </div>
    )

}