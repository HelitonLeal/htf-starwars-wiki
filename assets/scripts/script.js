
function renderResponse(response) {
    const list = document.getElementById('films-list');
    list.innerHTML = "";

        response.forEach(film => {
            const filmCard = document.createElement("div");
            filmCard.style.backgroundImage = `url(${film.image_url})`
            filmCard.className = "film-card";
            
            filmCard.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";
                
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = "";

                const filmTitle = document.createTextNode(film.title);
                const filmTitleElement = document.createElement("h1");
                filmTitleElement.appendChild(filmTitle)
                modalContent.appendChild(filmTitleElement);

                const filmSubtitle = document.createTextNode(film.subtitle);
                const filmSubtitleElement = document.createElement("h3");
                filmSubtitleElement.appendChild(filmSubtitle);
                modalContent.appendChild(filmSubtitleElement);

                const filmDescription = document.createTextNode(film.description);
                const filmDescriptionElement = document.createElement("p");
                filmDescriptionElement.appendChild(filmDescription);
                modalContent.appendChild(filmDescriptionElement);             
            }
            list.appendChild(filmCard);
        });
}

window.onload = () => {
    fetch('https://sevencoders-starwars-wiki.herokuapp.com/films')
    .then(async (data) => {
        const response = await data.json();
        renderResponse(response);
    })
    .catch((error) => {
        console.log({error});
        alert('Erro ao carregar os Filmes');
    })
};

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";    
}

function onSearch() {
    const searchValue = document.getElementById("search-input").value;
    fetch(
        searchValue.length === 0 
        ? "https://sevencoders-starwars-wiki.herokuapp.com/films" 
        : `https://sevencoders-starwars-wiki.herokuapp.com/search?query=${searchValue}`
        )
    .then(async (data) => {
        const response = await data.json();
        renderResponse(response);
    })
    .catch((error) => {
        console.log(error);
        alert('Falha ao realizar busca!');
    })
} 
