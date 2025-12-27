const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send("welcome");
});

const st = [
  { id: 1, name: "ali", age: 20 },
  { id: 2, name: "sara", age: 22 },
];

app.post("/st", (req, res) => {
  const newst = req.body;
  st.push(newst);
  res.status(201).json({
    msg: "studentadded",
    data: newst,
  });
});

app.get("/st/:age", (req, res) => {
  const stu = st.find((s) => s.age == req.params.age);
  if (stu) {
    res.json(stu);
  } else {
    res.status(404).json({
      msg: "student not found",
    });
  }
});

// app.patch('/st/:id',(req,res)=>{
//     const stu =st.find(s=>s.id==req.params.id)
//     if(stu){
//         let newName = req.body.name;
//         stu.name = newName
//         res.json(stu);
//     }else{
//         res.status(404).json({
//             msg:"student not found"
//         })
//     }
// });
