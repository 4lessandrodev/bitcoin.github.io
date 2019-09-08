const $inputDolar = document.getElementById("input-dolar");
const compraMercadoBitcoinBtc = document.getElementById("preco-btc-compra-mercado-bitcoin");
const vendaMercadoBitcoinBtc = document.getElementById("preco-btc-venda-mercado-bitcoin");
const compraMercadoBitcoinEth = document.getElementById("preco-eth-compra-mercado-bitcoin");
const vendaMercadoBitcoinEth = document.getElementById("preco-eth-venda-mercado-bitcoin");
const compraMercadoBitcoinLtc = document.getElementById("preco-ltc-compra-mercado-bitcoin");
const vendaMercadoBitcoinLtc = document.getElementById("preco-ltc-venda-mercado-bitcoin");
//--------------------
const compraTresXbitBtc = document.getElementById("preco-btc-compra-3xbit");
const vendaTresXbitBtc = document.getElementById("preco-btc-venda-3xbit");
const compraTresXbitEth = document.getElementById("preco-eth-compra-3xbit");
const vendaTresXbitEth = document.getElementById("preco-eth-venda-3xbit");
const compraTresXbitLtc = document.getElementById("preco-ltc-compra-3xbit");
const vendaTresXbitLtc = document.getElementById("preco-ltc-venda-3xbit");
//--------------------
const compraBtcBitblue = document.getElementById("preco-btc-compra-bitBlue");
const vendaBtcBitblue = document.getElementById("preco-btc-venda-bitBlue");
const compraEthBitblue = document.getElementById("preco-eth-compra-bitBlue");
const vendaEthBitblue = document.getElementById("preco-eth-venda-bitBlue");
const compraLtcBitblue = document.getElementById("preco-ltc-compra-bitBlue");
const vendaLtcBitblue = document.getElementById("preco-ltc-venda-bitBlue");
//--------------------
//--------------------
const compraBtcBitcointrader = document.getElementById("preco-btc-compra-bicoinTrader");
const vendaBtcBitcointrader = document.getElementById("preco-btc-venda-bicoinTrader");
const compraEthBitcointrader = document.getElementById("preco-eth-compra-bicoinTrader");
const vendaEthBitcointrader = document.getElementById("preco-eth-venda-bicoinTrader");
const compraLtcBitcointrader = document.getElementById("preco-ltc-compra-bicoinTrader");
const vendaLtcBitcointrader = document.getElementById("preco-ltc-venda-bicoinTrader");
//--------------------
const compraBtcbitpreco = document.getElementById("preco-btc-compra-bitpreco");
const vendaBtcbitpreco = document.getElementById("preco-btc-venda-bitpreco");
const compraEthbitpreco = document.getElementById("preco-eth-compra-bitpreco");
const vendaEthbitpreco = document.getElementById("preco-eth-venda-bitpreco");
const compraLtcbitpreco = document.getElementById("preco-ltc-compra-bitpreco");
const vendaLtcbitpreco = document.getElementById("preco-ltc-venda-bitpreco");
//--------------------
const compraBtcbitcambio = document.getElementById("preco-btc-compra-bitcambio");
const vendaBtcbitcambio = document.getElementById("preco-btc-venda-bitcambio");
const compraEthbitcambio = document.getElementById("preco-eth-compra-bitcambio");
const vendaEthbitcambio = document.getElementById("preco-eth-venda-bitcambio");
const compraLtcbitcambio = document.getElementById("preco-ltc-compra-bitcambio");
const vendaLtcbitcambio = document.getElementById("preco-ltc-venda-bitcambio");
//--------------------


//debugger;
var data = new Date();
var _ano = data.getFullYear();
var _dia = ajustarMesEDia(data.getDate());
var _mes = ajustarMesEDia(data.getMonth() + 1);
const _posicaoDasOrdens = 2;

function ajustarMesEDia(data) {
  if (data > 9) {
    return parseInt(data);
  } else {
    return "0" + parseInt(data);
  }
}

function popularData(mes, ano, dia) {
  return ano + mes + dia;
}

//popularData(_mes);
let $dataAtual = popularData(_mes, _ano, _dia);



//-----------------------------------------------------------------------------------------------------------------------
async function getDolar($dataAtual) {
  //https://economia.awesomeapi.com.br/json/list/USD-BRL/?start_date=20190906&end_date=20190906
  let url = `https://economia.awesomeapi.com.br/json/list/USD-BRL/?start_date=${$dataAtual}&end_date=${$dataAtual}`;
  let promise = await fetch(url);

  if (!promise.ok) {
    throw new Error('Erro ao tentar buscar cotação do dolar');
  }

  let dolar = await promise.json();

  return dolar;
}


