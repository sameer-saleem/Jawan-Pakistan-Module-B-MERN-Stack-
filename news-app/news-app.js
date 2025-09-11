let searchNewsEl = document.getElementById("searchNews");
let newsCardsRow = document.getElementById("newsCardsRow");
let searchedKeyword = "";

searchNewsEl.addEventListener("change", function (e) {
    searchedKeyword = e.target.value;
});

function searchNews() {
 newsCardsRow = "";
    let url = `https://api.worldnewsapi.com/search-news?text=${searchedKeyword}&language=en`;
    const apiKey = 'bb7cd15f4fd744eba60a3f739f817943';
    let apiData = fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey
        }
    });

    apiData.then(res => res.json())
        .then(data => {
            let ourNews = data.news;
            // console.log(ourNews)

           
            ourNews.forEach(item => {
                newsCardsRow.innerHTML += `
                <div class="col-lg-4 col-md-6 col-12 d-flex align-self-stretch">
                    <div class="card w-100 h-100">
                        <a href="${item.url}" target="_blank" class="card-img-top d-block"><img src="${item.image}" class="h-100" alt="news image"></a>
                        <div class="card-body">
                            <a href="${item.url}" target="_blank" class="d-block"><h5 class="card-title">${item.title}</h5></a>
                            <p class="card-text">${item.summary}</p>
                            <a href="${item.url}" target="_blank" class="btn btn-outline-primary">Watch the Original Source </a>
                        </div>
                    </div>
                </div>
                    `
            })
        })
        .catch(err => console.log('Error: ', err));
    // console.log(searchedKeyword);
}