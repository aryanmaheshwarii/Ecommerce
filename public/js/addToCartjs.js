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
        }).catch((err) => {
            console.log(err);
        })
})