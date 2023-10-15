import EventHandlerInterface from "src/domain/shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface {
  handle(event: CustomerCreatedEvent) {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
