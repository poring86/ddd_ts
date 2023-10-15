import EventHandlerInterface from "src/domain/shared/event/event-handler.interface";
import CostumerAddressChanged from "../change-address.event";

export default class ChangeAddressHandler implements EventHandlerInterface {
  handle(event: CostumerAddressChanged) {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.street}`
    );
  }
}
