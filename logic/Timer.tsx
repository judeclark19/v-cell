import { makeAutoObservable } from "mobx";

class Timer {
  isVisible = true;
  isRunning = false;
  timeElapsed = 0;
  interval: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  setIsRunning(isRunning: boolean) {
    this.isRunning = isRunning;
  }

  setTimeElapsed(timeElapsed: number) {
    this.timeElapsed = timeElapsed;
  }

  startInterval() {
    if (this.interval) this.clearInterval();

    this.setIsRunning(true);

    this.interval = setInterval(() => {
      this.setTimeElapsed(this.timeElapsed + 10);
    }, 10);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setIsRunning(false);
  }
}

export default Timer;
