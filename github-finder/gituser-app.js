let searchUserEl = document.getElementById("searchUser");
let gitCardsRow = document.getElementById("gitCardsRow");
let searchedKeyword = "";

searchUserEl.addEventListener("change", function (e) {
    searchedKeyword = e.target.value;
});

function searchGitUser() {

    if (searchedKeyword !== null && searchedKeyword !== '') {

        gitCardsRow.innerHTML = `
            <div class="loader">
                <div class="spinner-grow fs-1 text-center" role="status">
                    <span class="visually-hidden"></span>
                </div>
                <p class="mt-2 text-center fs-4">Loading...</p>
            </div>
        `;

        let url = `https://api.github.com/users/${searchedKeyword}`

        let apiData = fetch(url);

        apiData.then(res => res.json())
            .then(data => {
                console.log(data, 'api data');
                let gitUsers = data;

                if (!gitUsers || gitUsers.status == 404 || gitUsers.status == '404') {
                    gitCardsRow.innerHTML = `<h1 class="text-danger text-center">${searchedKeyword} not found</h1>`;
                    return;
                }

                if (gitUsers) {
                    gitCardsRow.innerHTML = "";
                    // gitUsers.forEach(item => {
                        gitCardsRow.innerHTML += `
                    <div class="col-lg-4 col-md-6 col-12 d-flex align-self-stretch">
                        <div class="card w-100 h-100">
                            <a href="javascript:void(0);" target="_blank" class="card-img-top d-block"><img src="${gitUsers.avatar_url ? gitUsers.avatar_url: ''}" class="h-100 w-100" alt="news image"></a>
                            <div class="card-body">
                                <a href="javascript:void(0);" target="_blank" class="d-block"><h5 class="card-title">${gitUsers.name ? gitUsers.name: ''}</h5></a>
                                <div class="d-flex flex-wrap gap-2 align-items-center my-2">
                                    <b>Followers:</b> <span class="badge">${gitUsers.followers ? gitUsers.followers : ''}</span>
                                </div>
                                <p class="card-text"><b>Designation:</b> ${gitUsers.bio ? gitUsers.bio: ''}</p>
                                <p class="card-text"><b>Location:</b> ${gitUsers.location ? gitUsers.location: '' }</p>
                            </div>
                        </div>
                    </div>
                        `
                    // });
                } else {
                    gitCardsRow.innerHTML = `<h1 class="text-danger text-center">Loading...</h1>`;
                }
            })
            .catch(err => console.log(err));
    } else {
        alert('Please type any word in the Search bar');
    }
    // console.log(searchedKeyword);
}

gitCardsRow.innerHTML = `
    <div class="loader">
        <div class="spinner-grow fs-1 text-center" role="status">
            <span class="visually-hidden"></span>
        </div>
        <p class="mt-2 text-center fs-4">Loading...</p>
    </div>
`;

let url = `https://api.github.com/users/${searchedKeyword != null && searchedKeyword !== '' ? searchedKeyword: "sameer-saleem"}`

let apiData = fetch(url);

apiData.then(res => res.json())
    .then(data => {
        console.log(data, 'api data');
        let gitUsers = data;
        console.log(gitUsers.length)

        if (!gitUsers) {
            gitCardsRow.innerHTML = `<h1 class="text-danger text-center">${searchedKeyword} User not found</h1>`;
            return;
        }

        if (gitUsers) {
            gitCardsRow.innerHTML = "";
            // gitUsers.forEach(item => {
                gitCardsRow.innerHTML += `
                <div class="col-lg-4 col-md-6 col-12 d-flex align-self-stretch">
                        <div class="card w-100 h-100">
                            <a href="javascript:void(0);" target="_blank" class="card-img-top d-block"><img src="${gitUsers.avatar_url ? gitUsers.avatar_url: ''}" class="h-100 w-100" alt="news image"></a>
                            <div class="card-body">
                                <a href="javascript:void(0);" target="_blank" class="d-block"><h5 class="card-title">${gitUsers.name ? gitUsers.name: ''}</h5></a>
                                <div class="d-flex flex-wrap gap-2 align-items-center my-2">
                                    <b>Followers:</b> <span class="badge">${gitUsers.followers ? gitUsers.followers : ''}</span>
                                </div>
                                <p class="card-text"><b>Designation:</b> ${gitUsers.bio ? gitUsers.bio: ''}</p>
                                <p class="card-text"><b>Location:</b> ${gitUsers.location ? gitUsers.location: '' }</p>
                            </div>
                        </div>
                    </div>
                    `
            // });
        } 
    })
    .catch(err => console.log(err));