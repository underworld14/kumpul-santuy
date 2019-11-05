require("express-group-routes");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(bodyParser.json());

// controllers
const AuthController = require("./controllers/Auth");
const RebahansController = require("./controllers/Rebahans");

// midlewares authentication
const { authenticated } = require("./middlewares");

// group routes here
app.group("/api/v1", router => {
  // Home page route
  router.get("/", (req, res) => {
    res.send("Hello this is RebahanYuk server");
  });
  // Login & Register API
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);

  // Privates API
  router.get("/rooms", authenticated, RebahansController.showRooms);
  router.post("/room", authenticated, RebahansController.addRoom);
  router.put("/room/:room_id", authenticated, RebahansController.editRoom);
  router.delete(
    "/room/:room_id",
    authenticated,
    RebahansController.deleteRooms
  );
  router.get("/customers", authenticated, RebahansController.showCustomers);
  router.post("/customer", authenticated, RebahansController.addCustomer);
  router.put(
    "/customer/:cust_id",
    authenticated,
    RebahansController.editCustomer
  );
  router.delete(
    "/customer/:cust_id",
    authenticated,
    RebahansController.deleteCustomers
  );
  router.get("/checkin", authenticated, RebahansController.showCheckIn);
  router.post("/checkin", authenticated, RebahansController.addCheckIn);
  router.put("/order/:order_id", authenticated, RebahansController.putCheckOut);

  router.get("/orders", authenticated, RebahansController.showOrders);
});

app.listen(port, () => console.log(`Listening on port ${port} !`));
