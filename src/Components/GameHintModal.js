export default function GameHintModal({ onClose }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2 id="game-hints2">How to Play Tic Tac Toe</h2>
          <p id="game-hints3">
            Tic Tac Toe is a two-player game where players take turns marking
            spaces in a 3x3 grid with their symbols (X or O). The player who
            succeeds in placing three of their marks in a horizontal, vertical,
            or diagonal row wins the game.
          </p>
        </div>
      </div>
    );
  }
  