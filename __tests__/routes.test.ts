import request from 'supertest';
//import app from '../src/routes/api';
import app from '../src/app';

// describe('Api Routes', () => {
//   test('/home returns hello world', () => {
//     return request(app)
//       .get('/api/home')
//       .expect(200, { data: 'Hello World' });
//   });
// });

describe('api routers', () => {
  it('shoul return everything in the data base', () => {
    return request(app)
      .get('/api/contacts')
      .expect(200, [
        {
          id: '1',
          name: 'pulling chichi out booishzyn',
          email: 'yyyyx@gmail.com',
          phone: '0818-384-0096',
          company: 'we are themo',
          isBlocked: 'false'
        },
        {
          id: '2',
          name: 'Ai Obi',
          email: 'anitachiz@gmail.com',
          phone: '0818-000-0000',
          company: 'anita and sons',
          isBlocked: 'false'
        },
        {
          id: '3',
          name: 'Johnson Okoro',
          email: 'okorojohnson@gmail.com',
          phone: '0818-001-0001',
          company: 'okoro and sons',
          isBlocked: 'false'
        },
        {
          id: 'e1872523-bd32-4400-a3f3-b09fbf347c44',
          name: 'hello booishzyn',
          email: 'yyyyx@gmail.com',
          mobile: '0818-384-0096',
          isBlocked: 'false',
          company: 'we are themo'
        },
        {
          id: '97b5667f-33f0-44a3-a6e8-4b75a88e7b0c',
          name: 'rukee ojigbo',
          email: 'yyyyx@gmail.com',
          mobile: '0818-384-0096',
          isBlocked: false
        },
        {
          id: '0795bf27-3d99-4b0c-999d-3189ced97a19',
          name: 'ochuko ojigbo',
          email: 'ochuko@gmail.com',
          mobile: '0818-384-0096',
          isBlocked: false
        },
        {
          id: '118136af-98af-4752-a3fa-7e5560d6ee45',
          name: 'Linda Ikeji',
          email: 'lindaikeji@gmail.com',
          mobile: '0818-384-0096',
          isBlocked: false
        }
      ]);
  });
});

describe('it should return hello world', () => {
  it('should return hello world', () =>{
return request(app).get('/dummy').expect('i worked')
  })
})