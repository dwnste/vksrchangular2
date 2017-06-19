import { VsaPage } from './app.po';

describe('vsa App', () => {
  let page: VsaPage;

  beforeEach(() => {
    page = new VsaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
