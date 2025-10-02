import productModel from "../models/product.model.js";

export async function getProducts(_, res) {
  try {
    const [products, total] = await Promise.all([
      productModel.find({}, { society: 1, qty: 1 }),
      productModel.countDocuments(),
    ]);
    res.render("index", { products, total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function getProductById(req, res) {
  try {
    const product = await productModel.findById(req.params.id);
    res.render("detail", { product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function getProductForModify(req, res) {
  try {
    const product = await productModel.findById(req.params.id);
    res.render("modify", { product });
  } catch (err) {
    console.error("Erreur récupération produit pour modification:", err);
    res.status(500).send("Erreur serveur");
  }
}

export async function updateProductById(req, res) {
  try {
    const { society, price, qty, year } = req.body;

    if (!society || !price || !qty || !year) {
      return res.render("modify", {
        product: { ...req.body, _id: req.params.id },
        error: "Tous les champs sont obligatoires",
      });
    }

    await productModel.findByIdAndUpdate(
      req.params.id,
      {
        society,
        price: Number(price),
        qty: Number(qty),
        year: Number(year),
      },
      { new: true }
    );

    res.redirect(`/detail/${req.params.id}`);
  } catch (err) {
    console.error("Erreur modification produit:", err);
    res.status(500).send("Erreur serveur");
  }
}

export async function deleteProduct(req, res) {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function addProduct(req, res) {
  try {
    const {
      society,
      price,
      qty,
      year,
      "size[h]": h,
      "size[w]": w,
      "size[uom]": uom,
    } = req.body;

    if (!society || !price || !qty || !year || !h || !w || !uom) {
      return res.render("add", { error: "Tous les champs sont obligatoires" });
    }

    const newProduct = new productModel({
      society,
      price: Number(price),
      qty: Number(qty),
      year: Number(year),
      size: { h: Number(h), w: Number(w), uom },
    });

    await newProduct.save();
    res.redirect("/");
  } catch (err) {
    console.error("Erreur ajout produit:", err);
    res.status(500).send("Erreur serveur");
  }
}
