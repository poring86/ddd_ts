export default interface ValitadorInterface<T> {
  validate(entity: T): void;
}
