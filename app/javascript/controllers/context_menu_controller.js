import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="context-menu"
export default class extends Controller {
  static targets = ["menu", "editLink", "deleteLink", "showLink"];

  connect() {
    console.log('hey from stim');
    this.hideMenu = this.hideMenu.bind(this);
    document.addEventListener("click", this.hideMenu);
  }

  disconnect() {
    document.removeEventListener("click", this.hideMenu);
    document.removeEventListener("scroll", this.hideMenu);
  }

  open(event) {
    event.preventDefault();
    event.stopPropagation();

    let clickedElement = event.target;
    let todoId = this.getTodoId(clickedElement);

    if (todoId) {
      this.prepareMenuForTodoItem(todoId);
    } else {
      this.hideMenuOptions();
    }

    this.positionMenu(event);
    this.menuTarget.classList.remove("hidden");
  }

  prepareMenuForTodoItem(todoId) {
    this.updateLinkTargets(todoId);
    this.showMenuOptions();
  }

  hideMenuOptions() {
    this.toggleMenuOptions(true);
  }

  showMenuOptions() {
    this.toggleMenuOptions(false);
  }

  updateLinkTargets(todoId) {
    const todoPath = `/todos/${todoId}`;
    this.showLinkTarget.href = todoPath;
    this.editLinkTarget.href = `${todoPath}/edit`;
    this.deleteLinkTarget.href = todoPath;
  }

  getTodoId(clickedElement) {
    return clickedElement.closest("tr").dataset.todoId;
  }

  toggleMenuOptions(hide) {
    this.showLinkTarget.classList.toggle("hidden", hide);
    this.editLinkTarget.classList.toggle("hidden", hide);
    this.deleteLinkTarget.classList.toggle("hidden", hide);
  }

  positionMenu(event) {
    let menuDimensions = this.getDimensions(this.menuTarget);
    this.menuTarget.style.left = `${this.clampValue(
      event.clientX,
      window.innerWidth,
      menuDimensions.width
    )}px`;
    this.menuTarget.style.top = `${this.clampValue(
      event.clientY,
      window.innerHeight,
      menuDimensions.height
    )}px`;
  }

  clampValue(value, maxValue, elementDimension) {
    let viewportDimension = maxValue - elementDimension;
    return value > viewportDimension ? viewportDimension : value;
  }

  getDimensions(element) {
    let dimensions = {};
    element.classList.remove("hidden");
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.classList.add("hidden");
    return dimensions;
  }

  hideMenu(event) {
    if (this.shouldHideMenu(event)) {
      this.menuTarget.classList.add("hidden");
    }
  }

  shouldHideMenu(event) {
    return (
      !this.menuTarget.contains(event.target) ||
      event.target === this.menuTarget ||
      event.target.closest("a")
    );
  }
}
