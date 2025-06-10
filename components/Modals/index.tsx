import HighScoresModal from "./HighScoresModal";
import InstructionsModal from "./InstructionsModal";
import PauseModal from "./PauseModal";
import SettingsModal from "./SettingsModal";
import WinModal from "./WinModal";

export {
  HighScoresModal,
  InstructionsModal,
  PauseModal,
  SettingsModal,
  WinModal
};

export function getWinRatio() {
  const { wins, totalGames } = JSON.parse(
    localStorage.getItem("vCellWinRatio")!
  );

  const percent =
    totalGames === 0
      ? "0%"
      : `${((wins / totalGames) * 100).toFixed(2).replace(/\.?0+$/, "")}%`;
  return {
    percent,
    wins,
    totalGames
  };
}
