import { Identified } from '../../types/Identified';

export function moveUserBetweenSocials<
  F extends Identified,
  T extends Identified
>(
  userId: number,
  from: F[],
  to: T[]
): {
  from: F[];
  to: (T | F)[];
} {
  const existingUser = from.find((user) => user.id === userId);

  if (!existingUser) {
    return {
      from,
      to,
    };
  }

  const filteredFrom = from.filter((user) => user.id !== userId);
  const replenishedTo = [existingUser, ...to];

  return {
    from: filteredFrom,
    to: replenishedTo,
  };
}
