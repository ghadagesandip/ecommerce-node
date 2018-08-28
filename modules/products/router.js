import express from 'express';
import * as productCtrl from './productCtrl';

const router = express.Router({caseSensitive:true});

router.get('/products', productCtrl.index);
router.post('/products', productCtrl.add);

export default router;