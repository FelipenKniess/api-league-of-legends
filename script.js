/* 
    Porque utilizar arrow-function? / conceito de arrow function

    
    conexão de api através do fetch
    Promises
    Async await
*/
const form = document.querySelector('#form_champion');
form.addEventListener('submit', event => {
    event.preventDefault();
    handleSubmit();
});

function findChampion(nameChampion){
    return fetch(`http://ddragon.leagueoflegends.com/cdn/10.19.1/data/en_US/champion/${nameChampion}.json`);
}

async function handleSubmit() {
    const { value } = document.getElementById('champion');
    try{
        const responseChampion = await findChampion(value);
        const { data } = await responseChampion.json();
        createChampion(Object.values(data)[0]);
    } catch(err){
        console.log(err);
        championNotFound();
    }
}

function createChampion(champion){
    console.log(champion);
    const content = document.getElementById('content');
    content.innerHTML = '';
    const title = createElement('div', 'title', champion.id);
    const subTitle = createElement('div', 'sub-title', champion.title);
    const funcao = createElement('div', 'function', champion.tags);
    const description = createElement('div', 'description', champion.lore);
    const blurb = createElement('div', 'blurb', champion.blurb);
    const enemytips = createElement('div', 'enemytips', champion.enemytips);
    const statsHp = champion.stats.hp;    
    const statsMp = champion.stats.mp;
    const statsArmor = champion.stats.armor;
    const statsAtkSpeed = champion.stats.attackspeed;
    const stats = '<span style:>Status</span>'+
                  `<div><strong>HP: </strong> ${statsHp}</div>`+
                  `<div><strong>MP: </strong> ${statsMp}</div>`+
                  `<div><strong>ARMOR: </strong>: ${statsArmor}</div>`+
                  `<div><strong>AtkSpeed: </strong>: ${statsAtkSpeed}</div>`;
    const divStatus = createElement('div', 'stats', stats);
    
    content.appendChild(title);
    content.appendChild(subTitle);
    content.appendChild(funcao);
    content.appendChild(description);
    content.appendChild(blurb);
    content.appendChild(enemytips);
    content.appendChild(divStatus);
}

function championNotFound(){
    const content = document.getElementById('content');
    content.innerHTML = '';
    const notFound = createElement('div', 'champion-not-found', 'Champion not found');
    content.appendChild(notFound);
}

function createElement(nameElement, classElement, valueElement){
    const element = document.createElement(nameElement);
    element.classList.add(classElement);
    element.innerHTML = valueElement;
    return element;
}