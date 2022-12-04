import React from "react";
import Button from "./components/Button";
import Die from "./components/Die";
import Header from "./components/Header";
import initDices from "./diceInitialData"
import "./styles.css";

export default function App() {
    const [dice, setDices] = React.useState(
        initDices.map(die =>
            ({ ...die, value: getRandomDiceVlaue() })
        )
    );
    const totalDice = dice.length;
    const [bestScore, setBestScore] = React.useState(
        () => localStorage.tenziesScore ? localStorage.tenziesScore : "?"
    )
    const [newRecord, setNewRecord] = React.useState(false);
    const [rolls, setRolls] = React.useState(1);
    const [heldDice, setHeldDice] = React.useState(0);
    const [endGame, setEndGame] = React.useState(false);

    const diceEls = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            toggle={() => toggleDice(die.id)}
            fixed={die.fixed}
        />
    ));

    console.log("best", bestScore);
    console.log("rolls", rolls);
    console.log("newRecord", newRecord);
    function getRandomDiceVlaue() {
        return Math.floor(Math.random() * 6 + 1);
    }

    function toggleDice(id) {
        let die = dice.find(d => d.id === id);

        setDices(oldDices => oldDices.map(die => die.id === id ?
            { ...die, fixed: !die.fixed }
            : die)
        );

        setHeldDice(die.fixed ? heldDice - 1 : heldDice + 1);
    }

    function rollDice() {
        setRolls(rolls + 1);
        setDices(oldDices => (
            oldDices.map(die => {
                return die.fixed ? die : { ...die, value: getRandomDiceVlaue() }
            })
        ))
    }

    function resetGame() {
        setEndGame(false);
        setHeldDice(0);
        setRolls(1);
        setNewRecord(false);
        setDices(oldDices =>
            dice.map(die => ({ id: die.id, value: getRandomDiceVlaue(), fixed: false })))
    }

    React.useEffect(() => {
        if (endGame) {
            let isNewBest = (bestScore === "?") || (bestScore > rolls);
            if (isNewBest) {
                setBestScore(rolls);
                setNewRecord(true);
                console.log(newRecord)
                localStorage.tenziesScore = rolls;
            }
        }
    }, [endGame, newRecord, bestScore]);

    React.useEffect(() => {
        if (heldDice === totalDice) {
            const winValue = dice[0].value;
            setEndGame(dice.every(die => die.value === winValue));
        }
    }, [heldDice])

    return (
        <>
            <div className="main">
                <Header />
                <div className="dice-container">
                    {diceEls}
                </div>
                {!endGame && <Button
                    roll={rollDice}
                    endGame={endGame}
                    reset={resetGame}
                />}
            </div>
            {
                endGame && <div className="youWonWrapper">
                    <div className="youWon">
                        <h2>You Won</h2>
                        {newRecord && <h4>New High Score</h4>}
                        <div className="scoreBoard">
                            {!newRecord && <div className="bestScore">
                                <span className="scoreTitle">Best Score: </span>
                                {bestScore} rolls
                            </div>}
                            <div className="youScore">
                                <span className={`scoreTitle ${newRecord ? "newRecord" : ""}`}>
                                    Your Score:
                                </span>
                                {rolls} rolls
                            </div>
                        </div>

                        <Button
                            roll={rollDice}
                            endGame={endGame}
                            reset={resetGame}
                        />
                    </div>
                </div>
            }
        </>
    )
}
