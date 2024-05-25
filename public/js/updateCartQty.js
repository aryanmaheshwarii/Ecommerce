// updating quantity on cart page...

let cartItem = document.querySelector('.cartItem');
cartItem.addEventListener('click', (ev) => {
    let item = ev.target;
    // console.log(item.innerText, item.getAttribute('productId'));
    let sign = item.innerText;
    let productId = item.getAttribute('productId');
    let price = document.querySelector('.total');
    let qtyNumber = ev.target.parentElement.children[2];
    // console.log(qtyNumber);
    if (sign === '➕') {
        // update the qty...
        axios.get(`/shop/increaseQty?productId=${productId}`)
            .then((res) => {
                qtyNumber.innerText = Number(qtyNumber.innerText) + 1;
                price.innerText = `Total Price : $ ${res.data.totalPrice}`;
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else if (sign === '➖') {
        // decrease the qty...
        if (Number(qtyNumber.innerText) > 1) {
            axios.get(`/shop/decreaseQty?productId=${productId}`)
                .then((res) => {
                    qtyNumber.innerText = Number(qtyNumber.innerText) - 1;
                    price.innerText = `Total Price : $ ${res.data.totalPrice}`;
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            // If quantity is already 1 or less, delete the item
            axios.get(`/shop/delete?productId=${productId}`)
                .then((res) => {
                    ev.target.parentElement.parentElement.parentElement.parentElement.remove();
                    let cartCnt = document.querySelector('.cartCnt');
                    cartCnt.innerText = Number(cartCnt.innerText) - 1;
                    price.innerText = `$ ${res.data.totalPrice}`;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    else if (ev.target.classList.contains('deleteBtn')) {
        // delete the item...
        axios.get(`/shop/delete?productId=${productId}`)
            .then((res) => {
                ev.target.parentElement.parentElement.parentElement.parentElement.remove();
                let cartCnt = document.querySelector('.cartCnt');
                cartCnt.innerText = Number(cartCnt.innerText) - 1;
                price.innerText = `$ ${res.data.totalPrice}`;
            })
            .catch((err) => {
                console.log(err);
            })
    }

})