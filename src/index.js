import './style.css';
import data from './assets/data/coffees.json';

{
  const init = () => {
    getCoffees(data);

    const $lis = document.querySelectorAll(`.price`);
    for (let i = 0;i < $lis.length;i ++) {
      $lis[i].addEventListener(`click`, addOrder);
    }
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
    //LI
    const $li = document.createElement(`li`);
    $li.classList.add(`price`);
    $lijst.appendChild($li);
    //A
    const $a = document.createElement(`a`);
    $a.classList.add(`price__button`);
    $li.appendChild($a);
    //SPAN DIV
    const $spanD = document.createElement(`span`);
    $spanD.classList.add(`price__button__wrapper`);
    $a.appendChild($spanD);
    //SPAN NAME
    const $spanN = document.createElement(`span`);
    $spanN.classList.add(`price__button__name`);
    $spanN.textContent = coffee.name;
    $spanD.appendChild($spanN);
    //SPAN PRIJS
    const $spanP = document.createElement(`span`);
    $spanP.classList.add(`price__button__amount`);
    $spanP.textContent = `€ ${round(coffee.prices.medium)}`;
    $spanD.appendChild($spanP);
    //SPAN BUTTON
    const $spanB = document.createElement(`span`);
    $spanB.classList.add(`price__button__plus`);
    $spanB.textContent = `+`;
    $a.appendChild($spanB);
  };

  const round = num => {
    return num.toFixed(2);
  };

  const addOrder = () => {
    console.log(`click`);
  };

  init();
}
