const spinners = document.getElementById('spinners');
const playerDetails = document.getElementById('player-details');
const searchResult = document.getElementById('search-result');

const searchPlayer = async () => {
    const searchField = document.getElementById('search-field');
    const searchVal = searchField.value;
    searchField.value = '';
    playerDetails.textContent = '';
    searchResult.textContent = '';
    if (searchVal == '') {
        playerDetails.innerHTML = `
        <h2 class='col-12'>search result doesn't match any palyer</h2>
        `;
    }
    else {
        spinners.classList.remove('d-none');
        const url = (`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${searchVal}`);
        const response = await fetch(url);
        const data = await response.json();
        displaySearchPlayer(data.player);
    }
}

const displaySearchPlayer = players => {
    searchResult.textContent = '';
    searchResult.classList.add('d-none');
    if (players === null) {
        spinners.classList.add('d-none');
        playerDetails.innerHTML = `
        <h2 class='col-12'>search result doesn't match any palyer</h2>
        `;
    }
    else {
        for (const player of players) {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('col');
            playerDiv.innerHTML = `
            <div class="card">
            <img src="${player.strThumb ? player.strThumb : ''}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <button class="btn btn-outline-success" onclick="loadPlayerDetails(${player.idPlayer})" href="#" class="btn btn-primary">Player details</button>
            </div >
        </div >
            `;
            searchResult.appendChild(playerDiv);
        }
    }
    spinners.classList.add('d-none');
    searchResult.classList.remove('d-none');
}

const loadPlayerDetails = async id => {
    spinners.classList.remove('d-none');
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayPlayerDetails(data.players[0]);
}

const displayPlayerDetails = player => {
    playerDetails.textContent = '';
    playerDetails.classList.add('d-none');
    const playerDiv = document.createElement('div');
    playerDiv.innerHTML = `
    <div class="card">
    <img src="${player.strCutout}" class="card-img-top" alt="">
    <div class="card-body">
    <h3 class="card-title">${player.strPlayer}</h3>
    <h6 class="card-title">Birth Location: ${player.strBirthLocation}, ${player.strNationality}</h6>
    <h6 class="card-title">Team: ${player.strTeam}, ${player.strTeam2}</h6>
    <p>${player.strDescriptionEN ? player.strDescriptionEN : ''}</p>
    
    </div >
    </div >
    `;
    playerDetails.appendChild(playerDiv);
    spinners.classList.add('d-none');
    playerDetails.classList.remove('d-none');
}