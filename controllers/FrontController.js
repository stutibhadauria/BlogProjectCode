const adminModel = require("../models/admin");
const BlogModel = require("../models/Blog");
const categoryModel = require("../models/Category");
const contactModel = require("../models/contact");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class FrontController {
    static home = async (req, res) => {
        // res.send("Home page")
        const data = await BlogModel.find().limit(6).sort({ _id: -1 })
        // admin
        res.render('home', { d: data });
    }
    static about = async (req, res) => {
        res.render('about');
    }
    static contact = async (req, res) => {
        res.render('contact')
    }
    static login = async (req, res) => {
        res.render('login', { message: req.flash("success"), message1: req.flash("error") });
    }
    static adminregister = async (req, res) => {
        res.render('register', { message: req.flash("error") })
    }
    static admininsert = async (req, res) => {
        try {
            //   console.log(req.body)
            const { name, email, password, cpassword } = req.body
            const admin = await adminModel.findOne({ email: email })
            if (admin) {
                req.flash('error', 'email already exist')
                res.redirect('/register')
            }
            else {
                if (name && email && password && cpassword) {
                    if (password == cpassword) {
                        try {
                            const hashpassword = await bcrypt.hash(password, 10)
                            const result = new adminModel({
                                name: name,
                                email: email,
                                password: hashpassword
                            })
                            await result.save()
                            req.flash("success", "registration succesfully,please login ")
                            res.redirect('/login')
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        req.flash('error', 'password and confirm password does not match')
                        res.redirect('/register')
                    }
                } else {
                    req.flash('error', 'all field are required')
                    res.redirect('/register')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    static blog = async (req, res) => {
        const data = await BlogModel.find().sort({ _id: -1 })
        res.render('blog', { d: data })
    }
    static readmore = async (req, res) => {
        try {
            const category = await categoryModel.find()
            const recentblog = await BlogModel.find().sort({ _id: -1 }).limit(6)
            const result = await BlogModel.findById(req.params.id)
            console.log(result)
            res.render("readmore", { r: result, recentblog: recentblog, cat: category })
        } catch (err) {
            console.log(err)
        }
    }
    static verifylogin = async (req, res) => {
        try {
            //  console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const admin = await adminModel.findOne({
                    email: email
                })
                if (admin != null) {
                    const ismatched = await bcrypt.compare(password, admin.password)
                    if (ismatched) {
                        //token generates
                        const token = jwt.sign({ id: admin._id }, 'stuti_software_engineer')
                        // console.log(token)
                        res.cookie('token', token)


                        res.redirect('/admin/dashboard')
                    } else {
                        req.flash('error', 'Email and password are not same,please login again!!')
                        res.redirect('/login')
                    }
                } else {
                    req.flash('error', 'you are not registered user!!')
                    res.redirect('/login')
                }
            }
            else {
                req.flash('error', 'all field are required')
                res.redirect('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }
    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/login')
        }
        catch (err) {
            console.log(err);
        }

    }
}
module.exports = FrontController