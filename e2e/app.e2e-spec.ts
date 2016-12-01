import { GestioneCampoPage } from './app.po';

describe('gestione-campo App', function() {
  let page: GestioneCampoPage;

  beforeEach(() => {
    page = new GestioneCampoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
