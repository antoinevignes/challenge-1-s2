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

export async function updateProductById(req, res) {
  try {
    const updated = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect(`/detail/${req.params.id}`);
  } catch (err) {
    console.error(err);
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
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}
