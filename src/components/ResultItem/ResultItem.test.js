import React from 'react';
import renderer from 'react-test-renderer';
import ResultItem from './ResultItem';


test('Test that the Result item renders', () => {
    const displayModal = jest.fn();
    const component = renderer.create(
        <ResultItem row={1} item={{}} displayModal={displayModal}/>,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})