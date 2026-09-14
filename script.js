const WHATSAPP_NUMBER="2348081823067"; // Replace with your real number, digits only.
const products=[
 {id:1,name:"Pro Gaming Controller",cat:"gaming",price:35000,emoji:"🎮",desc:"Comfortable controller for supported gaming setups."},
 {id:2,name:"RGB Gaming Headset",cat:"gaming",price:28000,emoji:"🎧",desc:"Immersive audio for gaming and entertainment."},
 {id:3,name:"Gaming Mouse",cat:"gaming",price:18000,emoji:"🖱️",desc:"Responsive mouse for PC gaming."},
 {id:4,name:"4-Camera CCTV Kit",cat:"security",price:185000,emoji:"📹",desc:"Starter surveillance package; final specification by site assessment."},
 {id:5,name:"8-Camera CCTV Kit",cat:"security",price:320000,emoji:"📹",desc:"Expanded security package for larger properties."},
 {id:6,name:"Solar Inverter Package",cat:"solar",price:450000,emoji:"☀️",desc:"Example package; final sizing and price after load assessment."}
];
let cart=JSON.parse(localStorage.getItem("mrRodCart")||"[]");
const naira=n=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n);
function renderProducts(cat="all"){
 const box=document.getElementById("products"); if(!box)return;
 box.innerHTML=products.filter(p=>cat==="all"||p.cat===cat).map(p=>`
 <article class="product"><div class="product-img">${p.emoji}</div><span class="badge">${p.cat}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><strong>${naira(p.price)}</strong><button onclick="addCart(${p.id})">Add to cart</button></div></article>`).join("");
}
function addCart(id){const p=products.find(x=>x.id===id);const old=cart.find(x=>x.id===id);old?old.qty++:cart.push({...p,qty:1});saveCart();toast("Added to cart");}
function saveCart(){localStorage.setItem("mrRodCart",JSON.stringify(cart));updateCount();}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);}
function openCart(){document.getElementById("cartModal").classList.add("show");renderCart();}
function closeCart(){document.getElementById("cartModal").classList.remove("show");}
function renderCart(){
 const box=document.getElementById("cartItems"); if(!box)return;
 if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p>';document.getElementById("cartTotal").textContent=naira(0);return;}
 box.innerHTML=cart.map(x=>`<div class="cart-row"><div><b>${x.name}</b><small>${naira(x.price)} × ${x.qty}</small></div><div><button onclick="changeQty(${x.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${x.id},1)">+</button></div></div>`).join("");
 document.getElementById("cartTotal").textContent=naira(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function changeQty(id,d){const x=cart.find(p=>p.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(p=>p.id!==id);saveCart();renderCart();}
function checkoutWhatsApp(){
 if(!cart.length){toast("Your cart is empty");return;}
 let lines=cart.map(x=>`• ${x.name} × ${x.qty} — ${naira(x.price*x.qty)}`).join("\n");
 let total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 let msg=`Hello MR. ROD GAMER Enterprise. I want to order:\n${lines}\nTotal: ${naira(total)}\n\nPlease confirm availability, delivery/pickup and payment details.`;
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
}
function toast(t){const el=document.createElement("div");el.className="toast";el.textContent=t;document.body.appendChild(el);setTimeout(()=>el.remove(),1800);}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.cat)}));
document.getElementById("quoteForm")?.addEventListener("submit",e=>{
 e.preventDefault();
 const service=document.getElementById("quoteService").value,name=document.getElementById("quoteName").value,phone=document.getElementById("quotePhone").value,loc=document.getElementById("quoteLocation").value,property=document.getElementById("quoteProperty").value,details=document.getElementById("quoteDetails").value;
 const msg=`Hello MR. ROD GAMER Enterprise. I would like a ${service} quote.\n\nName: ${name}\nPhone: ${phone}\nLocation: ${loc}\nProperty: ${property}\nDetails: ${details||"Please advise me on the suitable solution."}`;
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
});
document.getElementById("whatsappLink")?.setAttribute("href",`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello MR. ROD GAMER Enterprise, I would like to make an enquiry.")}`);
document.querySelector(".menu")?.addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();updateCount();