import EventHandlerInterface from "../../shared/event-handler.interface";
import CostumerAddressChanged from "../customer-address-changed";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface {
  handle(event: CostumerAddressChanged) {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
