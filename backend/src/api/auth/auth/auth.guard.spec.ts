import { UserSession } from '../user-session/user-session';
import { AuthGuard } from './auth.guard';
import { sign as jwtSign } from 'jsonwebtoken';

function generateExectutionContext(token) {
  return {
    switchToHttp() {
      return {
        getRequest() {
          return {
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
        },
        getNext() {
          return {};
        },
        getResponse() {
          return {};
        },
      };
    },
  };
}

describe('AuthGuard', () => {
  const userSession = new UserSession();
  const authMiddleware = new AuthGuard(userSession);
  const user = 'testUser';

  it('should be defined', () => {
    expect(authMiddleware).toBeDefined();
  });

  it('should be defined', () => {
    expect(authMiddleware).toBeDefined();
  });

  const validToken = jwtSign(
    {
      user,
    },
    process.env.JWT_SECRET ?? 'test',
    { expiresIn: '1h' },
  );

  it('should validate jwt', () => {
    expect(() =>
      authMiddleware.canActivate(generateExectutionContext(validToken) as any),
    ).not.toThrow();
  });

  it('should set email in user session instance', () => {
    authMiddleware.canActivate(generateExectutionContext(validToken) as any);
    expect(userSession.user).toBe(user);
  });

  it('should not validate jwt', () => {
    const token = jwtSign(
      {
        user,
        iat: Math.floor(Date.now() / 1000) - 30, // create expired jwt
      },
      process.env.JWT_SECRET ?? 'test',
      { expiresIn: '0s' }, // create expired jwt
    );
    expect(() =>
      authMiddleware.canActivate(generateExectutionContext(token) as any),
    ).toThrow();
  });
});
