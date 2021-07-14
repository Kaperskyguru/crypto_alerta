import axios from "axios";
const endpoint = `https://api.nomics.com/v1/currencies/ticker?key=23282e950a7e7cdaa5717922e34901a60c88ff8b&ids=BTC,ETH,XRP,SHIB,ADA,YFI,DOGE,CKB,DOT,SUSHI.BTT,DENT,MATIC,CHZ&interval=1d,30d&convert=USD&per-page=100&page=1`;
export async function getCryptoData() {
  const res = await axios.get(endpoint);
  const cryptos = res.data;
  await storeOrUpdate(cryptos);
  return cryptos;
}

async function storeOrUpdate(cryptos) {
  for (const key in cryptos) {
    if (Object.hasOwnProperty.call(cryptos, key)) {
      const newCrypto = cryptos[key];
      const crypto = await get(newCrypto.id);
      if (crypto) {
        // Update
        await newUpdate(crypto.id, newCrypto);
      } else {
        //Store
        await store(newCrypto);
      }
    }
  }
}

async function store(data) {
  const newData = {
    price: data.price,
    name: data.id,
  };
  const res = await axios.post("http://localhost:1337/cryptos", newData);
  return res.data;
}

async function newUpdate(id, data) {
  const newData = {
    price: data.price,
    name: data.id,
  };

  await update(id, newData);
}

async function updateAlertPrice(id, price) {
  const newData = {
    alert_price: price,
  };
  const crypto = await get(id);
  await update(crypto.id, newData);
}

async function update(id, data) {
  const res = await axios.put(`http://localhost:1337/cryptos/${id}`, data);
  return res.data;
}

async function get(name) {
  const res = await axios.get(`http://localhost:1337/cryptos/names/${name}`);

  if (res.data.success) {
    return res.data.crypto;
  }
  return null;
}

export async function storeAlertPrice(crypto, alertPrice) {
  // Store to local storage
  localStorage.setItem(crypto.id, alertPrice);
  //Upate to Strapi
  await updateAlertPrice(crypto.id, alertPrice);
  return;
}

async function isSamePrice(crypto) {
  // Check localStorage prices
  let alertPrice = localStorage.getItem(crypto.id);

  console.log(
    alertPrice,
    crypto.price,
    parseFloat(alertPrice) >= parseFloat(crypto.price)
  );
  if (parseFloat(alertPrice) >= parseFloat(crypto.price)) {
    return true;
  }

  // Check Strapi prices
  const strCrypto = await get(crypto.id);
  if (parseFloat(strCrypto.alert_price) >= parseFloat(crypto.price)) {
    return true;
  }

  return false;
}

export async function checkAlertPrice() {
  //Load new Crypto prices
  const cryptos = await getCryptoData();

  const alertArr = [];

  for (const key in cryptos) {
    if (Object.hasOwnProperty.call(cryptos, key)) {
      const crypto = cryptos[key];

      // Check Prices
      if (await isSamePrice(crypto)) {
        alertArr.push(
          `${crypto.id} has reached the ${crypto.price} amount you set`
        );
      }
    }
  }
  return alertArr;
}
