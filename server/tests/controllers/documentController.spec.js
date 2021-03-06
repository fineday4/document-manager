/* eslint-disable */
import supertest from 'supertest';
import server from '../../server';
import { document } from '../testData';

const app = supertest.agent(server);

describe('Document Controller', () => {
  let token;
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      db.roles.create({ title: 'admin' })
        .then(() => {
          db.roles.create({ title: 'regular' })
            .then(() => {
              db.users.create({ firstName: 'admin', lastName: 'admin', email: 'admin@admin.com', password: 'password', roleID: 1 })
                .then(() => {
                  db.users.create({ firstName: 'ghost', lastName: 'ghost', email: 'ghost@ghost.com', password: 'password', roleID: 2 })
                    .then(() => {
                      db.documents.create({ title: 'admindocument', content: 'this is admins public document', access: 'public', userID: 1 })
                        .then(() => {
                          db.documents.create({ title: 'userdocument', content: 'this is user public document', access: 'public', userID: 2 })
                            .then(() => {
                              app
                                .post('/api/users/login')
                                .send({
                                  email: 'admin@admin.com',
                                  password: 'password',
                                })
                                .end((error, response) => {
                                  token = response.body.token;
                                  done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
  });
  afterEach((done) => {
    db.roles.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe('Get all public  Documents', () => {
    it('it should GET all documents', (done) => {
      app
        .get('/api/documents')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an.instanceof(Object);
          expect(response.body).to.have.property('documents');
          expect(response.body).to.have.property('metaData');
          expect(response.body.documents.length).to.eql(2);
          expect(response.body.metaData.totalCount).to.eql(2);
          expect(response.body.documents[0].access).to.eql('public');
          expect(response.body.documents[1].access).to.eql('public');
          done();
        });
    });
  });

    describe('Get all roles  Documents', () => {
    it('it should GET all roles documents', (done) => {
      app
        .get('/api/documents/roles')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an.instanceof(Object);
          expect(response.body).to.have.property('documents');
          expect(response.body).to.have.property('metaData');
          expect(response.body.documents.length).to.eql(0);
          expect(response.body.metaData.totalCount).to.eql(0);
          done();
        });
    });
  });

  describe('create a new document', () => {
    it('it should create a new document', (done) => {
      app
        .post('/api/documents')
        .set('authorization', token)
        .send(document.publicDocument)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('message');
          expect(response.body).to.have.property('message').eql('Document created successfully');
          done();
        });
    });
  });


  describe('/POST Documents', () => {
    const doc = {
      title: '',
      access: '',
      content: '',
      userID: 1,
    };

    it('it should validate all input fields', (done) => {
      app
        .post('/api/documents')
        .set('authorization', token)
        .send(doc)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message');
          done();
        });
    });
  });


  describe('/GET a doc using the id', () => {

    it('it should return 404 for an invalid docId ', (done) => {
      app
        .get('/api/documents/4')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.error).to.exist;
          expect(response.error.text).to.eql('{"message":"document not found"}');
          expect(response.body).to.have.property('message');
          expect(response.body).to.have.property('message').eql('document not found');
          done();
        });
    });
  });

  describe('Get a document using the id', () => {
    it('it should get a document with the passed param as id ', (done) => {
      app
        .get('/api/documents/2')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an.instanceof(Object);
          expect(response.body).to.not.be.null;
          expect(response.body).to.have.property('id').eql(2);
          expect(response.body).to.have.property('title');
          expect(response.body).to.have.property('access');
          expect(response.body).to.have.property('content');
          expect(response.body.title).to.eql('userdocument');
          expect(response.body.access).to.eql('public');
          expect(response.body.id).to.eql(2);
          done();
        });
    });
  });

  describe('/Update a users document', () => {
    it('it should update a document with the passed param as id ', (done) => {
      app
        .put('/api/documents/1')
        .set('authorization', token)
        .send(document.editDocument)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message').eql('Document updated successfully');
          done();
        });
    });
  });

  describe('Delete a document using the id', () => {
    it('it should delete a document with the passed param as id ', (done) => {
      app
        .delete('/api/documents/1')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message').eql('Document successfully deleted');
          done();
        });
    });
  });

  describe('/GET search for a document', () => {
    it('it should return documents matching the search query', (done) => {
      app
        .get('/api/search/documents/?title=This')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('documents');
          done();
        });
    });
  });

  describe('/GET search for a document', () => {
    it('it should return a document matching the search query', (done) => {
      app
        .get('/api/search/publicDocuments/?title=The')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
});
