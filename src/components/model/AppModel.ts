export class AppModel {
  lastPage;
  isAuthorised;

  constructor() {
    this.lastPage = 'main'; // sessionStorage
    this.isAuthorised = false; // localStorage
  }

  getState() {
    return {
      lastPage: this.lastPage,
      isAuthorised: this.isAuthorised,
    };
  }
}
