"use strict"

//DESIGNATES THE LOCATION OF FORM/USER INPUTS:
function renderCoffee(coffee) {
    let html = '<div class="">';
    html += '<div class="searchName">' + coffee.name + '</div>';
    html += '<div class="searchRoast">' + coffee.roast + '</div>';
    html += '</div>';
    return html;
}

//RENDERS LIST OF COFFEE TYPES BASED ON COFFEE ARRAY:
function renderCoffees(coffees) {
    let html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//FILTERS ROAST TYPE BASED ON USER SELECTION:
function updateCoffees(e) {
    //DON'T SUBMIT THE FORM; WE ONLY WANT TO UPDATE DATA:
    e.preventDefault();
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    //DISPLAYS ALL ROAST TYPES:
    if (selectedRoast === 'all') {
        coffeeList.innerHTML = renderCoffees(coffees);
        //DISPLAYS ONLY SELECTED ROAST TYPE:
    } else {
        coffees.forEach(function (coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        coffeeList.innerHTML = renderCoffees(filteredCoffees);
    }
}

//FILTERS COFFEE NAME BASED ON USER INPUT:
function searchCoffees(e) {
    //DON'T SUBMIT THE FORM; WE ONLY WANT TO UPDATE DATA
    e.preventDefault();
    let coffeeInput = coffeeNameSearch.value.toLowerCase();
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];

    coffees.forEach(function(coffee) {
        //SEARCHES EACH INPUT BASED ON SELECTED ROAST TYPE:
        if ((coffee.name.toLowerCase()).includes(coffeeInput) && coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
            //SEARCHES EACH INPUT BASED ON ALL ROAST TYPES:
        } else if((coffee.name.toLowerCase()).includes(coffeeInput) && selectedRoast === "all") {
            filteredCoffees.push(coffee);
        }
    });
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

//ADDS NEW COFFEE TYPE [ROAST & NAME] BASED ON USER SELECTION/INPUT:
function createCoffee(e) {
    e.preventDefault();
    let newCoffeeName = document.querySelector("#new-coffee-name");
    let newCoffeeRoast = document.querySelector("#new-coffee-roast");
    let newCoffee = {
        id: coffees.length + 1,
        name: newCoffeeName.value,
        roast: newCoffeeRoast.value
    }
    coffees.push(newCoffee);
    coffeeList.innerHTML = renderCoffees(coffees);
}

//COFFEE LIST [ARRAY]:
//FROM: http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

//RETRIEVES COFFEE ARRAY [LIST OF COFFEE]:
let coffeeList = document.querySelector('#coffees');
//RETRIEVES SUBMIT BUTTON FOR NEW COFFEE TYPE:
let submitButton = document.querySelector('#submit');
//RETRIEVES ROAST TYPE FROM SELECTION:
let roastSelection = document.querySelector('#roast-selection');
//RETRIEVES COFFEE NAME FROM USER INPUT:
let coffeeNameSearch = document.querySelector('#coffeeSearchInput');
//RETRIEVES NEW ROAST TYPE FROM SELECTION:
let newCoffeeRoast = document.querySelector("#new-coffee-roast");
//RETRIEVES NEW COFFEE NAME FROM USER INPUT:
let newCoffeeName = document.querySelector("#new-coffee-name");

//MODIFIES COFFEE ARRAY [LIST OF COFFEE]:
coffeeList.innerHTML = renderCoffees(coffees);
//INITIATES SEARCH BY KEYSTROKE OF TEXT INPUT:
coffeeNameSearch.addEventListener('keyup',searchCoffees);
//INITIATES FILTER BY SELECTION OF ROAST TYPE:
roastSelection.addEventListener('change',updateCoffees);
//INITIATES ADDITION OF NEW COFFEE TYPE FROM USER INPUT:
submitButton.addEventListener('click',createCoffee);