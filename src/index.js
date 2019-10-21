import './style.css';
import data from './assets/data/coffees.json';

{
  const init = () => {
    getCoffees(data);

    const $menuItems = Array.from(document.getElementsByClassName(`price`));
    for (let i = 0;i < $menuItems.length;i ++) {
      $menuItems[i].addEventListener('click', addOrder($menuItems[i]));
      console.log($menuItems[i].getAttribute('data_id'));
    }

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

  const toggleContent = ulInfo => {
    const $empty = document.querySelector(`.emptystate`);
    const $notEmpty = document.querySelector(`.orders__wrapper`);

    console.log(ulInfo);

    if (ulInfo === false) {
      $empty.classList.remove(`hide`);
      $notEmpty.classList.add(`hide`);
    } else {
      $empty.classList.add(`hide`);
      $notEmpty.classList.remove(`hide`);
    }
  };

  const addOrder = data => {
    /*const $notEmpty = document.querySelector(`.orders`);

    const $li = document.createElement(`li`);
    $li.classList.add(`order`);
    $li.innerHTML = `
    <span class="order__name">
      <span class="order__amount">{amount} x</span> {drink.name}
    </span>
    <span class="order__price">&euro; {total}
      <button class="remove">
        x
      </button>
    </span>`;
    $notEmpty.appendChild($li);*/
  };

  /* DELETE FUNCTIE VOOR ORDERS
    const deleteItem = () => {
      const confirmationLinks = Array.from(document.getElementsByClassName(`delete`));
      confirmationLinks.forEach($confirmationLink => {
        $confirmationLink.addEventListener(`click`, e => {
          if (!confirm('Ben je zeker dat je dit wilt verwijderen?')) e.preventDefault();
        });
      });
    };
  */
  init();
}
