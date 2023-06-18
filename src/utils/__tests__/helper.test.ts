import { getStatus } from "../helper";

describe('getStatus', () => {
  it('should return the correct status', () => {
    expect(getStatus(true)).toBe('completed');
    expect(getStatus(false)).toBe('pending');
  });
})
