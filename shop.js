const express = require("express");
const router = express.Router();
const Product = require("./models/product.js");
const User = require("./models/user.js");
const items_per_page = 4;

function ensureAuth(req, res, next) {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res.json("You must be logged in to do this!");
    res.redirect("/add-product");
  }
} //Similarly can add admin validation. All such validation should be done from the server side or the user can easily change such local variables

function ensureAdmin(req, res, next) {
  if (req.session.admin) {
    return next();
  } else {
    console.log("You must be an Administrator in to do this!");
  }
}

router.get("/api/products/:slug", (req, res, next) => {
  console.log(req.params.slug);
  Product.findOne({
      slug: req.params.slug
    })
    .then(product => {
      console.log(product);
      return res.json({
        product:product
      });
    })
    .catch(err => {
      console.log(err);
      return next();
    });

});

router.get("/api/productsSearch/:title", (req, res, next) => {
  console.log(req.params.title);
  Product.findOne({
      title: req.params.title
    })
    .then(product => {
      console.log(product);
      return res.json({
        product:product
      });
    })
    .catch(err => {
      console.log(err);
      return next();
    });

});

router.get("/api/shop", (req, res, next) => {
  //react me bhi handle pass hua
  const page = +req.query.page || 1; //?page=1,,if req.query.handle--> gets
  const k = +req.query.sort || 0;
  let category="all";
  if (req.query.category !== "undefined") category = req.query.category;
  else {
    category = "all";
  }
  console.log(category);
  Product.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      if (category === "all") {
        console.log("all prods");
        return Product.find()
          .sort({ price: k })
          .skip((page - 1) * items_per_page) //skip previous items
          .limit(items_per_page); //go till another page only
      } else {
        console.log("selected prods");
        return Product.find({ category: category })
          .sort({ price: k })
          .skip((page - 1) * items_per_page) //skip previous items
          .limit(items_per_page); //go till another page only
      }
    })
    .then(products => {
      res.json
      ({
        prods: products,
        currentPage: page,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / items_per_page),
        hasNextPage: items_per_page * page < totalItems,
        sort: k
      });
    })
    .catch(err => {
      console.log(err);
      console.log("couldnt fetch products");
    });
});

//name in html file of input was title
router.post("/api/add-product", ensureAuth, (req, res, next) => {
  //../ means go up one level
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    img: req.body.img,
    category: req.body.category
  });
  product
    .save()
    .then(result => {
      console.log("Product added to DB");
    })
    .catch(err => {
      console.log(err);
    });
  return next();
});

router.get("/api/cart", ensureAuth, (req, res, next) => {
  if (typeof req.user === "undefined") {
    res.json({ loggedIn: false });
    console.log("not logged in");
    return next();
  }

  req.user //this is making reference !! Super Important
    .populate("cart.items.prodid")
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.json({ cart: products, loggedIn: true });
    })
    .catch(err => console.log(err));
});

router.post("/api/addToCart", ensureAuth, (req, res, next) => {
  let id = req.body.productId;

  Product.findById(id) //static methods are acessed using classname
    .then(addP => {
      return req.user.addToCart(addP);
    })
    .catch(err => {
      console.log(err);
      console.log("not added");
    });
  res.redirect("/shop");
});

router.post("/api/remove", ensureAuth, (req, res, next) => {
  let id = req.body.productId;
  let id2 = id.toString();
  console.log("id2 is ", id2);
  req.user
    .removeFromCart(id2)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log("yahan error");
      console.log(err);
    });
});

module.exports = router;

//let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// foo=await getfoo();;
// bar=await getBar();
