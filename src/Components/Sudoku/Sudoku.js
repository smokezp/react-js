import React, {Component} from 'react';

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
      while (correct === false) {
        number = this.getRandomNumber(incorrect_numbers);
        // if(!number) {
        // console.log('incorrect_numbers', incorrect_numbers);
        // console.log('number', number);
        // }
        let check_successful = true;
        // console.log(number);

        top:
            for (let i = 0; i < 2; i++) {
              for (let j = 0; j < this.state.last_number; j++) {
                let another_number;
                if (i) {
                  another_number = this.state.board[row_key][j]
                } else {
                  another_number = this.state.board[j][key]
                }
                // console.log('j', j);
                if (number === another_number) {
                  // console.log(this.state.board);debugger
                  // console.log('incorrect_numbers', incorrect_numbers);
                  // console.log('i=', i)
                  // console.log('row_key=', row_key)
                  // console.log('key=', key)
                  // console.log('another_number', another_number)
                  // console.log('number_f', number)
                  check_successful = false;
                  // console.log('failed1');
                  break top;
                }
              }
            }

        if (check_successful) {

          for (let i = 0; i < positions.length; i++) {
            // console.log(positions[i]);
            let row_key_from = positions[i][0],
                row_key_to = positions[i][1],
                key_from = positions[i][2],
                key_to = positions[i][3];
            // console.log('row_key_from', row_key_from);
            // console.log('row_key_to', row_key_to);
            // console.log('key_from', key_from);
            // console.log('key_to', key_to);
            if (row_key_from <= row_key && row_key <= row_key_to &&
                key_from <= key && key <= key_to) {
              // console.log('!!!!row_key=', row_key);
              // console.log('!!!!key=', key);
              top2:
                  for (let j = row_key_from; j <= row_key_to; j++) {
                    // console.log('j', j);

                    for (let k = key_from; k <= key_to; k++) {
                      // console.log('k', k);
                      if (this.state.board[j][k] === number) {
                        check_successful = false;
                        // console.log('j')
                        // console.log('failed2');
                        break top2;
                      }
                    }
                  }

              break;
            }
          }
        }

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

  }

  /*
  */
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
    for (let m = 0; m <= this.getRandomNumber(default_board) + 1; m++) {
      new_board = this.transportAllBoard(new_board);
      new_board = this.switchRows(new_board);
      new_board = this.switchColumns(new_board);
    }

    return new_board;
  }

  generateBoard() {
    return this.state.board.map((row, row_key) => {
      const array = row.map((value, key) => {

        return (
            <button key={key} className="square" onClick={() => this.setNumber(row_key, key)}>{value}</button>
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