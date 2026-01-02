import * as bcrypt from 'bcryptjs';

/**
 * هش کردن رمز عبور
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * مقایسه رمز عبور
 */
export async function comparePassword(
    password: string,
    hashedPassword: string,
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}
