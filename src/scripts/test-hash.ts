import * as dotenv from 'dotenv';
dotenv.config();

import { hashPassword, comparePassword } from '../common/utils';

async function test() {
    console.log('--- Password Hash Test ---');
    const password = 'mahdi.mi.76';
    console.log(`Testing password: ${password}`);

    try {
        // 1. Hash the password
        console.log('Hashing...');
        const hashed = await hashPassword(password);
        console.log(`Generated Hash: ${hashed}`);

        // 2. Compare the password with the hash
        console.log('Comparing...');
        const isMatch = await comparePassword(password, hashed);
        console.log(`Match Result: ${isMatch}`); // Should be true

        if (isMatch) {
            console.log('✅ Hashing mechanism is working correctly.');
        } else {
            console.error('❌ Hashing mechanism FAILED.');
        }

    } catch (error) {
        console.error('Error during test:', error);
    }
}

test();