getDolar($dataAtual)
  .then(resposta => {
    if (resposta == '') {

      var data = new Date();
      var _ano = data.getFullYear();
      var _dia = ajustarMesEDia(data.getDate() - 1);
      var _mes = ajustarMesEDia(data.getMonth() + 1);

      var dataAjustada = popularData(_mes, _ano, _dia);
      getDolar(dataAjustada)
        .then(respostaB => {
          $inputDolar.value = respostaB[0].ask;
        });

    } else {
      console.log('Sucesso');
      $inputDolar.value = resposta[0].ask;
    }
  });

//--------------------------------------------------------------------------------------------------------------------------


//Capturar todas as moedas de acordo com as que estao no array
const criptomoedas = ["BTC", "ETH", "LTC"];

async function getMercadoBitcoin(moeda) {
  //https://www.mercadobitcoin.net/api/BTC/orderbook/
  let url = `https://www.mercadobitcoin.net/api/${moeda}/orderbook/`;
  let promise = await fetch(url);

  if (!promise.ok) {
    throw new Error('Erro ao tentar buscar cotação do Mercado Bitcoin');
  }

  let mercadobitcoin = await promise.json();

  return mercadobitcoin;
}


getMercadoBitcoin(criptomoedas[0])
  .then(resposta => {
    //$inputDolar.value = resposta[0].ask;
    vendaMercadoBitcoinBtc.textContent = resposta.asks[_posicaoDasOrdens].toString().slice(0, 5);
    compraMercadoBitcoinBtc.textContent = resposta.bids[_posicaoDasOrdens].toString().slice(0, 5);
    return getMercadoBitcoin(criptomoedas[1]);
  })
  .then(resposta => {
    //$inputDolar.value = resposta[0].ask;
    vendaMercadoBitcoinEth.textContent = resposta.asks[_posicaoDasOrdens].toString().slice(0, 3);
    compraMercadoBitcoinEth.textContent = resposta.bids[_posicaoDasOrdens].toString().slice(0, 3);
    return getMercadoBitcoin(criptomoedas[2]);
  })
  .then(resposta => {
    //$inputDolar.value = resposta[0].ask;
    vendaMercadoBitcoinLtc.textContent = resposta.asks[_posicaoDasOrdens].toString().slice(0, 3);
    compraMercadoBitcoinLtc.textContent = resposta.bids[_posicaoDasOrdens].toString().slice(0, 3);
  });

//---------------------------------------------------------------------------------------------------------------------------

//https://api.exchange.3xbit.com.br/v1/orderbook/credit/btc/





//--------------------------------------------------------------------------------------------------------------------------


//Capturar todas as moedas de acordo com as que estao no array
async function getTresXbit(moeda) {
  //https://www.mercadobitcoin.net/api/BTC/orderbook/
  let url = `https://api.exchange.3xbit.com.br/v1/orderbook/credit/${moeda}/`;
  let promise = await fetch(url);

  if (!promise.ok) {
    throw new Error('Erro ao tentar buscar cotação de 3Xbit');
  }
  let TresXbit = await promise.json();
  return TresXbit;
}

getTresXbit('btc')
  .then(resposta => {
    //$inputDolar.value = resposta[0].ask;
    //debugger;
    vendaTresXbitBtc.textContent = parseFloat((resposta.sell_orders[_posicaoDasOrdens].unit_price * $inputDolar.value).toFixed(1));
    compraTresXbitBtc.textContent = parseFloat((resposta.buy_orders[_posicaoDasOrdens].unit_price * $inputDolar.value).toFixed(1));
  });

function consultarLtc() {
  getTresXbit('ltc')
    .then(resposta => {
      vendaTresXbitLtc.textContent = parseFloat((resposta.sell_orders[_posicaoDasOrdens].unit_price * $inputDolar.value).toFixed(1));
      compraTresXbitLtc.textContent = parseFloat((resposta.buy_orders[_posicaoDasOrdens].unit_price * $inputDolar.value).toFixed(1));
      clearInterval(timerLTC);
      timerETH = setInterval(buscarETH, 5000);
    });
}

var timerETH = '';
var timerLTC = setInterval(timerLtc, 7000);

function timerLtc() {
  consultarLtc();
}


