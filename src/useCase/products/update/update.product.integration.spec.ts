import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const product = new Product("123", "Product", 35);

const input = {
  id: product.id,
  name: "Product updated",
  price: 40,
};

describe("unit test for update product", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    productRepository.create(product);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
