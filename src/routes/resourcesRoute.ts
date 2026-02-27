import { Router } from 'express';
import { CreateResource } from '../controllers/createResource';
import { getAllResources } from '../controllers/getAllResource';
import { getRecource } from '../controllers/getRecource';
import { createBooking } from '../controllers/createBooking';
import { getAllResourceBookings } from '../controllers/getAllRecourceBookins';
import { updateBookingStatus } from '../controllers/updateBookingStatus';

export const resourcesRoute = Router();

resourcesRoute.post('/create', CreateResource);
resourcesRoute.get('/all', getAllResources);
resourcesRoute.get('/:id', getRecource);
resourcesRoute.post('/:id/booking', createBooking);
resourcesRoute.get('/:id/bookings', getAllResourceBookings);
resourcesRoute.patch('/bookings/:id', updateBookingStatus);
