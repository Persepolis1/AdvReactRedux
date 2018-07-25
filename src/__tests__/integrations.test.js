import React from  'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from '../Root';
import App from '../components/App';


beforeEach(()=>{
  // intercept all requests by axios ASYNC
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{name: 'Fetched #1'}, {name: 'Fetched #2'}]
  });
});

afterEach(()=>{
  //clean up
  moxios.uninstall();
});

//done tells jest to hold on for a second
it('can fetch a list of comments and display them', (done) => {
  //Attempt to render the entire app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );
  //find the FetchComments button and click it
  wrapped.find('.fetch-comments').simulate('click');
  //Expect to find a list of comments and WAIT
  // moxios wait , is like set timeout but defined by the lib
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
