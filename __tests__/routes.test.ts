import request from 'supertest';
import app from '../src/app';

describe('GET ALL CONTACTS', () => {
  it('should return everything in the data base', () => {
    return request(app)
      .get('/api/contacts')
      .expect(200, [
        {
          id: '1',
          name: 'Valeri Obi',
          email: 'obichiz@gmail.com',
          mobile: '0818-384-0096',
          company: 'okon and sons',
          isBlocked: 'false'
        },
        {
          id: '2',
          name: 'Anita Obi',
          email: 'anitachiz@gmail.com',
          mobile: '0818-000-0000',
          company: 'anita and sons',
          isBlocked: 'false'
        },
        {
          id: '3',
          name: 'Johnson Okoro',
          email: 'okorojohnson@gmail.com',
          mobile: '0818-001-0001',
          company: 'okoro and sons',
          isBlocked: 'false'
        },
        {
          id: '59492983-246d-4808-af0f-9be014a4ce62',
          name: 'xxxxxxn',
          email: 'xxxxxx@gmail.com',
          mobile: '0818-384-0096',
          isBlocked: 'false'
        },
        {
          id: 'abad3d6c-456e-4a7b-9d7d-6c56e4910638',
          name: 'Sharon Stone',
          email: 'sharon@gmail.com',
          mobile: '0803-668-7418',
          isBlocked: 'false'
        }
      ]);
  });
});

describe('it should return hello world', () => {
  it('should return hello world', () => {
    return request(app)
      .get('/dummy')
      .expect('i worked');
  });
});

//'/api/contacts/:id'
describe('GET BY ID', () => {
  it('Should return the contact with the given id', () => {
    return request(app)
      .get('/api/contacts/1')
      .expect([
        {
          id: '1',
          name: 'Valeri Obi',
          email: 'obichiz@gmail.com',
          mobile: '0818-384-0096',
          company: 'okon and sons',
          isBlocked: 'false'
        }
      ]);
  });

  it('Should return member not found if a wrong id is passed in', () => {
    return request(app)
      .get('/api/contacts/xx')
      .expect({ msg: 'Member not Found' });
  });
});

describe('POST', () => {
  it('Should return the contact', () => {
    const userObjectToBePosted = {
      name: 'Sharon Stone',
      email: 'sharon@gmail.com',
      mobile: '0803-668-7418',
      company: 'we are here',
      isBlocked: 'false'
    };
    return request(app)
      .post('/api/contacts')
      .send(userObjectToBePosted)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('PUT', () => {
  //SHOULD update the member with the given id
  //should return member not found if a wrong id is passed in
  it('should return the updated member', () => {
    return request(app)
      .put('/api/contacts/3')
      .send({ name: 'Updated Johnson Okoro' })
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'contact was updated',
        contact: {
          id: '3',
          name: 'Updated Johnson Okoro',
          email: 'okorojohnson@gmail.com',
          mobile: '0818-001-0001',
          company: 'okoro and sons',
          isBlocked: 'false'
        }
      });
  });

  it('should be able to block and unblock contact', () => {
    return request(app)
      .put('/api/contacts/3')
      .send({ isBlocked: 'true' })
      .expect('Content-Type', /json/)
      .expect(200, {
        msg: 'contact was updated',
        contact: {
          id: '3',
          name: 'Updated Johnson Okoro',
          email: 'okorojohnson@gmail.com',
          mobile: '0818-001-0001',
          company: 'okoro and sons',
          isBlocked: 'true'
        }
      });
  });
});

describe('DELETE', () => {
  it('should return, the contact array, with the deleted member missing', () => {
    return request(app)
      .delete('/api/contacts/1')
      .expect(200, [
        {
          id: '2',
          name: 'Anita Obi',
          email: 'anitachiz@gmail.com',
          mobile: '0818-000-0000',
          company: 'anita and sons',
          isBlocked: 'false'
        },
        {
          id: '3',
          name: 'Johnson Okoro',
          email: 'okorojohnson@gmail.com',
          mobile: '0818-001-0001',
          company: 'okoro and sons',
          isBlocked: 'false'
        },
        {
          id: '59492983-246d-4808-af0f-9be014a4ce62',
          name: 'xxxxxxn',
          email: 'xxxxxx@gmail.com',
          mobile: '0818-384-0096',
          isBlocked: 'false'
        },
        {
          id: 'abad3d6c-456e-4a7b-9d7d-6c56e4910638',
          name: 'Sharon Stone',
          email: 'sharon@gmail.com',
          mobile: '0803-668-7418',
          isBlocked: 'false'
        }
      ]);
  });

  it('should return, 404, when there is no contact with that', () => {
    return request(app)
      .delete('/api/contacts/118136af-98af-4752-a3fa-7e5560d6ee45')
      .expect(400, { msg: 'Member not Found' });
  });
});
