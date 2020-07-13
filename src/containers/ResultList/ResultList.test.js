import React from 'react';
import renderer from 'react-test-renderer';
import ResultListContainer from './ResultListContainer';
import { shallow } from 'enzyme';



test('Test that the Result item renders', () => {
    const toggleModal = jest.fn();
    const component = renderer.create(
        <ResultListContainer toggleModal={toggleModal}
        showModal={false}
        modalData={{}}/>,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})