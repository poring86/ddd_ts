import EventInterface from "src/domain/shared/event/event.interface";

interface CustomerCreatedEventPayload {
  id: string;
  name: string;
}

export default class CustomerCreatedEvent implements EventInterface {
  private _dataTimeOccurred: Date;

  get eventData() {
    return this._eventData;
  }

  get dataTimeOccurred() {
    return this._dataTimeOccurred;
  }

  constructor(private _eventData: CustomerCreatedEventPayload) {
    this._dataTimeOccurred = new Date();
  }
}
