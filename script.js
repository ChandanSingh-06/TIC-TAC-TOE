    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', resetGame);

    function handleCellClick(e) {
      const index = e.target.getAttribute('data-index');

      if (board[index] !== '' || !gameActive) return;

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      checkWinner();
    }
    function checkWinner() {
      let roundWon = false;

      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          roundWon = true;
          break;
        }
      }
      if (roundWon){
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
      if (!board.includes('')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
    function resetGame() {
      currentPlayer = 'X';
      board = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      statusText.textContent = "Player X's turn";
      cells.forEach(cell => cell.textContent = '');
    }