function buscarETH() {
  getTresXbit('eth')
    .then(resposta => {
      vendaTresXbitEth.textContent = parseFloat((resposta.sell_orders[_posicaoDasOrdens].unit_price * $inputDolar.value).toFixed(1));
      compraTresXbitEth.textContent = parseFloat((resposta.buy_orders[_posicaoDasOrdens].unit_price * $inputDolar.value).toFixed(1));
      clearInterval(timerETH);
    });

}


//---------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------
//REQUISIÃO DA BITBLUE ESTA COM ERRO
//MENSAGEM DE ERRO
//has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header contains multiple values '*, *', but only one is allowed.

/* //Capturar todas as moedas de acordo com as que estao no array
async function getBitBlue(moeda) {


  //https://bitblue.com/api/order-book    = bitcoin
  //https://bitblue.com/api/order-book/eth    = etherium
  var url = '';
  if (moeda == '') {
    url = `https://bitblue.com/api/order-book`;
  } else {
    url = `https://bitblue.com/api/order-book/${moeda}`;
  }


  let promise = await fetch(url);


  if (!promise.ok) {
    throw new Error('Erro ao tentar buscar cotação da Bitblue');

  }

  let bitblue = await promise.json();

  return bitblue;
}


getBitBlue('')
  .then(resposta => {
    //$inputDolar.value = resposta[0].ask;
    /*     compraBtcBitblue.textContent = resposta.asks[3].toString().slice(0, 7);
        vendaBtcBitblue.textContent = resposta.bids[3].toString().slice(0, 7); */
//   console.log(resposta);
//   return getBitBlue('eth');
// })
// .then(resposta => {
//   /*     //$inputDolar.value = resposta[0].ask;
//       compraEthBitblue.textContent = resposta.asks[3].toString().slice(0, 6);
//       vendaEthBitblue.textContent = resposta.bids[3].toString().slice(0, 6); */
//   console.log(resposta);
//   compraLtcBitblue.textContent = 'Indisponível';
//   vendaLtcBitblue.textContent = 'Indisponível';
// }); */

//---------------------------------------------------------------------------------------------------------------------------

//--------------------------------BITCOIN TRADER
//https://apidocs.bitcointrade.com.br/?version=latest#5418f5db-6469-46d4-90aa-80a3d291d400


async function getPrecoBitcoinTrader(coin) {
  let url = `https://api.bitcointrade.com.br/v2/public/${coin}/orders`;
  let promise = await fetch(url);

  if (!promise.ok) {
    throw new Error('Falhou ao buscar preço BitcoinTrader');
  }

  let precos = await promise.json();
  return precos;
}


var coins = ['BRLBTC', 'BRLLTC', 'BRLETH'];
getPrecoBitcoinTrader(coins[0])
  .then(resposta => {
    //debugger;
    //console.log(resposta.data.asks[_posicaoDasOrdens].unit_price);

    vendaBtcBitcointrader.textContent = resposta.data.asks[_posicaoDasOrdens].unit_price.toFixed(2);
    compraBtcBitcointrader.textContent = resposta.data.bids[_posicaoDasOrdens].unit_price.toFixed(2);
    return getPrecoBitcoinTrader(coins[1]);
  })
  .then(resposta => {

    vendaLtcBitcointrader.textContent = resposta.data.asks[_posicaoDasOrdens].unit_price.toFixed(2);
    compraLtcBitcointrader.textContent = resposta.data.bids[_posicaoDasOrdens].unit_price.toFixed(2);
    return getPrecoBitcoinTrader(coins[2]);
  })
  .then(resposta => {
    vendaEthBitcointrader.textContent = resposta.data.asks[_posicaoDasOrdens].unit_price.toFixed(2);
    compraEthBitcointrader.textContent = resposta.data.bids[_posicaoDasOrdens].unit_price.toFixed(2);
  });

//------------------------------------------------------------------------------------------------





async function getPrecoBitcBitPreco() {
  let url = `https://api.bitpreco.com/btc-brl/orderbook`;
  //let url = "https://api.bitpreco.com/btc-brl/ticker";
  let promise = await fetch(url);

  if (!promise.ok) {
    throw new Error('Erro ao buscar preço do bitcoin na BitPreço');
  }

  let retorno = await promise.json();
  return retorno;
}



getPrecoBitcBitPreco()
  .then(_resposta => {
    //console.log('--------------------------------------------------');
    //console.log(_resposta);
    //compraBtcbitpreco.textContent = _resposta.last * 4.06;
    compraBtcbitpreco.textContent = parseFloat(_resposta.asks[0].price) * 3.869;
    vendaBtcbitpreco.textContent = parseFloat(_resposta.asks[1].price) * 3.879;

    compraEthbitpreco.textContent = '';
    vendaEthbitpreco.textContent = '';
    compraLtcbitpreco.textContent = '';
    vendaLtcbitpreco.textContent = '';

    // vendaBtcbitpreco.textContent = _resposta.bids[0].price;
  });
