const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  fbAccessToken: String,
  fbID: String,
  googleAccessToken: String,
  googleID: String,
  isAdmin: Boolean,
  cart: {
    products: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Products'
        },
        quantity: Number
      }
    ]
  }
});

userSchema.method('addToCart', function (productId) {
  // console.log(this._id); // in order to get user id.
  console.log('Inside Mathod', productId);
  const cartProducts = this.cart.products;
  console.log("cart products", cartProducts);
  // check krunga ki ye productId mere cart m present hai .. agar hai to uski quantity ko increase krdunga.
  // agar nhi hai productId mere cart m to insert krunga and quantity ko 1 krdunga.

  // pehle dekhunga agar product mere cart m present hai to uska index search krta hun.
  let indx = -1;
  cartProducts.forEach((e, i) => { // har ek cart product mera object hoga.
    if (e.id == productId)
      indx = i;
  })
  if (indx == -1) {
    // product cart m nahi hai , insert a new productId with quantity: 1.
    // unshift ek element ko insert kar deta hai starting m, shift remove one element from starting.
    // insert a new product id with quantity 1.
    cartProducts.unshift({
      id: productId,
      quantity: 1
    })
  }
  else {
    // update quantity of previous inserted product.
    cartProducts[indx].quantity += 1;
  }

  return this.save();
})

module.exports = mongoose.model('User', userSchema);