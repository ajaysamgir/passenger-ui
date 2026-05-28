import dotenv from 'dotenv';
import createApp from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const app = await createApp();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
