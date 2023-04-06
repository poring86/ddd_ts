import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItem from "../../domain/entity/order_item";

const orderItemToDatabase = (orderItem: OrderItem) => {
  return {
    id: orderItem.id,
    product_id: orderItem.productId,
    name: orderItem.name,
    price: orderItem.price,
    quantity: orderItem.quantity,
  };
};

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const updatedItems = entity.items.map(orderItemToDatabase);
    const itemsOnDB = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    });

    for (const updatedItem of updatedItems) {
      const itemExistsOnDB = itemsOnDB.find(
        (itemOnDB) => itemOnDB.id === updatedItem.id
      );

      if (!itemExistsOnDB) {
        await OrderItemModel.create({
          id: updatedItem.id,
          name: updatedItem.name,
          price: updatedItem.price,
          product_id: updatedItem.product_id,
          quantity: updatedItem.quantity,
          order_id: entity.id,
        });
      }
    }

    for (const itemOnDB of itemsOnDB) {
      const itemExistsOnUpdatedItems = updatedItems.find(
        (updatedItem) => updatedItem.id === itemOnDB.id
      );

      if (!itemExistsOnUpdatedItems) {
        await OrderItemModel.destroy({ where: { id: itemOnDB.id } });
      }
    }

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}
