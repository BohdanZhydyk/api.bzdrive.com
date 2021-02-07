const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const { chkToken } = require('./functions/chkToken')

const { news }	= require('./routes/news')
const { start } = require('./routes/start')
const { auth }	= require('./routes/auth/auth')


const app = express()

app.use( cors() )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res)=>{ res.send('error! no file index.html') })

app.post('/chkToken', (req, res)=>{ chkToken(req, res) })

app.get('/news', (req, res)=>{ news(req, res) })

app.post('/start', (req, res)=>{ start(req, res) })

app.post('/auth',
	[
		check('login').isLength({ min:4, max:16 }).withMessage(' - musi zawierać od 4 do 16 znaków!'),
		check('login').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
		check('email').isEmail().withMessage(' - wprowadzono nieprawidłowy e-mail!'),
		check('email').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
		check('login').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
		check('pass')	.isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
		check('pass')	.isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
		check('pass')	.isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
		check('pass1').isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
		check('pass1').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
		check('pass1').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
		check('pass2').isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
		check('pass2').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
		check('pass2').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
	],
	(req, res) => {
		auth(req, res)
})

app.listen(5000, function(){
	console.log('API app started on port 5000')
})
