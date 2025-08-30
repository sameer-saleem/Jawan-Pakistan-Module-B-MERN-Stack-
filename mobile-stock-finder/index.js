const phoneDetails = [
    {
        phone: 'iphone X',
        price: 5000,
        stock: 10,
    },
    {
        phone: 'Iphone 11',
        price: 2000,
        stock: 10,
    },
    {
        phone: 'Samsung S20',
        price: 1000,
        stock: 10,
    },
];


let phone = document.getElementById('phoneName');
let singlePhone = document.getElementById("singlePhone");
let stock = document.getElementById("stock");
let totalAmount = document.getElementById("totalAmount");
let showError = document.getElementById("showError");

function search() {

    let value = phone.value;
    showError.innerText = "";

    if (value == "" | value == null) {
        alert("Please add phone name");
    }

    let foundedValue = phoneDetails.filter(item => item.phone.toLocaleLowerCase() == value);

    if (foundedValue.length == 0) {
        showError.innerText = "Not Found";
    }


    foundedValue.forEach(b => {
        // console.log(b.phone);
        singlePhone.value = b.price;
        stock.value = b.stock;
        totalAmount.value = b.price * b.stock;
    });



}