const search =  document.getElementById('search');
const matchList = document .getElementById('match-list');

search.addEventListener('input', () => searchStates(search.value));


// Search states in json file and filter it

const searchStates = async searchText => {
    const res = await fetch('../docs/in.json');
    const states = await res.json();

    //Get matches to current input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`,'gi');
        return state.admin.match(regex) || state.city.match(regex);
    });

    if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0){
       const html = matches.map(match => `
            <div class="card card-body">
            <h4>${match.city} (${match.admin}) <span class="text-primary">${match.country}</span>
            </h4>
            <small>Lat: ${match.lat} / Long: ${match.lng}</small>
            </div>
       `).join('');
       matchList.innerHTML = html;
    }
};