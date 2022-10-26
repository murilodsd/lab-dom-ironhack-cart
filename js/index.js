const $cart = document.getElementById('cart');
let $listOfProduct = $cart.querySelector('tbody');
const $createProductBtn = document.getElementById('create');

// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  let price = parseFloat(product.querySelector('.price > span').innerText);
  let quantity = parseFloat(product.querySelector('.quantity > input').value);
  let subTotal = price * quantity;
  product.querySelector('.subtotal > span').innerText = subTotal;
  return subTotal;

  //... your code goes here
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  //... your code goes here
  let total = 0;
  let $product = document.getElementsByClassName('product');

  for (let product of $product) {
    total += updateSubtotal(product);
    console.log(total);
  }

  // ITERATION 3
  let $total = document.querySelector('#total-value > span');
  $total.innerText = total;
}

// ITERATION 4

function removeProduct(event) {
  const $target = event.currentTarget;
  const $product = $target.parentElement.parentElement;
  console.log('The target in remove is:', $target);
  $product.remove();
  //A forma abaixo é suportada por mais navegadores
  //$product.parentElement.removeChild($product);
  calculateAll();
}

// ITERATION 5

function createProduct() {

  const $newProductName = document.querySelector(
    '.create-product > td > input[placeholder="Product Name"]'
  );
  const newProductName = $newProductName.value;
  const $newProductPrice = document.querySelector(
    '.create-product > td > input[placeholder="Product Price"]'
  );
  const newProductPrice = parseFloat($newProductPrice.value).toFixed(2);

  let $newProduct = document.createElement('tr')
  $newProduct.className = 'product'
  $newProduct.innerHTML = `<td class="name">
  <span>${newProductName}</span>
</td>
<td class="price">$<span>${newProductPrice}</span></td>
<td class="quantity">
  <input type="number" value="0" min="0" placeholder="Quantity" />
</td>
<td class="subtotal">$<span>0</span></td>
<td class="action">
  <button class="btn btn-remove">Remove</button>
</td>`;

   //$listOfProduct.innerHTML += $newProduct
  // poderia ter feito algo assim
  
   $listOfProduct.insertAdjacentElement('beforeend', $newProduct);
  


  const $Products = document.querySelectorAll('.product');

  // nao precisava ter rodado para todos os produtos, somente para o que foi criado
  for (let product of $Products) {
    product.querySelector('.btn-remove').addEventListener('click', (e) => removeProduct(e));
    product.querySelector('input[placeholder="Quantity"]').addEventListener('change', () => calculateAll());
  }

  $newProductName.value = '';
  $newProductPrice.value = 0;

  

}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  const $Products = document.querySelectorAll('.product');

  for (let product of $Products) {
    product.querySelector('.btn-remove').addEventListener('click', (e) => removeProduct(e));
    product.querySelector('input[placeholder="Quantity"]').addEventListener('change', () => calculateAll());
  }
  $createProductBtn.addEventListener('click', createProduct);
  //... your code goes here
});
