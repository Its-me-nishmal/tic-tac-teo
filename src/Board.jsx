import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

const Board = () => {
    const [sqr, setSqr] = useState(Array(9).fill(null));
    const [xIsNext, setXisnext] = useState(true);
    

    const calculateWinner = (sqr) => {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (sqr[a] === sqr[b] && sqr[b] === sqr[c] && sqr[a] !== null) {
                return sqr[a];
            }
        }
        return null;
    }

    const winner = calculateWinner(sqr);

    const handleClick = (i) => {
        const newSqr = [...sqr];
        if (newSqr[i] === null && !winner) {
            newSqr[i] = xIsNext ? 'X' : 'O';
            setSqr(newSqr);
            setXisnext(!xIsNext);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const roboMove = () => {
        if (!xIsNext) {
           setTimeout(() => {
            const emptysqrs = sqr.map((v,i)=> v === null ? i : null).filter((v)=>v !== null);
            const rdm = Math.floor(Math.random() * emptysqrs.length);
            handleClick(emptysqrs[rdm]);
           }, 10);
        }
    }

    useEffect(()=>{
        roboMove()
    },[roboMove, sqr])


    return (
        <div className="top">
            <Typography variant="h5" gutterBottom>{calculateWinner(sqr) ? `Winner: ${calculateWinner(sqr)}` : sqr.every(square => square !== null) ? 'Draw!' : `Next player: ${xIsNext ? 'X' : 'O'}`}</Typography>
            <div className="Board" style={{ display: 'flex', flexWrap: 'wrap', width: '400px', margin: 'auto' }}>
                {sqr.map((value, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        style={{ 
                            margin: '5px', 
                            width: '90px', 
                            height: '90px', 
                            fontSize: '30px', 
                            color: value === 'X' ? '#ff5252' : value === 'O' ? 'green' : 'white',
                            background: 'black',
                            border: '1px solid gray'
                        }}
                        onClick={() => handleClick(index)}
                        className="buttons"
                    >
                        {value}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Board;
