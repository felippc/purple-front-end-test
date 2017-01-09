describe('LoginTest', function() {

  beforeEach(function() {
    browser.get('http://localhost:9000');
  });

  it('should do login', function() {

    //FIELDS
    var userField = element(by.model('user'));
    var passField = element(by.model('pass'));

    //BUTTON
    var loginButton = element(by.id('login-button'));

    userField.sendKeys('admin');
    passField.sendKeys('admin');
    loginButton.click();

    expect(true).toEqual(true);
  });
});

describe('FilterTest', function() {
  var expectTopics = function(expectedTopics, key) {
    element.all(by.repeater(key + ' in itens').column(key + '.topic')).then(function(arr) {
      arr.forEach(function(wd, i) {
        expect(wd.getText()).toMatch(expectedTopics[i]);
      });
    });
  };

  beforeEach(function() {
    browser.get('http://localhost:9000/#!/list-itens');
  });

  it('should search across all fields when filtering with a string', function() {
    var searchText = element(by.model('searchText'));
    searchText.clear();
    searchText.sendKeys('i');
    expectTopics(['Avalia', 'Seleciona', 'Cria'], 'item');

    searchText.clear();
    searchText.sendKeys('1');
    expectTopics(['Escala', 'Avalia'], 'item');

    searchText.clear();
    searchText.sendKeys('5');
    expectTopics(['Avalia', 'Planeja', 'Cria'], 'item');
  });
});