const shortid = require("shortid");
const maria = require("../database/connect/maria");
const multer = require("multer");

// [record]  글 쓰기
const postRecord = function (req, res, next) {
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
};

// 글 삭제
const deleteRecord = function (req, res, next) {
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
};

// [record]  다른 유저 글 불러오기
const getOthersRecord = function (req, res, next) {
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
};

// 좋아요 여부 불러오기
// router.get("/likes/:user_id", function (req, res, next) {
//   maria.query(
//     `select post_id from likes where user_id = '${req.params.user_id}'`,
//     function (err, rows, fields) {
//       if (err) {
//         console.log("get likeState fail", err);
//       } else {
//         console.log("get likeState success", rows);

//         var likeList = [];
//         for (var data of rows) {
//           likeList.push(data.post_id);
//         }
//         console.log(likeList);
//         res.send(likeList);
//       }
//     }
//   );
// });

// 좋아요
const postRecordLike = function (req, res) {
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
};

const postImage = function (req, res, next) {
  maria.query(
    `update post set img_path = '${req.file.location}' where post_id= '${req.params.post_id}'`,
    function (err, rows, fields) {
      if (err) {
        console.log("사진 추가 실패", err);
      } else {
        console.log("사진 추가 성공", rows);
        res.json({ status: 200, uri: req.file.location });
      }
    }
  );
};

module.exports = {
  postRecord,
  deleteRecord,
  getOthersRecord,
  postRecordLike,
  postImage,
};
