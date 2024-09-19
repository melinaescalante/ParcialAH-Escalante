const fs = require("fs/promises");
const crypto = require("crypto");
class Products {
  products = [];
  
  path = "data/products.json";
  constructor() {
    this.readJson();
  }
  async readJson() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const json = JSON.parse(data);
      this.products = json;
      return this.products
    } catch (error) {
      console.error('Ocurrio un error ', error)
    }
  }

  async writeJson() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, data);
    } catch (error) {
      console.error('Error', error);
    }
  }

  async addProductJson(product) {
    const id= crypto.randomUUID()
    product.id= id
    await this.readJson();

    this.products.push(product);

    await this.writeJson();
  }
  async getProductById(id) {
    await this.readJson()

      const findProduct = this.products.filter((product) => product.id === id);
      if (!findProduct != []) {
        console.error("Not Found");
      } else {
        return findProduct;
      }
  }
  async updateProduct(id, name, description,price,image,stock){
    await this.readJson()
    const findProduct = await this.products.find((product) => product.id === id);
    if (name|| description|| price || image || stock) {
      findProduct.name=name
      findProduct.description=description
      findProduct.price=price
      findProduct.image=image
      findProduct.stock=stock
    
    }
    await this.writeJson()

  }
}
module.exports = { Products };