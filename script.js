// ===== TAB NAVIGATION =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-button[onclick="showSection('${id}')"]`).classList.add('active');
}

// ===== TO‑DO / NOTE APP =====
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  displayProducts(products);
});

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => displayTask(task));
}

function addTask() {
  let title = document.getElementById('taskTitle').value.trim();
  let desc = document.getElementById('taskDesc').value.trim();

  if (title) {
    let task = { title: title, description: desc };
    displayTask(task);
    saveTask(task);
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
  }
}

function displayTask(task) {
  let div = document.createElement('div');
  div.className = 'task-card fade-in';

  div.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description || ''}</p>
    <div class="task-actions">
      <button class="edit-btn">✏️ Edit</button>
      <button class="delete-btn">🗑 Delete</button>
    </div>
  `;

  // Delete
  div.querySelector('.delete-btn').onclick = function () {
    div.remove();
    removeTask(task);
  };

  // Edit
  div.querySelector('.edit-btn').onclick = function () {
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.description || '';
    removeTask(task);
    div.remove();
  };

  document.getElementById('taskList').appendChild(div);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => !(t.title === task.title && t.description === task.description));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ===== PRODUCT LIST =====
let products = [
  { name: "Laptop", category: "electronics", price: 50000, rating: 4.5, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { name: "T-Shirt", category: "clothing", price: 500, rating: 4.0, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { name: "Headphones", category: "electronics", price: 2000, rating: 4.2, img: "data:image/jpeg;base64,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" }
];

function displayProducts(list) {
  document.getElementById('productList').innerHTML = '';
  list.forEach(p => {
    document.getElementById('productList').innerHTML += `
      <div class="product-card fade-in">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
        <p>Rating: ${p.rating}</p>
      </div>
    `;
  });
}

function filterProducts() {
  let category = document.getElementById('categoryFilter').value;
  let filtered = category ? products.filter(p => p.category === category) : products;
  displayProducts(filtered);
}

function sortProducts() {
  let sortType = document.getElementById('sortFilter').value;
  let sorted = [...products];
  if (sortType === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  if (sortType === 'priceLowHigh') sorted.sort((a, b) => a.price - b.price);
  if (sortType === 'priceHighLow') sorted.sort((a, b) => b.price - a.price);
  displayProducts(sorted);
}

// ===== POPUP FOR FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('popup').style.display = 'flex';
});

function closePopup() {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('contactForm').reset();
}
