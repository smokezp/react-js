import React, {Component} from 'react';
import cloneDeep from 'lodash/cloneDeep';

class Sudoku extends Component {
  constructor(props) {
    super(props);

    let default_board = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ];

    this.state = {
      board: this.transportBoard(default_board),
      first_number: 1,
      last_number: 9

    };
  }

  /*
    setCorrectNumber(row_key, key) {
      // console.log(key);
      let incorrect_numbers = [];
      let correct = false;
      let number;



      let count = 0;
      while (correct === false) {
        number = this.getRandomNumber(incorrect_numbers);
        // if(!number) {
        // console.log('incorrect_numbers', incorrect_numbers);
        // console.log('number', number);
        // }




        // console.log('number', number);
        // console.log('check_successful', check_successful);
        // check_successful = true;
        if (check_successful) {
          correct = check_successful;
        } else {
          incorrect_numbers.push(number);
        }
        count += 1;
        if (count === 10) {
          console.log('___________');
          correct = true;
        }
      }
      console.log('number222', number);
      // console.log('this.state.board', this.state.board);
      // this.state.board[row_key][key] = number;
      // console.log('this.state.board', this.state.board);
      //
      // let new_board = this.state.board;
      this.state.board[row_key][key] = number;
      // console.log(my_value);debugger
      // new_board[row_key][key] = number;
      // this.setState({
      //   board: new_board,
      // });
      return number;
    }
  */


  getRandomNumber(i_n) {
    let array = [];
    for (let i = 0; i < 9; i++) {
      array.push(i);
    }

    if (i_n) {
      let index = array.indexOf(i_n);
      if (index > -1) {
        array.splice(index, 1);
      }
    }

    return array[Math.floor(Math.random() * array.length)];
  }

  setNumber(row_key, key) {
    console.log('666');
  }

  switchRows(new_board) {
    let rand1 = this.getRandomNumber();
    let rand2 = this.getRandomNumber(rand1);
    let row1 = new_board[rand1];
    let row2 = new_board[rand2];

    new_board[rand2] = row1;
    new_board[rand1] = row2;
    return new_board;
  }

  switchColumns(new_board) {
    let rand1 = this.getRandomNumber();
    let rand2 = this.getRandomNumber(rand1);

    for (let i = 0; i < new_board.length; i++) {
      let rand1value = new_board[i][rand1];
      let rand2value = new_board[i][rand2];
      new_board[i][rand2] = rand1value;
      new_board[i][rand1] = rand2value;
    }
    return new_board;
  }

  transportAllBoard(new_board) {
    return new_board.map((col, i) => new_board.map(row => row[i]));
  }

  transportBoard(default_board) {
    let new_board = default_board;
    // for (let m = 0; m <= this.getRandomNumber() + 1; m++) {
    //   new_board = this.transportAllBoard(new_board);
    //   new_board = this.switchRows(new_board);
    //   new_board = this.switchColumns(new_board);
    // }
    new_board = this.deleteCells(new_board);
    return new_board;
  }

  deleteCells(old_board) {
    let new_board = old_board;
    // let count = 0;
    // ddd:
    for (let i = 0; i < new_board.length; i++) {
      for (let j = 0; j < new_board.length; j++) {
        let rand = this.getRandomNumber();
        if (rand < 5) {
          let value = new_board[i][j];
          new_board[i][j] = null;
          if (!this.isCorrect(new_board)) new_board[i][j] = value;
          // if ( count ===1) break ddd;
          // count+=1;
        }
      }
    }

    return new_board;
  }

  getEmptyCells(board) {
    let all_empty_cells = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (!board[i][j]) all_empty_cells.push({i: i, j: j, used: []})
      }
    }
    return all_empty_cells
  }

  isCorrect(new_board) {
    let all_empty_cells = this.getEmptyCells(new_board);
    // console.log(all_empty_cells.length);
    let correct = true;
    let solutions = 0;
    let length_of_empty = all_empty_cells.length;
    if (length_of_empty) {

      const positions = [
        [0, 2, 0, 2],
        [0, 2, 3, 5],
        [0, 2, 6, 8],
        [3, 5, 0, 2],
        [3, 5, 3, 5],
        [3, 5, 6, 8],
        [6, 8, 0, 2],
        [6, 8, 3, 5],
        [6, 8, 6, 8]
      ];


      let count = 0;

      let fff = 0;
      while (count !== length_of_empty && correct) {
        let clone_board = cloneDeep(new_board);
        let first_number;
        for (let n = 0; n < length_of_empty; n++) {
          let empty_cell = all_empty_cells[n];

          let is_correct_number = false;
          for (let number = 1; number <= 9; number++) {
            let check_successful = true;

            if (!empty_cell.used.includes(number)) {
              if (n === count) first_number = number;
              first_check:
                  for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 9; j++) {
                      let another_number;
                      if (i) {
                        another_number = clone_board[empty_cell.i][j]
                      } else {
                        another_number = clone_board[j][empty_cell.j]
                      }

                      if (number === another_number) {
                        check_successful = false;
                        break first_check;
                      }
                    }
                  }


              if (check_successful) {
                for (let i = 0; i < positions.length; i++) {

                  let row_key_from = positions[i][0],
                      row_key_to = positions[i][1],
                      key_from = positions[i][2],
                      key_to = positions[i][3];

                  if (row_key_from <= empty_cell.i && empty_cell.i <= row_key_to &&
                      key_from <= empty_cell.j && empty_cell.j <= key_to) {

                    second_check:
                        for (let j = row_key_from; j <= row_key_to; j++) {
                          for (let k = key_from; k <= key_to; k++) {
                            if (clone_board[j][k] === number) {
                              check_successful = false;
                              break second_check;
                            }
                          }
                        }

                    break;
                  }
                }
              }

              if (check_successful) {
                clone_board[empty_cell.i][empty_cell.j] = number;
                is_correct_number = true;
                break;
              }
            }
          }



          all_empty_cells[count].used.push(first_number);

            if (n === count && !is_correct_number) {
              all_empty_cells[count].used.splice();
              console.log(count);
              count += 1;
            }
        }

        if (!this.getEmptyCells(clone_board).length) {

          // all_empty_cells[count].used.push(first_number);
          solutions += 1;
        }

        if (solutions > 1) {
          correct = false;
          break;
        }


        fff += 1;
        if (fff > 100000) {


          // console.log('count', count);
          // console.log('all_empty_cells', all_empty_cells.length);
          console.log('!!!!!!!!!!1');
          break;
        }


        // count += 1;
        // if (count > 10000) {
        //   correct = false;
        // }
      }

    }
      console.log('solutions', solutions);
    return solutions === 1;
  }

  generateBoard() {
    return this.state.board.map((row, row_key) => {
      const array = row.map((value, key) => {

        return (
            <input key={key} className="square" value={value? value:''} onChange={() => this.setNumber(row_key, key)}/>
        );
      });

      return (
          <div key={row_key} className="board-row">
            {array}
          </div>
      );

    });
  }

  render() {
    return (
        <div className="game">
          <div className="game-board">
            {this.generateBoard()}
          </div>
          <div className="game-info">
          </div>
        </div>
    );
  }

}

export default Sudoku;