let searchNewsEl = document.getElementById("searchNews");
let newsCardsRow = document.getElementById("newsCardsRow");
let searchedKeyword = "";

searchNewsEl.addEventListener("change", function (e) {
    searchedKeyword = e.target.value;
});

function searchNews() {

    if (searchedKeyword !== null && searchedKeyword !== '') {

        newsCardsRow.innerHTML = `
            <div class="loader">
                <div class="spinner-grow fs-1 text-center" role="status">
                    <span class="visually-hidden"></span>
                </div>
                <p class="mt-2 text-center fs-4">Loading...</p>
            </div>
        `;

        // let url = `https://api.worldnewsapi.com/search-news?text=${searchedKeyword}&language=en`;
        let url = `https://newsdata.io/api/1/latest?apikey=pub_deda96f94e9e499b83601c7fe93d8073&q=${searchedKeyword}`

        let apiData = fetch(url);

        apiData.then(res => res.json())
            .then(data => {
                console.log(data, 'api data');
                let ourNews = data.results;
                // console.log(ourNews)

                if (ourNews.length === 0) {
                    newsCardsRow.innerHTML = `<h1 class="text-danger text-center">Not found any news related => ${searchedKeyword}</h1>`;
                    return;
                }

                if (ourNews.length > 0) {
                    newsCardsRow.innerHTML = "";
                    ourNews.forEach(item => {
                        newsCardsRow.innerHTML += `
                    <div class="col-lg-4 col-md-6 col-12 d-flex align-self-stretch">
                        <div class="card w-100 h-100">
                            <a href="${item.link}" target="_blank" class="card-img-top d-block"><img src="${item.image_url}" class="h-100 w-100" alt="news image"></a>
                            <div class="card-body">
                                <a href="${item.link}" target="_blank" class="d-block"><h5 class="card-title">${item.title}</h5></a>
                                <div class="d-flex flex-wrap gap-2 align-items-center my-2">
                                    ${item.category.map(cat => `<span class="badge">${cat}</span>`)}
                                </div>
                                <p class="card-text">${item.description}</p>
                                <a href="${item.link}" target="_blank" class="btn btn-primary d-inline-flex align-items-center gap-2">
                                Read More 
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                        `
                    });
                } else {
                    newsCardsRow.innerHTML = `<h1 class="text-danger text-center">Loading...</h1>`;
                }
            })
            .catch(err => console.log(err));
    } else {
        alert('Please type any word in the Search bar');
    }
    // console.log(searchedKeyword);
}

newsCardsRow.innerHTML = `
    <div class="loader">
        <div class="spinner-grow fs-1 text-center" role="status">
            <span class="visually-hidden"></span>
        </div>
        <p class="mt-2 text-center fs-4">Loading...</p>
    </div>
`;

// let url = `https://api.worldnewsapi.com/search-news?text=${searchedKeyword}&language=en`;
let url = `https://newsdata.io/api/1/latest?apikey=pub_deda96f94e9e499b83601c7fe93d8073&q=${searchedKeyword != null && searchedKeyword !== '' ? searchedKeyword: "Software Company"}`

let apiData = fetch(url);

apiData.then(res => res.json())
    .then(data => {
        console.log(data, 'api data');
        let ourNews = data.results;
        // console.log(ourNews)

        if (ourNews.length === 0) {
            newsCardsRow.innerHTML = `<h1 class="text-danger text-center">Not found any news related => ${searchedKeyword}</h1>`;
            return;
        }

        if (ourNews.length > 0) {
            newsCardsRow.innerHTML = "";
            ourNews.forEach(item => {
                newsCardsRow.innerHTML += `
                <div class="col-xxl-4 col-xl-6 col-12 d-flex align-self-stretch">
                    <div class="card w-100 h-100">
                        <a href="${item.link}" target="_blank" class="card-img-top d-block"><img src="${item.image_url}" class="h-100 w-100" alt="news image"></a>
                        <div class="card-body">
                            <a href="${item.link}" target="_blank" class="d-block"><h5 class="card-title">${item.title}</h5></a>
                            <div class="d-flex flex-wrap gap-2 align-items-center my-2">
                                ${item.category.map(cat => `<span class="badge">${cat}</span>`)}
                            </div>
                            <p class="card-text">${item.description}</p>
                            <a href="${item.link}" target="_blank" class="btn btn-primary d-inline-flex align-items-center gap-2">
                            Read More 
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>
                            </a>
                        </div>
                    </div>
                </div>
                    `
            });
        } 
    })
    .catch(err => console.log(err));