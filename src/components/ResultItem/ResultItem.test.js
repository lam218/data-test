import React from "react";
import renderer from "react-test-renderer";
import ResultItem from "./ResultItem";
import {  shallow, mount } from "enzyme";

test("Test that the Result item renders", () => {
  const displayModal = jest.fn();
  const component = renderer.create(
    <ResultItem
      row={1}
      item={{
        m_szDocTitle: "hello",
        m_szYear: "2020",
        m_szGeo1: "UK",
        m_szDocSumamry: "Some summary",
      }}
      displayModal={displayModal}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test("Test that the Result item clicks", () => {
  const displayModal = jest.fn();
  const component = shallow(
    <ResultItem row={1} item={{ m_szDocTitle: "hello",
    m_szYear: "2020",
    m_szGeo1: "UK",
    m_szDocSumamry: "Some summary"}} displayModal={displayModal} />
  );
  component.find('button').simulate('click');
});
