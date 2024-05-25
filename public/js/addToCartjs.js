let addToCartBtn = document.querySelector('.addToCartBtn');

addToCartBtn.addEventListener('click', (ev) => {
    console.log('add to cart');
    let productId = addToCartBtn.getAttribute('productId');
    console.log(productId);
    axios.get(`/shop/addtocart?productId=${productId}`)
        .then((res) => {
            let cartCnt = document.querySelector('.cartCnt');
            let x = Number(cartCnt.innerText);
            x++;
            cartCnt.innerText = x;
            console.log('item added successfully...');
            showPopup('Item added successfully');
        }).catch((err) => {
            console.log(err);
        })
})

function showPopup(message) {
    // Create popup element
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

    // Append popup to the body
    document.body.appendChild(popup);

    // Remove popup after 2 seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
}