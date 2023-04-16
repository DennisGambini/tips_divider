const main = document.querySelector('.main');
let tot_euro
let ore_totali

const tot_euro_input = document.querySelector('.tot_euro');
tot_euro_input.addEventListener('keyup', () => {
    if (event.keyCode === 13 && parseInt(tot_euro_input.value) >= 0) {
        tot_euro = parseInt(tot_euro_input.value);
        tot_euro_input.classList.remove('grey')
        tot_euro_input.classList.add('green')
        console.log('tot euro : ',tot_euro);
    }
})
tot_euro_input.addEventListener('focusout', () => {
    if (parseInt(tot_euro_input.value) >= 0) {
        tot_euro = parseInt(tot_euro_input.value);
        tot_euro_input.classList.remove('grey')
        tot_euro_input.classList.add('green')
        console.log('tot euro : ',tot_euro);
    }
})

console.log('totale persone : ', people.length)

function creaGriglia(peopleArray) {
    peopleArray.forEach((element, i) => {
        let div = document.createElement('div');
        div.classList.add('person')
        div.setAttribute('person_name', element.name)
        div.innerHTML = `
            <div class="col name">${element.name}</div>
            <input type="number" name="${i}" id="${i}" value="${element.hours ? element.hours : null}" class="col input_number ${element.hours ? 'green' : 'grey'}">
            <div class="col euro-arr">${element.euro_arr ? element.euro_arr : '-'}</div>
            <div class="col percentages">${element.percentage ? element.percentage : '-'}</div>
            <div class="col euro">${element.euro ? element.euro : '-'}</div>
            
        `
        main.append(div)
    });
    let inputs = document.querySelectorAll('.input_number')
    inputs.forEach(input => {
        input.addEventListener('keyup', () => {
            if (event.keyCode === 13 && parseInt(input.value) >= 0) {
                let int = parseInt(input.id);
                people[int].hours = parseInt(input.value);
                console.log(people[int])
                input.classList.remove('grey')
                input.classList.add('green')
            }
        })
        input.addEventListener('focusout', () => {
            if (parseInt(input.value) >= 0) {
                let int = parseInt(input.id);
                people[int].hours = parseInt(input.value);
                console.log(people[int])
                input.classList.remove('grey')
                input.classList.add('green')
            }
        })
    })
}

creaGriglia(people)

const calcola_btn = document.querySelector('.calcola')
calcola_btn.addEventListener('click', calcolaFunction)
 
function calcolaFunction() {
    // check euro totali
    if (tot_euro) {

        let ore_totali_array = []

        people.forEach((element) => {
            if (element.hours === null) {
                console.log('nullatoooooo')
            } else {
                console.log(element.hours)
                ore_totali_array.push(element.hours)
            }
        });

        if (ore_totali_array.length === people.length) {
            console.log("BRAVO CE L'HAI FATTA")

            ore_totali = ore_totali_array.reduce((a, b) => a + b, 0)
            
            console.log(ore_totali)

            document.querySelector('.tot_ore').innerHTML = ore_totali

            calcolaCelle()

        }

    } else {
        console.log('metti euro totali')
    }

    
}

function calcolaCelle() {
    people.forEach(person => {

        person.percentage = person.hours / (ore_totali / 100)
        person.euro = person.percentage * (tot_euro / 100)


        console.log('person_%  ', person.percentage, '  person_euro   ', Math.round(person.euro))
        
        // casella percentuali
        let casella_perc = document.querySelector(`.person[person_name="${person.name}"] > .percentages`);
        casella_perc.innerHTML = person.percentage.toFixed(3) + ' &percnt;';
        casella_perc.classList.add('small_text');

        // casella euro non arrotondati
        let casella_euro = document.querySelector(`.person[person_name="${person.name}"] > .euro`);
        casella_euro.innerHTML = person.euro.toFixed(3);
        casella_euro.classList.add('small_text');

        // casella euro arrotondati

        let casella_arr = document.querySelector(`.person[person_name="${person.name}"] > .euro-arr`)
        casella_arr.innerHTML = Math.round(person.euro) + ' &euro;';
        casella_arr.classList.add('red_text');
    })
}