const axios = require('axios');
var fs = require('fs');

const getPricesUrl = "http://167.99.147.217:8082/api/getCurrentPrice/";
const buyMasterUrl = "http://167.99.147.217:8082/api/buyMastercoin/";
const sellMasterUrl = "http://167.99.147.217:8082/api/sellMastercoin/";
const balanceMasterUrl = "http://167.99.147.217:8082/api/balance/";

const userID = "5e28832d913c3c7a8cbc7465";
const buyLimit = 25;
const HalfLimit = 26;
const HalfLimit2 =31;
const HalfLimit3 =36;
const sellLimit = 55;


function main(){
(async function(){
    let currentPriceResponse = await getCurrentPrice();
    let balance = await balanceMastercoin();
    //console.log(balance);

    if (currentPriceResponse.price <= buyLimit){
        let amount = Number(balance.result.balance)/(currentPriceResponse.price);
        let response = await buyMastercoin(amount)
        console.log("Compré " + amount);
    }    
    else if (currentPriceResponse.price >= HalfLimit && currentPriceResponse.price < HalfLimit2){
        let amount = Number(balance.result.balance)/(currentPriceResponse.price)*.8;
        let response = await buyMastercoin(amount)
        console.log("Compré al 85% " + amount);
    }    
    else if (currentPriceResponse.price >= HalfLimit2 && currentPriceResponse.price < HalfLimit3){
        let amount = Number(balance.result.balance)/(currentPriceResponse.price)*.5;
        let response = await buyMastercoin(amount)
        console.log("Compré al 50% " + amount);
    }
    else if (currentPriceResponse.price >=  37 && currentPriceResponse.price <= 39){
        let amount = Number(balance.result.masterCoins)*.35;
        let response = await sellMastercoin(amount)
        console.log("Vendí al 35% " + amount);
    }
    else if (currentPriceResponse.price >= 40 && currentPriceResponse.price < 45){
        let amount = Number(balance.result.masterCoins)*.65;
        let response = await sellMastercoin(amount)
        console.log("Vendí al 65% " + amount);
    }
    else if (currentPriceResponse.price >=  45 && currentPriceResponse.price <= 50){
        let amount = Number(balance.result.masterCoins)*.85;
        let response = await sellMastercoin(amount)
        console.log("Vendí al 85%  " + amount);
    }
    else if (currentPriceResponse.price > 50  && currentPriceResponse.price <= 54){
        let amount = Number(balance.result.masterCoins)*.9;
        let response = await sellMastercoin(amount)
        console.log("Vendí al 90% " + amount);
    }
    else if (currentPriceResponse.price >= sellLimit){
        let amount = Number(balance.result.masterCoins);
        let response = await sellMastercoin(amount)
        console.log("Vendí " + amount);
    }
    else{
        console.log("nel pastel pto :D");
    }
    
    setTimeout(main, 1800000);
})();
}

main();


function getCurrentPrice(){
    return new Promise(function (resolve, reject) {
        axios.get(getPricesUrl)
        .then(function (response) {
            // handle success
            resolve(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return Promise.reject(new Error(error));
        })
        .then(function () {
            // always executed
        });
    });
}

function buyMastercoin(amount){
    var transactionData = {
        "_id": userID,
        "amount": Number(amount)
    };

    return new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            data: transactionData,
            url: buyMasterUrl,
        
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            resolve(response.data);
    
        })
        .catch(error => {
            console("Hubo un error al hacer la compra");
            return Promise.reject(new Error(error));
        });
    });
}

function sellMastercoin(amount){
    var transactionData = {
        "_id": userID,
        "amount": Number(amount)
    };

    return new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            data: transactionData,
            url: sellMasterUrl,
        
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            resolve(response.data);
    
        })
        .catch(error => {
            console("Hubo un error al hacer la venta");
            return Promise.reject(new Error(error));
        });
    });
}
function balanceMastercoin(){
    var transactionData = {
        "_id": userID,
    };

    return new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            data: transactionData,
            url: balanceMasterUrl,
        
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            resolve(response.data);
    
        })
        .catch(error => {
            console.log("Hubo un error en el balance");
            return Promise.reject(new Error(error));
        });
    }); 
}

function data(datae){
    fs.writeFile('./balance.json', JSON.stringify(datae), function(err){
        if(err){
            return console.log(err);
        }
        console.log('El archivo fue guardado balance')
    })
}