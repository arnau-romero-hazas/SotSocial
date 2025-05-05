import { registerUser } from './registerUser.js';

try {
    registerUser('Arnau Romero', 'arnau@romero.com', 'Arnau', '123123123')
} catch (error) {
    console.error(error)
}