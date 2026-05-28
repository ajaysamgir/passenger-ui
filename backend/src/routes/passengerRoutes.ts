import { Router } from 'express';
import PassengerController from '../controllers/PassengerController';
import Database from '../database/Database';

export function createPassengerRoutes(db: Database): Router {
  const router = Router();
  const controller = new PassengerController(db);

  router.post('/passenger/validate', (req, res) => controller.validateAndAddPassenger(req, res));
  router.get('/passengers', (req, res) => controller.getPassengers(req, res));
  router.put('/passenger/:id', (req, res) => controller.updatePassenger(req, res));
  router.delete('/passenger/:id', (req, res) => controller.deletePassenger(req, res));
  router.delete('/passengers', (req, res) => controller.deleteAllPassengers(req, res));

  return router;
}

export default createPassengerRoutes;
