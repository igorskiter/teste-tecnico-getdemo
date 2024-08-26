import "module-alias/register";

require("dotenv").config();

init();

async function init() {
  const app = require("./app");
  try {
    app.listen(3001, () => {
      console.log("Express App Listening on Port 3001");
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
