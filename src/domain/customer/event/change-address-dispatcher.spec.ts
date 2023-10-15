import EventDispatcher from "../../shared/event/event-dispatcher";
import ChangeAddressEvent from "./change-address.event";
import ChangeAddressHandler from "./handler/change-address.handler";

describe("Change Address events tests", () => {
  it("should register events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const changeAddressEventHandler = new ChangeAddressHandler();

    eventDispatcher.register("ChangeAddressEvent", changeAddressEventHandler);
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"][0]
    ).toMatchObject(changeAddressEventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const changeAddressEventHandler = new ChangeAddressHandler();

    eventDispatcher.register("ChangeAddressEvent", changeAddressEventHandler)
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"][0]
    ).toMatchObject(changeAddressEventHandler);
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"].length
    ).toBe(1);

    eventDispatcher.unregister("ChangeAddressEvent", changeAddressEventHandler);
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"].length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const changeAddressEventHandler = new ChangeAddressHandler();

    eventDispatcher.register("ChangeAddressEvent", changeAddressEventHandler);
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"].length
    ).toBe(1);

    eventDispatcher.register("ChangeAddressEvent", changeAddressEventHandler);
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"].length
    ).toBe(2);

    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"][0]
    ).toMatchObject(changeAddressEventHandler);

    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const changeAddressEventHandler = new ChangeAddressHandler();

    const spyEventHandler = jest.spyOn(changeAddressEventHandler, "handle");

    eventDispatcher.register("ChangeAddressEvent", changeAddressEventHandler);

    expect(
      eventDispatcher.getEventHandlers["ChangeAddressEvent"][0]
    ).toMatchObject(changeAddressEventHandler);

    const customerChangedAddressEvent = new ChangeAddressEvent({
      id: "123",
      name: "Matheus",
      street: "Street 1",
      number: 123,
      zip: "23234-250",
      city: "São Paulo",
    });

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
