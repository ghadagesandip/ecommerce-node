import express from 'express';

import * as categoryCtrl from './categoryCtrl';

const router = express.Router({ caseSensitive: true });

router.get('/category', categoryCtrl.index);
router.post('/category', categoryCtrl.add);
router.put('/category/:id', categoryCtrl.edit);
router.delete('/category/:id', categoryCtrl.edit);

export default router;