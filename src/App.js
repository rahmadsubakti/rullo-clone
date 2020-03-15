import React from 'react';
import { genAnswerGrid, genGrid } from './utils/GenGame.js';
import { CheckBox } from './component/CustomCheckbox.js';
import { Modal } from './component/Modal.js';
import _ from 'underscore';

import './App.css';

function sumRow(row) {
  return row.reduce((c, val) => c += val)
}

function gen2DArray(num) {
  let result = [];
  for (let i=0; i<num; i++) {
    result.push(Array(num).fill(0))
  }
  return result
}

const isTrue = (value) => value === true;

const ARRZERO = gen2DArray(5);

const CORRECT = {border: "1px solid yellow", color: "yellow"}
const INCORRECT = {border: "1px solid white", color: "white"}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.answer = genAnswerGrid();

    this.grid = genGrid(this.answer)

    this.state = {history: [ARRZERO], grid: ARRZERO}

    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.undo = this.undo.bind(this);
    this.newGame = this.newGame.bind(this);
    this.rowSumAnswer = () => this.answer.map(sumRow);
    this.colSumAnswer = () => _.zip(...this.answer).map(sumRow);
  }

  handleChange(event) {
    let [row,col] = event.target.name; 
    row = Number(row);
    col = Number(col);
    const newArr = this.state.grid.slice();
    let arrRow = newArr[row].slice();
    arrRow[col] = event.target.checked ? Number(event.target.value) : 0;
    newArr[row] = arrRow;

    let history = this.state.history.slice();
    history.push(newArr);

    this.setState({grid: newArr, history: history})
  }

  reset(event) {
    this.setState({history: [ARRZERO], grid: ARRZERO});
  }

  undo(event) {
    let history = this.state.history.slice();
    history.pop();
    let pastGrid = history[history.length - 1];

    this.setState({history: history, grid: pastGrid})
  }

  newGame() {
    this.answer = genAnswerGrid();
    this.grid = genGrid(this.answer);
    this.setState({history: [ARRZERO], grid: ARRZERO})
  }

  render() {
    const currentGrid = this.state.grid;
    const rowSumAnswer = this.rowSumAnswer();
    const colSumAnswer = this.colSumAnswer();
    const rowSumGrid = currentGrid.map(sumRow);
    const colSumGrid = _.zip(...currentGrid).map(sumRow);
    const rowBooleanArr = rowSumAnswer.map((val, i) => val === rowSumGrid[i]);
    const colBooleanArr = colSumAnswer.map((val, i) => val === colSumGrid[i]);
    const completed = [...rowBooleanArr, ...colBooleanArr].every(isTrue);

    return (
      <div>
        <div className="grid">
          {this.grid.map((row, i) =>
            <div className="row" key={'div' + i}>
              {row.map((value, j) =>
                <CheckBox
                  key={`checkbox${i}${j}`} 
                  value={value} 
                  name={`${i}${j}`} 
                  onChange={this.handleChange} 
                  checked={this.state.grid[i][j] !== 0}/>
              )}
            </div>
          )}
        </div>
        <div className="row-answer">
            {rowSumAnswer.map((val, i) => 
              <div 
                key={'rowAns' + i} 
                className="row-sum" 
                style={rowBooleanArr[i] ? CORRECT : INCORRECT}>
                  {val}
              </div>
            )}
        </div>
        <div className="col-answer">
          {colSumAnswer.map((val,i) => 
            <div 
              key={'colAns'+i} 
              className="col-sum" 
              style={colBooleanArr[i] ? CORRECT : INCORRECT}>
                {val}
            </div>
          )}
        </div>
        <div className='button-group'>
          <button onClick={this.undo} disabled={this.state.history.length === 1}>Undo</button>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.newGame}>New Game</button>
        </div>
        {completed &&
          <Modal>
            <div className="modal-content">
              <h1>Congratulations!</h1> 
              <button onClick={this.newGame}>Play Again?</button>
            </div>
          </Modal>
        }
      </div>
    )
  }
}

export default App;
