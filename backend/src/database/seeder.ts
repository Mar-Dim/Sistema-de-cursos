// src/database/seeder.ts

import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  // Creamos un contexto de aplicación "headless" (sin servidor HTTP).
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  
  const seeder = appContext.get(SeederService);
  try {
    
    await seeder.runSeed();
  } catch (error) {
    console.error('Seeding process failed!');
    console.error(error);
    process.exit(1); 
  } finally {
    await appContext.close();
    process.exit(0); 
  }
}

bootstrap();