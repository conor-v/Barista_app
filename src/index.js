import './style.css';
import data from './assets/data/coffees.json';

{
  const init = () => {
    getCoffees(data);

    const $items = document.querySelectorAll(`.price`);
    $items.forEach($item => {
      $item.addEventListener(`click`, e => {
        addOrder(e.composedPath()[2]);
      });
    });
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
    const naam = document.querySelector(`.price:nth-child(${num}n) .price__button__name`).innerHTML;
    const prijs = document.querySelector(`.price:nth-child(${num}n) .price__button__amount`).innerHTML;
    const $list = document.querySelector(`.orders`);

    const $li = document.createElement(`li`);
    $li.setAttribute(`data_id`, `${num}`);
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
    $list.appendChild($li);

    const $orderItem = document.querySelector(`.order`);
    const $ordersList = document.querySelector(`.orders`).contains($orderItem);
    toggleContent($ordersList);

    const $orders = document.querySelectorAll(`.order__price`);
    totaal($orders);

    const $delete = document.querySelectorAll(`.remove`);
    $delete.forEach($x => {
      $x.addEventListener(`click`, e => {
        deleteOrder(e.composedPath()[2]);
      });
    });
  };

  const toggleContent = ulInfo => {
    const $empty = document.querySelector(`.emptystate`);
    const $notEmpty = document.querySelector(`.orders__wrapper`);

    if (ulInfo === true) {
      $empty.classList.add(`hide`);
      $notEmpty.classList.remove(`hide`);
    }
    if (ulInfo === false) {
      $empty.classList.remove(`hide`);
      $notEmpty.classList.add(`hide`);
    }
  };

  const totaal = orders => {
    const $totaalBedrag = document.querySelector(`.totaalBedrag`);
    let resTotaal = 0;
    orders.forEach(function(order) {
      const str = order.textContent;
      const res = parseFloat(str.substr(2, 5));

      resTotaal += res;

      console.log(resTotaal);
      $totaalBedrag.innerHTML = round(resTotaal);
    });
  };

  const deleteOrder = e => {
    const num = e.getAttribute('data_id');
    const $item = document.querySelector(`.order:nth-child(${num}n)`);
    const $list = document.querySelector(`.orders`);
    console.log($item);
    $list.removeChild($item);
  };

  init();
}
