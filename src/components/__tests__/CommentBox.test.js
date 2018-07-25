import React from 'react';
import { mount } from 'enzyme';
import CommentBox from '../CommentBox';
import Root from '../../Root'

let wrapped;

beforeEach( () => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach( () => {
  wrapped.unmount();
});

// beforeEach first
// then it
// then afterEach (cleanup)
it('has a text area and two button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
  // runs after the first global before each
  beforeEach( () => {
    wrapped.find('textarea').simulate('change', {
      target: {
        value: 'new comment'
      }
    });
    //force component to re-render, setState is ASYNC
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, text area gets emptied', () => {
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});

