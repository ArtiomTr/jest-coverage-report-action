const realPath = jest.requireActual('path');

export const relative = jest.fn(realPath.relative);
