/**
 * React 틱택토 게임 실습
 *
 * TODO
 * 1.이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시해주세요.
 * 2.이동 목록에서 현재 선택된 아이템을 굵게 표시해주세요.
 * 3.사각형들을 만들 때 하드코딩 대신에 두 개의 반복문을 사용하도록 Board를 다시 작성해주세요.
 * 4.오름차순이나 내림차순으로 이동을 정렬하도록 토글 버튼을 추가해주세요.
 * 5.승자가 정해지면 승부의 원인이 된 세 개의 사각형을 강조해주세요.
 * 6.승자가 없는 경우 무승부라는 메시지를 표시해주세요.
 *
 * https://ko.reactjs.org/tutorial/tutorial.html
 */

import React, { Component } from 'react';
import 'assets/css/tictactoe.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick() }>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// 함수 컴포넌트로 변경
function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  )
}

class Board extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   }
  // }

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
          value={this.props.squares[i]}
          key={'square-'+i}
          onClick={()=> this.props.onClick(i)}
          style={this.props.squareStyle[i]}
      />
    )
  }

  renderSquareRow(num, i) {
    const idx = num * i;
    return (
      <div className="board-row" key={'board-row-'+i}>
        {
          [...Array(num)].map((x, j) => {
            return this.renderSquare(idx + j)
          })
        }
      </div>
    )
  }

  render() {
    const num = 3; // num x num 배열 생성
    return (
      <div>
        {
          [...Array(num)].map((x, i) => {
            return this.renderSquareRow(num, i)
          })
        }
      </div>
    );
  }
}

// 게임의 히스토리 state 관리
class Game extends Component {
  // 모든 리액트 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문 작성해야함.
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      rewind: false,  // 이동 기록 클릭 여부
      xIsNext: true,
      stepNumber: 0,
      highligits: Array(9).fill(false),
      status: 'Next player: X'
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();
    const { winner } = calculateWinner(current.squares);

    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // push() 함수보다 concat() 함수 권장 (기존의 배열을 복제하지 않기 때문)
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      rewind: true,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      highligits: Array(9).fill(false)
    })
  }

  highlightRows(rows) {
    if(!rows || rows.length < 1) return '';
    let highligits = this.state.highligits;
    rows.forEach((line, idx) => {
      line.forEach((i, d) => {
        highligits[i] = true;
      })
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, rows } = calculateWinner(current.squares);
    const highligits = this.state.highligits;

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #'+move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status = this.state.status;
    if (winner) {
      status = 'Winner: '+ winner;
    } else if (this.state.stepNumber >= 9) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // rows 하이라이트
    this.highlightRows(rows);

    let squareStyle = Array(9).fill().map(Object);
    highligits.forEach((d, i) => {
      if(d) squareStyle[i]['background'] = 'bisque';
    })

    if(this.state.rewind) {
      const bfState = history[this.state.stepNumber -1];
      const bfSquares = bfState && bfState.squares.slice();

      if(bfSquares && current.squares) {
        let idx = 0;
        current.squares.find((d, i)=>{
          if(d !== bfSquares[i]) idx = i;
        });
        squareStyle[idx]['color'] = 'red';
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
              squareStyle={squareStyle}
              onClick={(i)=> this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// 도우미 함수
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = null;
  let rows = [];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
      rows.push(lines[i]);
    }
  }

  return {
    winner: winner,
    rows: rows
  };
  // return null;
}

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );

export default Game;