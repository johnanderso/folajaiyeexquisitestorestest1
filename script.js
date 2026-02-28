// Sample demo products for all categories
const products = {
  clothes: [
    {id:1,name:"Designer Dress",price:25000,quantity:5,img:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03"},
    {id:2,name:"Casual Top",price:12000,quantity:12,img:"https://images.unsplash.com/photo-1585386959984-a4155229fdd9"},
    {id:3,name:"Jeans Pants",price:18000,quantity:8,img:"https://images.unsplash.com/photo-1600185365371-1f6a69b9f8f0"}
  ],
  jewelry: [
    {id:4,name:"Luxury Necklace",price:15000,quantity:10,img:"https://images.unsplash.com/photo-1618354691221-89f0e5a0e0d8"},
    {id:5,name:"Stylish Earrings",price:8000,quantity:8,img:"https://images.unsplash.com/photo-1600185365371-1f6a69b9f8f0"},
    {id:6,name:"Gold Bracelet",price:22000,quantity:5,img:"https://images.unsplash.com/photo-1600185365371-1f6a69b9f8f0"}
  ],
  accessories: [
    {id:7,name:"Fashion Handbag",price:12000,quantity:10,img:"https://images.unsplash.com/photo-1600185365371-1f6a69b9f8f0"},
    {id:8,name:"Sunglasses",price:7000,quantity:15,img:"https://images.unsplash.com/photo-1600185365371-1f6a69b9f8f0"},
    {id:9,name:"Scarf",price:5000,quantity:20,img:"https://images.unsplash.com/photo-1600185365371-1f6a69b9f8f0"}
  ]
};

let cart = [];

function displayProducts(category, containerId){
  const grid = document.getElementById(containerId);
  grid.innerHTML = "";
  products[category].forEach(p=>{
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="">
      <h3>${p.name}</h3>
      <p class="price">₦${p.price}</p>
      <p class="quantity">Available: ${p.quantity}</p>
      <button onclick="addToCart(${p.id}, '${category}')">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart(id, category){
  const product = products[category].find(p=>p.id===id);
  const cartItem = cart.find(c=>c.id===id);
  if(cartItem){
    if(cartItem.qty < product.quantity){
      cartItem.qty++;
    }else{
      alert("No more stock available!");
      return;
    }
  }else{
    cart.push({id:id,name:product.name,price:product.price,qty:1});
  }
  displayCart();
}

function displayCart(){
  const cartDiv = document.getElementById("cartItems");
  if(!cartDiv) return;
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} x ${item.qty}</p>
      <p>₦${item.price*item.qty} <button onclick="removeItem(${item.id})">Remove</button></p>
    `;
    cartDiv.appendChild(div);
  });
  const totalEl = document.getElementById("totalPrice");
  if(totalEl) totalEl.innerText = "Total: ₦"+total;
}

function removeItem(id){
  cart = cart.filter(c=>c.id!==id);
  displayCart();
}

function checkout(){
  if(cart.length===0){ alert("Cart is empty!"); return; }
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;
  if(!name||!phone||!address){ alert("Please fill all details!"); return; }
  alert(`Thank you ${name}!\n\nPlease make payment to:\nBank: ACCESS BANK\nAccount Name: Mom's Fashion Store\nAccount Number: 1234567890\n\nYour total is ₦${cart.reduce((a,b)=>a+b.price*b.qty,0)}`);
  cart=[];
  displayCart();
}

// Chat functions
function toggleChat(){
  const chat = document.getElementById("chatBox");
  if(chat) chat.style.display = chat.style.display==="flex"?"none":"flex";
}

function sendMessage(){
  const input = document.getElementById("chatInput");
  if(input.value.trim()==="") return;
  const chatDiv = document.getElementById("chatMessages");
  const p = document.createElement("p");
  p.innerHTML = `<strong>You:</strong> ${input.value}`;
  chatDiv.appendChild(p);
  input.value="";
  chatDiv.scrollTop = chatDiv.scrollHeight;
    }
