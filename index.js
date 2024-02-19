const nedb = require("nedb");

const db = new nedb({ filename: "student.db", autoload: true });
console.log("db created");
console.log(
  "***********************************"
);

db.insert({ student:'Ross',
            age:20,
            programme:'Software Development',
            modules:[{
                        name:'Programming',
                        grade:62
                    },
                    {
                        name: 'Web Development',
                        grade: 57
                    },
                    {
                        name:'Software Engineering',
                        grade: 73
                    }
                ]

            }, function(err, newDoc){
                if(err) {
                    console.log('error',err);
                } else {
                    console.log('document inserted',newDoc);
                }
 });
 db.insert({ student:'Ed',
            age:20,
            programme:'Software Development',
            modules:[{
                        name:'Programming',
                        grade:40
                    },
                    {
                        name: 'Web Development',
                        grade: 54
                    },
                    {
                        name:'Software Engineering',
                        grade: 63
                    }
                ]

            }, function(err, newDoc){
                if(err) {
                    console.log('error',err);
                } else {
                    console.log('document inserted',newDoc);
                }
 });
 db.insert({ student:'Ann',
            age:20,
            programme:'Computing',
            modules:[{
                        name:'Programming',
                        grade:57
                    },
                    {
                        name: 'Web Development',
                        grade: 70
                    },
                    {
                        name:'Software Engineering',
                        grade: 59
                    }
                ]

            }, function(err, newDoc){
                if(err) {
                    console.log('error',err);
                } else {
                    console.log('document inserted',newDoc);
                }
 });
 db.insert({ student:'Ali',
            age:23,
            programme:'Software Development',
            modules:[{
                        name:'Programming',
                        grade:36
                    },
                    {
                        name: 'Application Architectures',
                        grade: 36
                    },
                    {
                        name:'Software Engineering',
                        grade: 66
                    }
                ]

            }, function(err, newDoc){
                if(err) {
                    console.log('error',err);
                } else {
                    console.log('document inserted',newDoc);
                }
 });
 db.insert({ student:'Fred',
            age:20,
            programme:'Software Development',
            modules:[{
                        name:'Programming',
                        grade:78
                    },
                    {
                        name: 'Application Architectures',
                        grade: 67
                    },
                    {
                        name:'Software Engineering',
                        grade: 69
                    }
                ]

            }, function(err, newDoc){
                if(err) {
                    console.log('error',err);
                } else {
                    console.log('document inserted',newDoc);
                }
 });
 db.insert({ student:'Colin',
            age:20,
            programme:'Software Development',
            modules:[{
                        name:'Programming',
                        grade:61
                    },
                    {
                        name: 'Application Architectures',
                        grade: 42
                    },
                    {
                        name:'Software Engineering',
                        grade: 70
                    }
                ]

            }, function(err, newDoc){
                if(err) {
                    console.log('error',err);
                } else {
                    console.log('document inserted',newDoc);
                }
 });

db.find({ "modules.name": "Web Development" }, function (err, docs) {
  if (err) {
    console.log("error");
  } else {
    console.log("Web Development class list: ");
    docs.forEach(function (doc) {
      console.log(doc.student,":",doc.programme);
    });
  }
});

db.find({ programme: "Computing", "modules.grade": 70 }, function (err, docs) {
  if (err) {
    console.log("error");
  } else {
    console.log("Computing students with grade of 70 in any module: ", docs); // note: trying this without using a loop reults in output being incorrectly formatted
    docs.forEach(function (d) {
      console.log("User:", d.student);
      d.modules.forEach(function (moduleTaken) {
        if (moduleTaken.grade == 70) {
          console.log("Subject with mark of 70%:", moduleTaken.name);
        }
      });
    });
  }
});

db.find({ 'modules.grade': { $lt: 50 }}, function(err, docs) {
    console.log('Students with low marks');
    docs.forEach(function(d) {
        console.log('User:', d.student);
        console.log('Grades:', d.modules);
    });
});

db.find({'modules.name':'Programming', 'modules.grade': { $lt: 40 }}, function(err, docs) {
    if(err){
        console.log('error updating documents',err);
    } else{
        console.log('Students who failed Programming');
        docs.forEach(function(d) {
            console.log(d.student," ",d.modules[0].name, 'module grade:', d.modules[0].grade);
        });
    }
});

db.find({'programme':'Software Development','modules.name':'Programming', 'modules.0.grade':{$gte:40}}, function(err, docs) {
    console.log('Software Development students who passed the Programming module');
    docs.forEach(function(d) {
        console.log( d.student, ' ', d.modules[0].grade );
    });
});

db.update({ student: 'Ross'},{$set:{'age':24} },{},function(err,numUp){
    if(err){
        console.log('error updating documents',err);
    } else {
        console.log(numUp,'document updated. Ross age updated')
    }
})

db.remove({ 'student': 'Ed'},{}, function(err,docsRem){
    if(err){
        console.log('error deleting document Ed');
    } else {
        console.log(docsRem, ' update. Document Ed removed from database')
    }
})

db.update({ student: 'Fred'},{$push:{'modules':{name:'Web Development','grade':67 }} },{},function(err,newMark){
    if(err){
        console.log('error updating documents',err);
    } else {
        console.log(newMark,'document updated. New mark recorded for Fred for Web Development');
    }
})
