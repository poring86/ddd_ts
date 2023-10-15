import EventInterface from "src/domain/shared/event/event.interface";

interface CustomerAddressChangedEventPayload {
  id: string,
  name: string,
  street: string,
  number: number,
  zip: string,
  city: string,
}


export default class ChangeAddressEvent implements EventInterface {
  private _dataTimeOccurred: Date;

  get eventData() {
    return this._eventData;
  }

  get dataTimeOccurred() {
    return this._dataTimeOccurred;
  }

  constructor(private _eventData: CustomerAddressChangedEventPayload) {
    this._dataTimeOccurred = new Date();
  }
}
