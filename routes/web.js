const express=require('express');
const FrontController = require('../controllers/FrontController');
const StudentController = require('../controllers/StudentController');
const AdminController=require('../controllers/admin/Admincontroller.js')
const BlogController = require('../controllers/admin/BlogController.js')
const CategoryController = require('../controllers/admin/CategoryController.js')
const ContactController = require('../controllers/admin/ContactController.js')
const AboutController = require('../controllers/admin/AboutController.js')
const router = express.Router();
const admin_auth=require('../middleware/auth')


//frontcontroller
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/login',FrontController.login)
router.get('/blog',FrontController.blog)
router.get('/readmore/:id',FrontController.readmore)
router.get('/register',FrontController.adminregister)
router.post('/adminregister',FrontController.admininsert)
router.post('/verify_login',FrontController.verifylogin)
router.get('/logout',admin_auth,FrontController.logout)

//admin controller routes
router.get('/admin/dashboard',admin_auth,AdminController.dashboard)

//admin blog controller
router.get('/admin/blogdisplay',admin_auth,BlogController.blogdisplay)
router.post('/bloginsert',admin_auth,BlogController.bloginsert)
router.get('/admin/blogview/:id',admin_auth,BlogController.blogview)
router.get('/admin/blogedit/:id',admin_auth,BlogController.blogedit)
router.post('/blogupdate/:id',admin_auth,BlogController.blogupdate)
router.get('/admin/blogdelete/:id',admin_auth,BlogController.blogdelete)
//admin category controller
router.get('/admin/category',admin_auth,CategoryController.category)
router.post('/categoryinsert',admin_auth,CategoryController.categoryinsert)
router.get('/admin/categoryview/:id',admin_auth,CategoryController.categoryview)
router.get('/admin/categoryedit/:id',admin_auth,CategoryController.categoryedit)
router.post('/categoryupdate/:id',admin_auth,CategoryController.categoryupdate)
router.get('/admin/categorydelete/:id',admin_auth,CategoryController.categorydelete)
//admin contact controller
router.get('/admin/contact',admin_auth,ContactController.contactview)
router.post('/contactinsert',admin_auth,ContactController.contactinsert)

//admin about controller
router.get('/admin/about',admin_auth,AboutController.aboutdisplay)
router.get('/admin/aboutedit/:id',admin_auth,AboutController.aboutedit)
router.post('/aboutupdate/:id',admin_auth,AboutController.aboutupdate)


module.exports=router;
