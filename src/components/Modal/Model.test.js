import React from 'react';
import Modal from './Modal';
import renderer from 'react-test-renderer';


test('Test that the Modal renders', () => {
    const closeModal = jest.fn();
    const component = renderer.create(
        <Modal doc={{}} closeModal={closeModal}/>,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})