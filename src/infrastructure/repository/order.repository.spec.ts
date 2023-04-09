import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/customer/value-object/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";

import OrderRepository from "./order.repository";
import Customer from "../../domain/customer/entity/customer";
import Order from "../../domain/checkout/entity/order";
import CustomerRepository from "./customer.respository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      // logging: console.log,
      // logQueryParameters: true,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 123", 200);
    productRepository.create(product);
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });

    const product2 = new Product("4", "Product 4", 150);
    productRepository.create(product2);
    const orderItem2 = new OrderItem(
      "6",
      product2.name,
      product2.price,
      product2.id,
      6
    );

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);
    const orderUpdate = new Order("123", customer2.id, [orderItem2]);
    await orderRepository.update(orderUpdate);

    const orderModelUpdate = await OrderModel.findOne({
      where: { id: orderUpdate.id },
      include: ["items"],
    });

    expect(orderModelUpdate.toJSON()).toStrictEqual({
      id: "123",
      customer_id: customer2.id,
      total: orderUpdate.total(),
      items: [
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: orderUpdate.id,
          product_id: product2.id,
        },
      ],
    });
  });

  it("should should throw if not find an order", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("321");
    }).rejects.toThrow(`Could not find order with id: 321`);
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 123", 200);
    productRepository.create(product);
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const findOrder = await orderRepository.find(order.id);

    expect(order).toStrictEqual(findOrder);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 123", 200);
    const product2 = new Product("4", "Product 4", 150);

    productRepository.create(product);
    productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const orderItem2 = new OrderItem(
      "6",
      product2.name,
      product2.price,
      product2.id,
      6
    );

    const orderRepository = new OrderRepository();
    const order = new Order("123", customer.id, [orderItem]);
    const order2 = new Order("124", customer.id, [orderItem2]);
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const all = await orderRepository.findAll();

    expect(all.length).toBe(2);
    expect(all).toContainEqual(order);
    expect(all).toContainEqual(order2);

    console.log("all", all);
  });
});
