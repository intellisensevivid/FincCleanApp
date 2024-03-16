const express = require('express')
const router = express.Router()


const adminMiddleware = require('../middleware/adminMiddleware')
const schemaValidator = require('../middleware/schemaValidator')
const { verifyToken } = require('../middleware/authMiddleware')
const { getAllPayroll, updatePayroll, deletePayroll, createPayroll, queryPayroll } = require('../controllers/payrollController')


router.get('/', verifyToken, adminMiddleware, getAllPayroll)
router.get('/query', queryPayroll);
router.post('/', verifyToken, adminMiddleware, createPayroll)
router.get('/:payrollId', verifyToken, adminMiddleware, getSiglePayroll)
router.patch('/:payrollId', verifyToken, adminMiddleware, updatePayroll)
router.delete('/:payrollId', verifyToken, adminMiddleware, deletePayroll)