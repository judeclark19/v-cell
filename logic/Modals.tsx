import { makeAutoObservable } from "mobx";

class Modal {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}

export default Modal;
