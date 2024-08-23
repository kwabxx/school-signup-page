const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentportal',
    connectionLimit: 10
});

app.use(express.json());

app.post('/StudentSignUp', (req, res) => {
    const { Student_ID, Student_Email, New_Password, Enter_NewPassword, Telephone } = req.body;

    // Check if all required fields are filled
    if (!Student_ID || !Student_Email || !New_Password || !Enter_NewPassword || !Telephone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if passwords match
    if (New_Password !== Enter_NewPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // SQL insert query
    const sql = 'INSERT INTO studentsignup (Student_ID, Student_Email, New_Password, Telephone) VALUES (?, ?, ?, ?)';

    pool.query(sql, [Student_ID, Student_Email, New_Password, Telephone], (err, result) => {
        if (err) {
            console.error('Error inserting into studentsignup:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).send('Signup Successful');
    });
});

app.post('/studentlogin', (req, res) => {
    const { Student_ID, New_Password } = req.body;

    const sql = 'SELECT * FROM studentsignup WHERE Student_ID = ? AND New_Password = ?';
    pool.query(sql, [Student_ID, New_Password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            res.status(400).send('Invalid Student ID or Password');
        } else {
            res.status(200).send('Login Successful');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





// const express = require('express');
// const mysql = require('mysql');
// // const app = express();
// const port = 3000;

// const {
//     createPool
// } = require("mysql")

// // const app = express();
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Bitches001',
//     database: 'studentportalform',
//     connectionLimit: 10
// });


// // pool.query('select * from studentsignup where id = ? ', ['Amina045'], (err, result) => {
// //     if (err) {
// //         return console.log(err)
// //     }
// //     return console.log(result)
// // })


// pool.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err.stack);
//       return;
//     }
//     console.log('Connected to database:', connection.threadId );
//   });

// app.use(express.json());

// app.post('/studentsignup', (req, res) => {
//     const {Student_ID, Student_Email, New_Password, Enter_NewPasswd, Telephone} = req.body

//     if(!Student_ID || !Student_Email || !New_Password || !Enter_NewPasswd || !Telephone){
//         return res.status(400).json({error: 'All fields are reqquired'})
//     }
// })

// app.post('/studentsignup', (req, res) => {
//     const { Student_ID, Student_Email, New_Password, Enter_NewPassword, Telephone } = req.body;
//     const sql = db.run ('INSERT INTO studentsignup (Student_ID varchar(10), Student_Email varchar(50), New_Password varchar(20), Enter_NewPassword varchar(20), Telephone int) VALUES (NULL, ?, ?, ?, ?)');

//     pool.query(sql, [Student_ID, Student_Email, New_Password, Enter_NewPassword, Telephone], (err, result) => {
//         if (err) {
//             console.error('Error inserting into studentsignup:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.status(201).send('Signup Successful');
//     });
// });

// app.post('/studentlogin', (req, res) => {
//     const {Student_ID, New_Password} = req.body;

//     const sql =  'select * from studentsignup where student_ID = ? and New_Password = ?'
//     pool.query(sql, [Student_ID, New_Password], (err, results) => {
//         if (err) {
//             console.error('Error logging in:', err)
//             return res.status(500).json({error: 'Internal Server Error '});
//         }

//         if(results.length === 0){
//             res.status(400).send('Invalid Student ID or password')            
//         } else {
//             res.status(200).send('Login Sucessfull');
//         }
//     }); 
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000')
// })



// app.post('/teachersignup', (req, res) => {
//     const {Teacher_ID, Teacher_Email, New_Passwd, Enter_NewPasswd, PhoneNumber = req.body

//     if(!Teacher_ID_ID || !Teacher_Email || !New_Passwd || !Enter_NewPasswd || !PhoneNumber){
//         return res.status(400).json({error: 'All fields are reqquired'})
//     }
// })

// app.post('/teachersignup', (req, res) => {
//     const { Teacher_ID, Teacher_Email, New_Passwd, Enter_NewPasswd, PhoneNumber } = req.body;
//     const sql = 'INSERT INTO studentsignup (Student_ID, Student_Email, New_Password, Enter_NewPasswd, Telephone) VALUES (?, ?, ?, ?, ?)';

//     connection.query(sql, [Teacher_ID, Teacher_Email, New_Passwd, Enter_NewPasswd, Telephone], (err, result) => {
//         if (err) {
//             console.error('Error inserting into studentsignup:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.status(201).send('Signup Successful');
//     });
// });

// app.post('/teacherlogin', (req, res) => {
//     const {Teacher_ID, New_Password} = req.body;

//     const sql =  'select * from studentsignup where Teacher_ID = ? and New_Password = ?'
//     connection.query(sql, [Teacher_ID, New_Password], (err, results) => {
//         if (err) {
//             console.error('Error logging in:', err)
//             return res.status(500).json({error: 'Internal Server Error '});
//         }

//         if(results.length === 0){
//             res.status(400).send('Invalid Student ID or password')            
//         } else {
//             res.status(200).send('Login Sucessfull');
//         }
//     }); 
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000')
// })




// connection.query(
//     'INSERT INTO studentsignup(Student_ID, Student_Email, New_Password, Enter_NewPasswd, Telephone) values(?, ?, ?, ?, ?)'
//     [Student_ID, Student_Email, New_Password, Enter_NewPasswd, Telephone],
//     (err, result) => {
//         if(err){
//             connection.rollback(() =>{
//                 connection.release();
//                 console.error('Error inserting into studentsignup', err);
//                 return res.status(500).json({error: 'Internal Server Error'});
//             })
//         }

//         const Student_ID = result.insertId

//         connection.query(


//         )
//         connection.commit((err) => {
//             if (err) {
//                 connection.rollback(() => {
//                     connection.release();
//                     console.error('Error committing transaction')
//                 }
//             )
//             }
//         })


//     }

// )

