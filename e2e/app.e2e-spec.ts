import { NgwsPage } from './app.po';

describe('ngws App', () => {
  let page: NgwsPage;

  beforeEach(() => {
    page = new NgwsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
