import { Users } from './users';
import { ErrorMessages } from './errorMessages';

export const NegativeLoginCases = [
  {
    testName: 'locked user',
    username: Users.locked.username,
    password: Users.locked.password,
    expectedError: ErrorMessages.lockedUser
  },
  {
    testName: 'empty username',
    username: '',
    password: Users.standard.password,
    expectedError: ErrorMessages.noUsername
  },
  {
    testName: 'empty password',
    username: Users.standard.username,
    password: '',
    expectedError: ErrorMessages.noPassword
  },
  {
    testName: 'invalid credentials',
    username: 'invalid_user',
    password: 'invalid_password',
    expectedError: ErrorMessages.invalidCredentials
  }
];