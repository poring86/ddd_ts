import * as yup from "yup";
import Customer from "../entity/customer";
import ValitadorInterface from "../../../domain/shared/validator/validator.interface";

export default class CustomerYupValidator
  implements ValitadorInterface<Customer>
{
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}
