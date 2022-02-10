import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvaliableController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadImages = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    uploadImages.array('images'),
    createCarController.handle
);

carsRoutes.get('/avaliable', listAvaliableController.handle);

carsRoutes.post(
    '/:id/specifications',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.post(
    '/:id/images',
    ensureAuthenticated,
    ensureAdmin,
    uploadCarImagesController.handle
);

export { carsRoutes };
