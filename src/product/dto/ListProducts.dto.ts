export class ListProductsDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
  ) {}
}
