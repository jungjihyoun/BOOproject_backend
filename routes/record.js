var express = require("express");
var router = express.Router();
const shortid = require("shortid");
const maria = require("../database/connect/maria");

const multer = require("multer");

// [record]  글 쓰기
router.post("/post/:user_id/:subcharacter_id", function (req, res, next) {
  console.log(
    shortid.generate(),
    req.params.subcharacter_id,
    req.params.user_id,
    req.body.content,
    req.body.feeling,
    req.body.secret
  );
  maria.query(
    `INSERT INTO post(user_id, post_id, subcharacter_id, content, feeling , secret) VALUES  ("${
      req.params.user_id
    }","PO${shortid.generate()}","${req.params.subcharacter_id}","${
      req.body.content
    }","${req.body.feeling}","${req.body.secret}")`,

    function (err, rows, fields) {
      if (err) {
        console.log("post record fail", err);
      } else {
        console.log("post record success");
      }
    }
  );
});

// 글 삭제
router.delete("/post/:user_id/:post_id", function (req, res, next) {
  console.log(req.params.user_id, req.params.post_id);

  maria.query(
    `DELETE FROM post WHERE user_id = '${req.params.user_id}' AND  post_id = '${req.params.post_id}'`,
    function (err, result) {
      if (err) console.error("에러", err);
      if (result.affectedRows == 0) {
        console.log("해당 데이터가 없습니다.", result);
      } else {
        console.log("글을 삭제하였습니다.", result);
      }
    }
  );
});

// [record]  다른 유저 글 불러오기
router.get("/other/:user_id", function (req, res, next) {
  console.log(req.params.user_id, "########");
  maria.query(
    `select p.content , p.post_id , p.feeling, p.subcharacter_id , p.likeCount, p.secret , p.created_date, p.img_path,  s.title
    from post p , subcharacter s 
    where p.user_id not in ('${req.params.user_id}') AND s.subcharacter_id = p.subcharacter_id AND p.secret = 0`,
    function (err, rows, fields) {
      if (err) {
        console.log("get record fail", err);
      } else {
        console.log("get record success", rows);
        res.send(rows);
      }
    }
  );
});

// 좋아요 여부 불러오기
router.get("/likes/:user_id", function (req, res, next) {
  maria.query(
    `select post_id from likes where user_id = '${req.params.user_id}'`,
    function (err, rows, fields) {
      if (err) {
        console.log("get likeState fail", err);
      } else {
        console.log("get likeState success", rows);

        var likeList = [];
        for (var data of rows) {
          likeList.push(data.post_id);
        }
        console.log(likeList);
        res.send(likeList);
      }
    }
  );
});

// 좋아요
router.post("/likes/:user_id/:post_id", function (req, res) {
  if (!req.body.likeState) {
    // like 추가
    maria.query(
      `INSERT INTO likes(user_id,  post_id) VALUES ("${req.params.user_id}","${req.params.post_id}")`,
      function (err, rows, fields) {
        if (err) {
          console.log("post likes fail", err);
        } else {
          console.log("post likes success");

          maria.query(
            `update post set likeCount = likeCount + 1 where post_id= '${req.params.post_id}'`,
            function (err, rows, fields) {
              if (err) {
                console.log("post likes fail", err);
              } else {
                console.log("post likeCount success", rows);
              }
            }
          );
        }
      }
    );
  } else {
    // ㅣike 삭제
    maria.query(
      `DELETE FROM likes WHERE user_id = '${req.params.user_id}' AND  post_id = '${req.params.post_id}'`,
      function (err, rows, fields) {
        if (err) {
          console.log("post likes fail", err);
        } else {
          console.log("post likes success");

          maria.query(
            `update post set likeCount = likeCount - 1 where post_id= '${req.params.post_id}'`,
            function (err, rows, fields) {
              if (err) {
                console.log("post likes fail", err);
              } else {
                console.log("post likeCount success", rows);
              }
            }
          );
        }
      }
    );
  }
});

const upload = multer({
  dest: __dirname + "/uploads/", // 이미지 업로드 경로
});

// 사진 업로드 header : multipart/form-data
router.post("/single/upload", upload.single("file"), (req, res, next) => {
  const { mimetype, destination, filename, path, size } = req.file;
  const { name } = req.body;

  console.log("body 데이터 : ", name);
  console.log("파일의 Mime 타입 : ", mimetype);
  console.log("파일이 저장된 폴더 : ", destination);
  console.log("destinatin에 저장된 파일 명 : ", filename);
  console.log("업로드된 파일의 전체 경로 ", path);
  console.log("파일의 바이트(byte 사이즈)", size);

  res.json({ ok: true, data: "Single Upload Ok" });
});

module.exports = router;
