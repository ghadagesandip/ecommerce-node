import express from 'express';

import * as categoryCtrl from './categoryCtrl';

const router = express.Router({ caseSensitive: true });

router.get('/category', categoryCtrl.index);
router.get('/category/products', categoryCtrl.getCategoryWithProducts);

router.get('/category/:id', categoryCtrl.getCategoryById);
router.post('/category', categoryCtrl.add);
router.put('/category/:id', categoryCtrl.edit);
router.delete('/category/:id', categoryCtrl.remove);


router.post('/category/:categoryId/product/:productId', categoryCtrl.addProductRef);

export default router;