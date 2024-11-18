module.exports = (req, res) => {
  const { method, url } = req;
  const { name } = req.query;

  if (url === "/") {
    res.status(200).send("Welcome to the Home Page!");
  } else if (url.startsWith("/greet")) {
    if (name) {
      res.status(200).send(`Hello, ${name}!`);
    } else {
      res.status(400).send("Please provide a name in the query, e.g., /greet?name=YourName");
    }
  } else if (url.startsWith("/about")) {
    res.status(200).send("This is the About Page.");
  } else {
    res.status(404).send("Page not found.");
  }
};