//---------------------------------------------------------------------------------------------------






//---------------------------------------------------------------------------------------------------
//bITCAMBIO
//https://bitcambio_api.blinktrade.com/api/v1/BRL/ticker?crypto_currency=BTC
//https://bitcambio_api.blinktrade.com/api/v1/BRL/orderbook?crypto_currency=BTC



async function getPrecobtcBitcambio() {
  let url = `https://bitcambio_api.blinktrade.com/api/v1/BRL/orderbook?crypto_currency=BTC`;
  let promise = await fetch(url);

  if (!promise.ok) {
    throw new Error('Erro ao buscar preço do bitcoin na BitPreço');
  }

  let retorno = await promise.json();
  return retorno;
}



getPrecobtcBitcambio()
  .then(resp => {
    //console.log('--------------------------------------------------');
    //console.log(_resposta);
    //compraBtcbitpreco.textContent = _resposta.last * 4.06;
    vendaBtcbitcambio.textContent = parseFloat(resp.asks[_posicaoDasOrdens]);
    compraBtcbitcambio.textContent = parseFloat(resp.bids[_posicaoDasOrdens]);

    compraEthbitcambio.textContent = '';
    vendaEthbitcambio.textContent = '';
    compraLtcbitcambio.textContent = '';
    vendaLtcbitcambio.textContent = '';

    // vendaBtcbitpreco.textContent = _resposta.bids[0].price;
  });

var listaBitcoinsCompra = [];
var listaBitcoinsVenda = [];
var listaEtheriumCompra = [];
var listaEtheriumVenda = [];
var listaLitecoinCompra = [];
var listaLitecoinVenda = [];



var tds = document.querySelectorAll('td');

function gerarLista() {
  for (i = 0; i < tds.length; i++) {

    switch (tds[i].className) {
      //-------------------------
      case 'btc-compra':
        if (isNaN(parseFloat(tds[i].innerHTML))) {

        } else {
          listaBitcoinsCompra.push(parseFloat(tds[i].innerHTML));
        }
        break;
      //------------------------------
      case 'btc-venda':
        if (isNaN(parseFloat(tds[i].innerHTML))) {

        } else {
          listaBitcoinsVenda.push(parseFloat(tds[i].innerHTML));
        }
        break;
      //------------------------------
      case 'eth-compra':
        if (isNaN(parseFloat(tds[i].innerHTML))) {

        } else {
          listaEtheriumCompra.push(parseFloat(tds[i].innerHTML));
        }
        break;
      //------------------------------
      case 'eth-venda':
        if (isNaN(parseFloat(tds[i].innerHTML))) {

        } else {
          listaEtheriumVenda.push(parseFloat(tds[i].innerHTML));
        }
        break;
      //------------------------------
      case 'ltc-compra':
        if (isNaN(parseFloat(tds[i].innerHTML))) {

        } else {
          listaLitecoinCompra.push(parseFloat(tds[i].innerHTML));
        }
        break;
      //------------------------------
      case 'ltc-venda':
        if (isNaN(parseFloat(tds[i].innerHTML))) {

        } else {
          listaLitecoinVenda.push(parseFloat(tds[i].innerHTML));
        }
        break;
      //------------------------------
    }
  }
  imprimir();
}


var btnCalcular = document.getElementById('btncalcular');
var $mensagem1 = document.getElementById('msg1');
var $mensagem2 = document.getElementById('msg2');
var $mensagem3 = document.getElementById('msg3');




btnCalcular.addEventListener('click', gerarLista);

