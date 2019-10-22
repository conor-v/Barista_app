import './style.css';
import data from './assets/data/coffees.json';

{
  const init = () => {
    getCoffees(data);

    const $items = document.querySelectorAll(`.price`);
    $items.forEach(function($item) {
      $item.addEventListener(`click`, e => {
        addOrder(e.composedPath()[2]);
      });
    });

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
    $li.setAttribute(`data_id`, `${coffee.id}`);
    $li.innerHTML = opbouw(coffee);
    $lijst.appendChild($li);
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

  const addOrder = e => {
    const num = e.getAttribute('data_id');
    console.log(num);
    const naam = document.querySelector(`.price:nth-child(${num}n) .price__button__name`).innerHTML;
    const prijs = document.querySelector(`.price:nth-child(${num}n) .price__button__amount`).innerHTML;
    console.log(naam);
    console.log(prijs);
    const $orders = document.querySelector(`.orders`);

    const $li = document.createElement(`li`);
    $li.classList.add(`order`);
    $li.innerHTML = `
      <span class="order__name">
        <span class="order__amount">1x</span> ${naam}
      </span>
      <span class="order__price">${prijs}
        <button class="remove">
          x
        </button>
      </span>`;
    $orders.appendChild($li);
  };

  const toggleContent = ulInfo => {
    const $empty = document.querySelector(`.emptystate`);
    const $notEmpty = document.querySelector(`.orders__wrapper`);

    console.log(ulInfo);

    if (ulInfo === true) {
      $empty.classList.add(`hide`);
      $notEmpty.classList.remove(`hide`);
    }
    if (ulInfo === false) {
      $empty.classList.remove(`hide`);
      $notEmpty.classList.add(`hide`);
    }
  };

  init();
}
