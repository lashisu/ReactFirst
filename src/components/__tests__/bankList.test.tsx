import * as React from "react";
import { shallow } from "../../enzyme";

import BankList from "../bankList";

describe("List tests", () => {
  it("renders loading", () => {
    const props = {
      banks: null,
      error: null,
      isLoaded: false
    };
    const wrapper = shallow(<BankList {...props} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find(".loading")).toBeDefined();
    //  expect(wrapper.find(".item")).toHaveLength(items.length);
  });

  it("renders error", () => {
    const props = {
      banks: null,
      error: { message: "Loading error" },
      isLoaded: true
    };
    const wrapper = shallow(<BankList {...props} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find(".loading")).toBeDefined();
    //  expect(wrapper.find(".item")).toHaveLength(items.length);
  });

  it("renders bank list", () => {
    const props = {
      banks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      error: "",
      isLoaded: true
    };
    const wrapper = shallow(<BankList {...props} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find(".loading")).toBeUndefined();
    expect(wrapper.find(".bank-list")).toBeDefined();
    expect(wrapper.find(".bank-item")).toHaveLength(props.banks.length);
  });

  it("renders no data", () => {
    const props = {
      banks: [],
      error: "",
      isLoaded: true
    };
    const wrapper = shallow(<BankList {...props} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find(".loading")).toBeUndefined();
    expect(wrapper.find(".bank-list")).toBeDefined();
    expect(wrapper.find(".bank-item")).toHaveLength(props.banks.length);
  });

  /*
  it("renders a list item", () => {
    const items = ["Thor", "Loki"];
    const wrapper = shallow(<List items={items} />);

    // Check if an element in the Component exists
    expect(
      wrapper.contains(
        <li key="Thor" className="item">
          Thor
        </li>
      )
    ).toBeTruthy();
  });

  it("renders correct text in item", () => {
    const items = ["John", "James", "Luke"];
    const wrapper = shallow(<List items={items} />);

    //Expect the child of the first item to be an array
    expect(wrapper.find(".item").get(0).props.children).toEqual("John");
  });*/
});
