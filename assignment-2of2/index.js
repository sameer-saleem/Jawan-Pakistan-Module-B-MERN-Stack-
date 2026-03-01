const mobiles = [
    {
        brandName: "Samsung",
        models: [
            {
                mobile: "Samsung Galaxy A06",
                image: "https://images.priceoye.pk/samsung-galaxy-a06-pakistan-priceoye-hvk7q-500x500.webp",
                price: "30,249",
            },
            {
                mobile: "Samsung Galaxy A16",
                image: "https://images.priceoye.pk/samsung-galaxy-a16-pakistan-priceoye-v7l1c-500x500.webp",
                price: "61,999",

            },
            {
                mobile: "Samsung Galaxy Z Fold 6",
                image: "https://images.priceoye.pk/samsung-galaxy-z-fold-6-pakistan-priceoye-f5s5a-500x500.webp",
                price: "61,999",
            },
            {
                mobile: "Samsung Galaxy S22",
                image: "https://cdn.shopify.com/s/files/1/0599/5413/5239/files/REGEN_-_Galaxy_S22_Ultra_-_Green_600x600.png?v=1736592741",
                price: "189,999",
            },
            {
                mobile: "Samsung A56",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXCGcqo5-W34rXKlKfOY8YUZi3VBlSqmdoig&s",
                price: "149,999",
            },
            {
                mobile: "Samsung Galaxy tab4",
                image: "https://m.media-amazon.com/images/I/51iYB3nYm7L.jpg",
                price: "10,000",
            },
        ]
    },
    {
        brandName: "IPhone",
        models: [
            {
                mobile: "Apple iPhone 14 - 128GB - NON PTA",
                image: "https://img.drz.lazcdn.com/static/pk/p/4ccd69c2236ef464537378918c5d9ca0.jpg_720x720q80.jpg",
                price: "103,999",
            },
            {
                mobile: "Apple iPhone 12 64GB - NON PTA",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuSPBRPu5HlRNsWUUw3q6yzn1X4vCuxCX9lA&s",
                price: "61,194",

            },
            {
                mobile: "Apple iPhone 13 - 128GB - Non Approved",
                image: "https://images.priceoye.pk/apple-iphone-13-pakistan-priceoye-ewqbo-500x500.webp",
                price: "86,999",
            }
        ]
    },
    {
        brandName: "Redmi",
        models: [
            {
                mobile: "REDMI 13",
                image: "https://www.xiaomistore.pk/xiaomi_images/product/images/202406/goods_img/666aa0d185629_1718264017.webp",
                price: "36,499",
            },
            {
                mobile: "Redmi 14C",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR4p00dLG2uMClPf3Ar35eOx__WCDjQqOV1g&s",
                price: "27,499",

            },
            {
                mobile: "Redmi A5",
                image: "https://images.priceoye.pk/xiaomi-redmi-a5-pakistan-priceoye-bl4oo-500x500.webp",
                price: "21,799",
            }
        ]
    },
];


const mobileBrands = document.getElementById("mobileBrands");
const mobileModels = document.getElementById("mobileModels");

let models;

mobiles.forEach(item => {

    let option = document.createElement('option');
    option.innerText = item.brandName;
    mobileBrands.appendChild(option);


    // item.models.forEach(m => { 
    //     // console.log(m.mobile);
    //     let modelOption = document.createElement('option');
    //     modelOption.innerText = m.mobile;
    //     mobileModels.appendChild(modelOption);
    // });

});

let selectedvalue;
let selectbrand;

function mobileBrand(e) {

    // selectedvalue = e.target.value;
    // let selectedvalue = e.target.value;
    selectedvalue = e.target.value;

    // console.log(selectedvalue);

    selectedModel = null;
    finalFilteredModel = [];
    
    mobileModels.innerHTML = "";
    mobileModels.innerHTML = `<option>Select Model</option>`;

    selectbrand = mobiles.filter(item => item.brandName == selectedvalue);
    // console.log(selectbrand);

    selectbrand.forEach(b => {


        b.models.forEach(fm => {
            let filterdModeloption = document.createElement('option');
            filterdModeloption.innerText = fm.mobile;
            mobileModels.appendChild(filterdModeloption);
        });

    });
    // console.log(filteredModels);
    // filteredModels.forEach(f => {
    //     f.forEach(fm => console.log(fm.mobile));
    // })
}

let selectedModel;
let finalFilteredModel;
function mobileModel(e) {

    selectedModel = e.target.value;
    // console.log(selectedModel);

    selectbrand.filter(item => {
        finalFilteredModel = item.models.filter(md => md.mobile == selectedModel);
    });
    // console.log(filteredModelArry);

    // finalFilteredModel = filteredModelArry.forEach(md => console.log(md));
    // console.log(finalFilteredModel);
}

const mobilesCards = document.getElementById("mobilesCards");

function search() {
    // console.log(selectedvalue);
    // console.log(selectedModel, 'selected model');
    // console.log(selectbrand);

    if(!selectedvalue) {
        alert('Please select any Brand');   
    }

    if (selectedvalue) {
        mobilesCards.innerHTML = "";
        selectbrand.forEach(b => {
            // console.log(b.brandName);
            b.models.forEach(fm => {
                // console.log(fm.mobile);
                mobilesCards.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${fm.image}" class="card-img-top" alt="mobile image" />
                <div class="card-body">
                    <h5 class="card-title">Brand: ${b.brandName}</h5>
                    <p class="card-text">Model: ${fm.mobile}</p>
                    <p class="card-text">Price: ${fm.price}</p>
                </div>
                </div>`
            });
        });
    }


    if (selectedvalue && selectedModel) {
        mobilesCards.innerHTML = "";

        selectbrand.forEach(b => {


            finalFilteredModel.forEach(modelData => {
                mobilesCards.innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <img src="${modelData.image}" class="card-img-top" alt="mobile image" />
                    <div class="card-body">
                        <h5 class="card-title">Brand: ${b.brandName}</h5>
                        <p class="card-text">Model: ${modelData.mobile}</p>
                        <p class="card-text">Model: ${modelData.price}</p>
                    </div>
                    </div>`
            })
        });
    }


}