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
        }
      ]);
  });
});

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

  it('Should return the contact', () => {
    const incompleteUserObject = {
      email: 'sharon@gmail.com',
      company: 'we are here',
      isBlocked: 'false'
    };
    return request(app)
      .post('/api/contacts')
      .send(incompleteUserObject)
      .expect('Content-Type', /json/)
      .expect(404, [
        {
          message: '"name" is required',
          path: ['name'],
          type: 'any.required',
          context: { key: 'name', label: 'name' }
        },
        {
          message: '"mobile" is required',
          path: ['mobile'],
          type: 'any.required',
          context: { key: 'mobile', label: 'mobile' }
        }
      ]);
  });
});

describe('PUT', () => {
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

  it('should be able to block and unblock contact', () => {
    return request(app)
      .put('/api/contacts/xxjkas;djkfs;df')
      .send({ name: 'Wesley Snipes' })
      .expect('Content-Type', /json/)
      .expect(400, { msg: 'Member not Found' });
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

//'/api/contacts/blocked'
describe('BLOCKED CONTACTS', () => {
  it('should return the contacts with isBlocked is false', () => {
    return request(app)
      .get('/api/blocked')
      .expect(200, [
        {
          id: '3',
          name: 'Updated Johnson Okoro',
          email: 'okorojohnson@gmail.com',
          mobile: '0818-001-0001',
          company: 'okoro and sons',
          isBlocked: 'true'
        }
      ]);
  });
});

describe('HOMEPAGE', () => {
  it('should return contact api as title', () => {
    return request(app)
      .get('/')
      .expect(
        '<!DOCTYPE html><html><head><title>Contact Api</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Contact Api</h1><p>Welcome to Contact Api</p></body></html>'
      );
  });
});
