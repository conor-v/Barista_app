import './style.css';
import data from './assets/data/coffees.json';

{
  const init = () => {
    getCoffees(data);

    const $orderItem = document.querySelector(`.order`);
    const $ordersList = document.querySelector(`.orders`).contains($orderItem);
    toggleContent($ordersList);

  };

  const getCoffees = data => {
    const coffees = data.coffees;
    coffees.forEach(coffee => {
      if (coffee.plantbased === true) {
        makeCoffee(coffee);
      }
    });
  };

  const makeCoffee = coffee => {
    const $lijst = document.querySelector(`.prices__list`);

    const $li = document.createElement(`li`);
    $li.classList.add(`price`);
    $lijst.appendChild($li);

    $li.innerHTML = opbouw(coffee);
  };

  const opbouw = data => {
    return `
    <a class="price__button">
      <span class="price__button__wrapper">
        <span class="price__button__name">${data.name}</span>
        <span class="price__button__amount">&euro; ${round(data.prices.medium)}</span>
      </span>
      <span class="price__button__plus">+</span>
    </a>`;
  };

  const round = num => {
    return num.toFixed(2);
  };

  const toggleContent = ulInfo => {
    const $empty = document.querySelector(`.emptystate`);
    const $notEmpty = document.querySelector(`.orders__wrapper`);

    if (ulInfo === false) {
      $empty.classList.remove(`hide`);
      $notEmpty.classList.add(`hide`);
    }
    if (ulInfo === true) {
      $empty.classList.add(`hide`);
      $notEmpty.classList.remove(`hide`);
    }
  };

  init();
}
