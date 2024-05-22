// updating quantity on cart page...

let cartItem = document.querySelector('.cartItem');
cartItem.addEventListener('click', (ev) => {
    let item = ev.target;
    // console.log(item.innerText, item.getAttribute('productId'));
    let sign = item.innerText;
    let productId = item.getAttribute('productId');
    let price = document.querySelector('.total');
    let qtyNumber = ev.target.parentElement.children[1];
    // console.log(qtyNumber);
    if (sign === '➕') {
        // update the qty...
        axios.get(`/shop/increaseQty?productId=${productId}`)
            .then((res) => {
                // console.log('req.data', res.data);
                qtyNumber.innerText = Number(qtyNumber.innerText) + 1;
                // console.log('price', totalPrice);
                price.innerText = `Total Price : $ ${res.data.totalPrice}`;
                // console.log('price', totalPrice);
                // console.log('qty increased ', productId);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else if (sign === '➖') {
        console.log(qtyNumber);
        // decrease the qty...
        axios.get(`/shop/decreaseQty?productId=${productId}`)
            .then((res) => {
                // console.log(res);
                qtyNumber.innerText = Number(qtyNumber.innerText) - 1;
                price.innerText = `Total Price : $ ${res.data.totalPrice}`;
                // console.log('qty increased ', productId);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else if (ev.target.classList.contains('deleteBtn')) {
        console.log('pressed delete btn');
        axios.get(`/shop/delete?productId=${productId}`)
            .then((res) => {
                console.log(ev.target.parentElement.parentElement.parentElement.parentElement);
                ev.target.parentElement.parentElement.parentElement.parentElement.remove();
                let cartCnt = document.querySelector('.cartCnt');
                cartCnt.innerText = Number(cartCnt.innerText) - 1;
                price.innerText = `$ ${res.data.totalPrice}`;
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
})