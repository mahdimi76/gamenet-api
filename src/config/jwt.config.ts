export const jwtConfig = () => ({
    secret: process.env.JWT_SECRET || 'your-super-secret-key-here',
    expiresIn: '7d' as const,
});
