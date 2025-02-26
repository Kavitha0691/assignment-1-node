const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path'); 

const PORT = 3000;

http.createServer((req, res) => {
  const fullpath = url.parse(req.url, true);

  res.writeHead(200, { 'Content-Type': 'text/html' });

  if (fullpath.path === "/") {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        res.write("<p>Something went wrong with loading the homepage.</p>");
      } else {
        res.write(data);  
      }
      res.end();
    });

  } else if (fullpath.pathname === "/students") {
    const studentName = fullpath.query.name;
    if (studentName) {
      const studentFilePath = path.join(__dirname, 'data', 'students', `${studentName}.html`);
      fs.readFile(studentFilePath, 'utf8', (err, data) => {
        if (err) {
          res.write("<p>Student details not found.</p>");
        } else {
          res.write(data); 
        }
        res.end();
      });
    } else {
      res.write("<h1>Our Students</h1>");
      res.write("<a href='/'>Home</a><br>");
      res.write("<a href='/teachers'>Teachers</a><br>");
      res.write("<div>Meet our incredible students, each with their own unique story, journey, and aspirations. From hard work and dedication to creativity and leadership, our students embody the spirit of growth and success. Click on a name below to explore their achievements, passions, and the qualities that make them stand out in both academics and life. Get inspired by their dedication to learning and personal development!</div>");
      res.write("<h3>Students Names</h3>")
      res.write("<a href='/students?name=student1'>Flower</a><br>");
      res.write("<a href='/students?name=student2'>Perfume</a><br>");
      res.end();
    }

  } else if (fullpath.pathname === "/teachers") {
    const teacherName = fullpath.query.name;
    if (teacherName) {
      const teacherFilePath = path.join(__dirname, 'data', 'teachers', `${teacherName}.html`);
      fs.readFile(teacherFilePath, 'utf8', (err, data) => {
        if (err) {
          res.write("<p>Teacher details not found.</p>");
        } else {
          res.write(data);
        }
        res.end();
      });
    } else {
      res.write("<h1>Our Teachers</h1>");
      res.write("<a href='/'>Home</a><br>");
      res.write("<a href='/students'>Students</a><br>");
      res.write("<div>Meet our most beloved teachers! Click on a name to learn more about their expertise and teaching journey.</div>");
      res.write("<h3>Teachers Name</h3>");
      res.write("<a href='/teachers?name=teacher1'>Sun</a><br>");
      res.write("<a href='/teachers?name=teacher2'>Moon</a><br>");
      res.end();
    }

  } else {
    res.write("<h1>404 Not Found</h1>");
    res.write("<p>The page you are looking for does not exist.</p>");
    res.end();
  }
  
}).listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`);
});
