class Navigation {
    constructor() {
      this.mobileNavBtn = document.querySelector(".mobile-navbar-btn");
      this.header = document.querySelector(".header");
      this.links = document.querySelectorAll(".navbar-list li");
  
      this.init();
    }
  
    init() {
      this.mobileNavBtn.addEventListener("click", () => this.toggleNavbar());
      this.links.forEach(link => link.addEventListener("click", () => this.removeNavbar()));
    }
  
    toggleNavbar() {
      this.header.classList.toggle("active");
    }
  
    removeNavbar() {
      this.header.classList.remove("active");
    }
  }
  
  new Navigation();
  