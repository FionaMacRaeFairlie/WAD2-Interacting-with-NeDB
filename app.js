const nedb = require("nedb");
const db = new nedb({ filename: "student.db", autoload: true });
db.find({ "modules.name": "Web Development" }, function (err, docs) {
  if (err) {
    console.log("error");
  } else {
    console.log("documents retrieved: ", docs);
  }
});
db.find({ programme: "Computing", "modules.grade": 70 }, function (err, docs) {
  if (err) {
    console.log("error");
  } else {
    console.log(
      "Computing students with grade of 70 on any module. Documents retrieved: ",
      docs
    );
  }
});
db.find({ "modules.grade": { $lt: 50 } }, function (err, docs) {
  docs.forEach(function (d) {
    console.log("Found user:", d.student);
    console.log("Grades:", d.modules);
    console.log(
      "Found ",
      d.student,
      "'s ",
      d.modules[1].name,
      "module grade:",
      d.modules[1].grade
    );
  });
});
db.update({ student: 'Ross'},{$set:{'age':24} },{},function(err,numUp){
  if(err){
      console.log('error updating documents',err);
  } else {
      console.log(numUp,'document updated. Ross age updated')
  }
})
db.find({'programme':'Software Development','modules.name':'Programming', 'modules.0.grade':{$gte:40}}, function(err, docs) {
  console.log('Software Development students who passed the Programming module');
  docs.forEach(function(d) {
      console.log( d.student, ' ', d.modules[0].grade );
  });
});