// User info
document.getElementById("user").innerText = localStorage.getItem("username") || "Guest";

// Initial variables
let balance = 100000;
let symbol = "NIFTY";
let price = 22000;
let orders = [];

// Display balance
document.getElementById("balance").innerText = balance;

// Simulate live prices
setInterval(() => {
  let sel = document.getElementById("symbol").value;
  symbol = sel;
  price += Math.floor(Math.random() * 40 - 20);
  document.getElementById("price").innerText = price;
  addPrice(price);
  updatePNL();
}, 1000);

function buy() {
  let qty = Number(document.getElementById("qty").value);
  if(!qty) return alert("Enter quantity");
  orders.push({ type:"BUY", symbol, price, qty });
  renderOrders();
}

function sell() {
  let qty = Number(document.getElementById("qty").value);
  if(!qty) return alert("Enter quantity");
  orders.push({ type:"SELL", symbol, price, qty });
  renderOrders();
}

function updatePNL() {
  document.querySelectorAll(".pnl").forEach((el,i)=>{
    let o = orders[i];
    let pnl = o.type=="BUY" ? (price-o.price)*o.qty : (o.price-price)*o.qty;
    el.innerText = pnl.toFixed(2);
  });
}

function renderOrders() {
  let html="";
  orders.forEach(o=>{
    html += `<tr>
      <td>${o.type}</td>
      <td>${o.symbol}</td>
      <td>${o.price}</td>
      <td>${o.qty}</td>
      <td class="pnl">0</td>
    </tr>`;
  });
  document.getElementById("orders").innerHTML = html;
}

function logout() {
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
