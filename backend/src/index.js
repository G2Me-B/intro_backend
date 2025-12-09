import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app';
dotenv.config({
    path: './.env'
});

const startServer = async() => {
    try {
        await connectDB();

        app.on('error', (error) => {
            console.error(`\n Error: ${error.message}`);
            process.exit(1);
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`\n Server is running on port: ${process.env.PORT || 8000}`);
        })
    } catch (error) {
        
    }
}