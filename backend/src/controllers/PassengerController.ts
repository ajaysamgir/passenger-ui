import { Request, Response } from 'express';
import Database from '../database/Database';
import ValidationService from '../services/ValidationService';

export class PassengerController {
  constructor(private db: Database) {}

  async validateAndAddPassenger(req: Request, res: Response): Promise<void> {
    try {
      const errors = await ValidationService.validateAndCheckDuplicate(
        req.body,
        async (passport: string, excludeId?: string) => this.db.checkDuplicatePassport(passport, excludeId ? parseInt(excludeId) : undefined)
      );

      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          errors: errors.map(e => e.message)
        });
        return;
      }

      const id = await this.db.insertPassenger(req.body);
      res.status(200).json({
        success: true,
        message: 'Passenger validated successfully',
        data: { id }
      });
    } catch (error: any) {
      console.error('Error adding passenger:', error);
      res.status(500).json({
        success: false,
        errors: ['Internal server error']
      });
    }
  }

  async getPassengers(req: Request, res: Response): Promise<void> {
    try {
      const passengers = await this.db.getPassengers();
      res.status(200).json({
        success: true,
        data: passengers
      });
    } catch (error: any) {
      console.error('Error fetching passengers:', error);
      res.status(500).json({
        success: false,
        errors: ['Internal server error']
      });
    }
  }

  async updatePassenger(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const passenger = await this.db.getPassengerById(parseInt(id));

      if (!passenger) {
        res.status(404).json({
          success: false,
          errors: ['Passenger not found']
        });
        return;
      }

      const errors = await ValidationService.validateAndCheckDuplicate(
        { ...passenger, ...req.body },
        async (passport: string, excludeId?: string) => this.db.checkDuplicatePassport(passport, parseInt(id))
      );

      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          errors: errors.map(e => e.message)
        });
        return;
      }

      await this.db.updatePassenger(parseInt(id), req.body);
      res.status(200).json({
        success: true,
        message: 'Passenger updated successfully'
      });
    } catch (error: any) {
      console.error('Error updating passenger:', error);
      res.status(500).json({
        success: false,
        errors: ['Internal server error']
      });
    }
  }

  async deletePassenger(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const passenger = await this.db.getPassengerById(parseInt(id));

      if (!passenger) {
        res.status(404).json({
          success: false,
          errors: ['Passenger not found']
        });
        return;
      }

      await this.db.deletePassenger(parseInt(id));
      res.status(200).json({
        success: true,
        message: 'Passenger deleted successfully'
      });
    } catch (error: any) {
      console.error('Error deleting passenger:', error);
      res.status(500).json({
        success: false,
        errors: ['Internal server error']
      });
    }
  }

  async deleteAllPassengers(req: Request, res: Response): Promise<void> {
    try {
      await this.db.deleteAllPassengers();
      res.status(200).json({
        success: true,
        message: 'All passengers deleted successfully'
      });
    } catch (error: any) {
      console.error('Error deleting all passengers:', error);
      res.status(500).json({
        success: false,
        errors: ['Internal server error']
      });
    }
  }
}

export default PassengerController;
