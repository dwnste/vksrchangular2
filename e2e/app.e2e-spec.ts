import { Vksrchangular2Page } from './app.po';

describe('vksrchangular2 App', () => {
  let page: Vksrchangular2Page;

  beforeEach(() => {
    page = new Vksrchangular2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
