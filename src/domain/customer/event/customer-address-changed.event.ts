import EventInterface from "src/domain/shared/event/event.interface";

export default class CostumerAddressChanged implements EventInterface {
  private _dataTimeOccurred: Date;

  get eventData() {
    return this._eventData;
  }

  get dataTimeOccurred() {
    return this._dataTimeOccurred;
  }

  constructor(private _eventData: any) {
    this._dataTimeOccurred = new Date();
  }
}
