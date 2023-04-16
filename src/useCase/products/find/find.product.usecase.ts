import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
  private produtRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.produtRepository = productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.produtRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
