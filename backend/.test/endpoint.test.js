const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js');
const User = require('../models/user');
const card = require('../models/card.js');

const request = supertest(app);

// USERS DATA
let token;
let selectedUser;

const validUser = {
  email: 'test@test.com',
  password: 'test1234',
};

const invalidFieldsUser = {
  email: '',
  password: '',
};

const invalidEmail = {
  email: 'tst@test.com',
  password: 'test1234',
};
const invalidPassword = {
  email: 'test@test.com',
  password: 'tst1234',
};

// CARDS DATA

const validCard = {
  name: 'Test',
  link: 'https://images.unsplash.com/photo-1721697310377-1a70ae366cb2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

let createdCard;

afterAll(async () => {
  await card.findByIdAndDelete(createdCard._id);
  await User.findOneAndDelete(validUser.email);
  await User.findOneAndDelete(invalidFieldsUser.email);
  await mongoose.connection.close();
});

// USERS ROUTES

describe('POST "/signup"', () => {
  it('#Success - should create a new user and respond with token and status 201', async () => {
    const response = await request.post('/signup').send(validUser).set('Accept', 'application/json');
    const { body, header, status } = response;
    const newUser = body;
    expect(header['content-type']).toMatch(/json/);
    expect(status).toBe(201);
  });
  it('#Error - should return 409 when user already exists', async () => {
    const response = await request.post('/signup').send(validUser).set('Accept', 'application/json');
    const { status, body } = response;
    expect(body.message).toBe('The provided key already exists.');
    expect(status).toBe(409);
  });
  it('#Error - should return 400 when email and password fields are invalid', async () => {
    const response = await request.post('/signup').send(invalidFieldsUser).set('Accept', 'application/json');
    const { status, body } = response;
    expect(typeof body.message).toBe('string');
    expect(status).toBe(400);
  });
});

describe('POST "/signin"', () => {
  it('#Success - should sign in the user and return token with status 200', async () => {
    const response = await request.post('/signin').send(validUser).set('Accept', 'application/json');
    const { body, header, status } = response;
    token = body.token;
    expect(body).toHaveProperty('token');
    expect(header['content-type']).toMatch(/json/);
    expect(status).toBe(200);
  });
  it('#Error - should return 401 when email is incorrect', async () => {
    const response = await request.post('/signin').send(invalidEmail).set('Accept', 'application/json');
    const { status } = response;
    expect(status).toBe(401);
    expect(response.body.message).toBe('Email or password is incorrect.');
  });
  it('#Error - should return 401 when password is incorrect', async () => {
    const response = await request.post('/signin').send(invalidPassword).set('Accept', 'application/json');
    const { status } = response;
    expect(status).toBe(401);
    expect(response.body.message).toBe('Email or password is incorrect.');
  });
});

describe('GET "/users"', () => {
  it('#Success - should return list of users with status 200', async () => {
    const response = await request
      .get('/users')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    expect(header['content-type']).toMatch(/json/);
    body.forEach((card) => {
      const { _id, name, about, avatar, email } = card;
      selectedUser = card;
      expect(typeof _id).toBe('string');
      expect(typeof name).toBe('string');
      expect(typeof about).toBe('string');
      expect(typeof avatar).toBe('string');
      expect(typeof email).toBe('string');
    });
    expect(status).toBe(200);
  });
});

describe('GET "/users/:userId"', () => {
  it('#Success - should return user data by ID with status 200', async () => {
    const response = await request
      .get(`/users/${selectedUser._id}`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

describe('GET "/users/me"', () => {
  it('#Success - should return current authenticated user data with status 200', async () => {
    const response = await request
      .get('/users/me')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

describe('PATCH "/users/me"', () => {
  const updateData = {
    name: 'John',
    about: 'Dev',
  };
  it('#Success - should update name and about fields of authenticated user with status 200', async () => {
    const response = await request
      .patch('/users/me')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(updateData);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

describe('PATCH "/users/me/avatar"', () => {
  const updateData = {
    avatar:
      'https://images.unsplash.com/photo-1721697310377-1a70ae366cb2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };
  it('#Success - should update avatar field of authenticated user with status 200', async () => {
    const response = await request
      .patch('/users/me/avatar')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(updateData);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

// CARDS ROUTES

describe('POST "/cards"', () => {
  it('#Success - should create a new card and return card data with status 201', async () => {
    const response = await request
      .post('/cards')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(validCard);
    const { header, status, body } = response;
    createdCard = body;
    const { name, link, owner, likes, _id, createdAt } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof name).toEqual('string');
    expect(typeof link).toEqual('string');
    expect(typeof owner).toEqual('string');
    expect(likes).toHaveLength(0);
    expect(typeof _id).toEqual('string');
    expect(typeof createdAt).toEqual('string');
    expect(status).toBe(201);
  });
});

describe('GET "/cards"', () => {
  it('#Success - should return cards list with status 200', async () => {
    const response = await request
      .get('/cards')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { body, header, status } = response;
    expect(header['content-type']).toMatch(/json/);
    body.forEach((card) => {
      const { name, link, owner, likes, _id, createdAt } = card;
      expect(typeof name).toEqual('string');
      expect(typeof link).toEqual('string');
      expect(typeof owner).toEqual('string');
      expect(likes).toHaveLength(0);
      expect(typeof _id).toEqual('string');
      expect(typeof createdAt).toEqual('string');
    });
    expect(status).toBe(200);
  });
});

describe('PUT "/:cardId"', () => {
  it('#Success - should add user ID to the "likes" array property of the card and return updated card with status 200', async () => {
    const response = await request
      .put(`/cards/${createdCard._id}/likes`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { name, link, owner, likes, _id, createdAt } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof name).toEqual('string');
    expect(typeof link).toEqual('string');
    expect(typeof owner).toEqual('string');
    expect(likes).toHaveLength(1);
    expect(typeof _id).toEqual('string');
    expect(typeof createdAt).toEqual('string');
    expect(status).toBe(200);
  });
});

describe('DELETE "/:cardId/likes"', () => {
  it('#Success - should remove user ID from "likes" array property of the card and return updated card with status 200', async () => {
    const response = await request
      .delete(`/cards/${createdCard._id}/likes`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { name, link, owner, likes, _id, createdAt } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof name).toEqual('string');
    expect(typeof link).toEqual('string');
    expect(typeof owner).toEqual('string');
    expect(likes).toHaveLength(0);
    expect(typeof _id).toEqual('string');
    expect(typeof createdAt).toEqual('string');
    expect(status).toBe(200);
  });
});

describe('DELETE "/:cardId"', () => {
  it('#Success - should delete card by ID and return status 200', async () => {
    const response = await request
      .delete(`/cards/${createdCard._id}/likes`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { status } = response;
    expect(status).toBe(200);
  });
});
