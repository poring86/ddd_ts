import Entity from "src/domain/shared/entity/entity.abstract";

export default interface ProductInterface extends Entity {
  get name(): string;
  get price(): number;
  validate(): void;
  changeName(name: string): void;
  changePrice(price: number): void;
}
