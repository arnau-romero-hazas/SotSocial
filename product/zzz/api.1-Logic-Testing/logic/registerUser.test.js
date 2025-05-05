import { registerUser } from './registerUser.js';

try {
    registerUser('Panecillo', 'pa@necillo.com', 'PAN', '123123123')
} catch (error) {
    console.error(error)
}