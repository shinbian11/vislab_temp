const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { GET, DELETE, POST, PUT } = require('./common/methods');
const { db } = require('../db');

router.post('/c/one', upload.none(), (req, res) => {
  const { semesters, ...courseInfo } = req.body; //const { semesters, ...courseInfo } .. 이거는 어떤 기준이지..? page 마다 다르게 설정해야 하나?
  db.courses.create(courseInfo)
    .then((course) => {
      console.log(course);
      console.log(semesters);
    });
  res.send(req.body);
});


//routes : 각 동작들의 정의를 내리는 부분. 함수의 내용(함수가 작동하는 실질적은 코드의 내용)은 db/repos에 있다

//POST(router, '/c/one', upload.none(), (req, res) => { db.courses.post();}) 
GET(router, '/r/all', () => db.courses.readAll());
GET(router, '/r/count', () => db.courses.readCount());
GET(router, '/r/id/:id', (req) => db.courses.readById(req.params.id));

//PUT(router,) ..여기 url은 어떤 기준으로 정하지?

DELETE(router, '/d/id/:id', (req) => db.courses.deleteById(req.params.id));

module.exports = router;
