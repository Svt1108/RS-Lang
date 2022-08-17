export class AppModel {
  isAuthorised;

  constructor() {
    this.isAuthorised = false; // localStorage
  }

  getState() {
    return {
      isAuthorised: this.isAuthorised,
    };
  }
}
