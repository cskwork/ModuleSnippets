// @목차

// sort JSONString By Price Ascending

//========================================================================  
/*
INPUT
[{"name":"eggs","price":1},{"name":"coffee","price":9.99},{"name":"rice","price":4.04}]
OUTPUT
[{"name":"eggs","price":1},{"name":"rice","price":4.04},{"name":"coffee","price":9.99}]
*/
const sortJSONStringByPriceAscending = (jsonString) => {
    const parsedJson =  JSON.parse(jsonString);

    parsedJson.sort(function(a, b) {
        let priceA = parseFloat(a.price);
        let priceB = parseFloat(b.price);
        if(priceA == priceB){ // sort by name
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        }else{
            return priceA - priceB;
        }  
    });

    return JSON.stringify(parsedJson); 
}

console.log(sortJSONStringByPriceAscending('[{"name":"eggs","price":1},{"name":"coffee","price":9.99},{"name":"rice","price":4.04}]'));
//========================================================================