function imprimir() {

  //Calcular lucro com bitcoin
  var compraBTC = Math.min(...listaBitcoinsVenda);
  var vendaBTC = Math.max(...listaBitcoinsCompra);
  var lucroBTC = ((vendaBTC - compraBTC) / compraBTC) * 100;
  lucroBTC = parseFloat(lucroBTC).toFixed(2);

  //Calcular lucro com Litecoin
  var compraETH = Math.min(...listaEtheriumVenda);
  var vendaETH = Math.max(...listaEtheriumCompra);
  var lucroETH = ((vendaETH - compraETH) / compraETH) * 100;
  lucroETH = parseFloat(lucroETH).toFixed(2);


  //Calcular lucro com Etherium
  var compraLTC = Math.min(...listaLitecoinVenda);
  var vendaLTC = Math.max(...listaLitecoinCompra);
  var lucroLTC = ((vendaLTC - compraLTC) / compraLTC) * 100;
  lucroLTC = parseFloat(lucroLTC).toFixed(2);

  if (lucroBTC > 0) {
    templateBTC(compraBTC, vendaBTC, lucroBTC);
    identificarValorDeOportunidade(compraBTC, vendaBTC, 0, 0, 0, 0);
  }
  if (lucroLTC > 0) {
    templateLTC(compraLTC, vendaLTC, lucroLTC);
    identificarValorDeOportunidade(0, 0, 0, 0, compraLTC, vendaLTC);
  }
  if (lucroETH > 0) {
    templateETH(compraETH, vendaETH, lucroETH);
    identificarValorDeOportunidade(0, 0, compraETH, vendaETH, 0, 0);
  }
  if (lucroBTC < 0.1 && lucroLTC < 0.1 && lucroETH < 0.1) {
    templateNenhum();
  }


}

function templateBTC(compraBTC, vendaBTC, lucroBTC) {
  var template =
    `<div class="alert alert-success alert-dismissible fade show" role="alert" id="Mensagem">
            <strong>Oportunidade: </strong> compre Bitcoin a : ${compraBTC} e venda a : ${vendaBTC} Lucro: ${lucroBTC}%
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;

  $mensagem1.innerHTML = template;
}
function templateLTC(compraLTC, vendaLTC, lucroLTC) {
  var template =
    `<div class="alert alert-success alert-dismissible fade show" role="alert" id="Mensagem">
            <strong>Oportunidade: </strong> compre Litecoin a : ${compraLTC} e venda a : ${vendaLTC} Lucro: ${lucroLTC}%
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;

  $mensagem2.innerHTML = template;
}

function templateETH(compraETH, vendaETH, lucroETH) {
  var template =
    `<div class="alert alert-success alert-dismissible fade show" role="alert" id="Mensagem">
            <strong>Oportunidade: </strong> compre Etherium a : ${compraETH} e venda a : ${vendaETH} Lucro: ${lucroETH}%
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;

  $mensagem3.innerHTML = template;
}



function templateNenhum() {
  var template =
    `<div class="alert alert-alert alert-dismissible fade show" role="alert" id="Mensagem">
            <strong>OOops..: </strong> Que pena! Nenhuma oportunidade encontrada no momento.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;

  $mensagem1.innerHTML = template;
}


function identificarValorDeOportunidade(compraBTC, vendaBTC, compraETH, vendaETH, compraLTC, vendaLTC) {
  for (i = 0; i < tds.length; i++) {

    switch (tds[i].className) {
      //-------------------------
      case 'btc-compra':
        if (parseFloat(tds[i].textContent) == vendaBTC) {
          tds[i].classList.add('destacado');
        }
        break;
      //------------------------------
      case 'btc-venda':
        if (parseFloat(tds[i].textContent) == compraBTC) {
          tds[i].classList.add('destacado');
        }
        break;
      //------------------------------
      case 'eth-compra':
        if (parseFloat(tds[i].textContent) == vendaETH) {
          tds[i].classList.add('destacado');
        }
        break;
      //------------------------------
      case 'eth-venda':
        if (parseFloat(tds[i].textContent) == compraETH) {
          tds[i].classList.add('destacado');
        }
        break;
      //------------------------------
      case 'ltc-compra':
        if (parseFloat(tds[i].textContent) == vendaLTC) {
          tds[i].classList.add('destacado');
        }
        break;
      //------------------------------
      case 'ltc-venda':
        if (parseFloat(tds[i].textContent) == compraLTC) {
          tds[i].classList.add('destacado');
        }
        break;
      //------------------------------
    }
  }
}


var $progressbar = document.querySelector('#barra');
var n = 5;
var tempo = setInterval(progredir, 5000);



function progredir() {
  var newprogressvalue = n;
  var template = `
<div class="progress-bar" role="progressbar" style="width: ${newprogressvalue * 12}%;" aria-valuenow="${newprogressvalue * 5}" aria-valuemin="0"
    aria-valuemax="100" id="progressbar">${newprogressvalue}%</div>
  `;
  n = n + 5;
  $progressbar.innerHTML = template;
  if (n > 24 && n < 35) {
    gerarLista();
  }
  if (n > 95) {
    clearInterval(tempo);
    location.reload();
  }
}
