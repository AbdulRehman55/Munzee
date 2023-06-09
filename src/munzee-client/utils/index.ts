export function getAvatarUrl(userId: number) {
  userId = parseInt(userId + "", 10);
  const base36userId = userId.toString(36);
  return `https://munzee.global.ssl.fastly.net/images/avatars/ua${base36userId}.png`;
}

export function getPinUrl(logo: string) {
  return `https://munzee.global.ssl.fastly.net/images/pins/${logo}.png`;
}
