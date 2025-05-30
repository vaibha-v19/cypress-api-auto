describe('API Tests', () => {
  let config;
  let requestBodies;

  before(() => {
    // Load configuration and request bodies from fixtures
    cy.fixture('apiConfig').then((data) => {
      config = data;
    });

    cy.fixture('requestBodies').then((data) => {
      requestBodies = data;
    });
  });

  it('Delete Request', () => {
    cy.request({
      method: 'DELETE',
      url: `${config.baseUrl}/api/users/599`,
      headers: config.headers,
      body: requestBodies.deleteRequestBody
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Post Request', () => {
    cy.request({
      method: 'POST',
      url: `${config.baseUrl}/api/users`,
      headers: config.headers,
      body: requestBodies.postRequestBody
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'pawan');
      expect(response.body).to.have.property('job', 'trainer');
    });
  });

  it('Get Request', () => {
    cy.request({
      method: 'GET',
      url: `${config.baseUrl}/api/users?page=2`,
      headers: config.headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.satisfy((users) => users.some(user => user.first_name === 'Michael'));
      expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
      //expect(response.cookies).to.be.empty;
    });
  });

  it('Put Request', () => {
    cy.request({
      method: 'PUT',
      url: `${config.baseUrl}/api/users/599`,
      headers: config.headers,
      body: requestBodies.putRequestBody
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'pawan');
      expect(response.body).to.have.property('job', 'engineer');
    });
  });
});