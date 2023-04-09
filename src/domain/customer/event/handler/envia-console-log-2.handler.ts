import EventHandlerInterface from "src/domain/shared/event/event-handler.interface";
import CostumerAddressChanged from "../customer-address-changed.event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface {
  handle(event: CostumerAddressChanged) {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.street}`
    );
  }
}
