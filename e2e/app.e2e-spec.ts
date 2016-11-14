import { WtmPage } from './app.po';

describe('wtm App', function() {
  let page: WtmPage;

  beforeEach(() => {
    page = new WtmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
