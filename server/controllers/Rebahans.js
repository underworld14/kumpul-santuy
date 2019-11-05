const moment = require("moment");
const models = require("../models");

const Users = models.users;
const Rooms = models.rooms;
const Customers = models.customers;
const Orders = models.orders;

exports.showRooms = (req, res) => {
  Rooms.findAll().then(data => {
    res.send(data);
  });
};

exports.addRoom = (req, res) => {
  Rooms.create({
    room: req.body.room
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: true,
        Message: "Invalid Request"
      });
      console.log(err);
    });
};

exports.editRoom = (req, res) => {
  const userId = req.params.room_id;

  Rooms.update(
    {
      room: req.body.room
    },
    {
      where: { id: userId }
    }
  )
    .then(data => {
      res.send({
        error: false,
        data
      });
    })
    .catch(err => {
      res.send({
        error: true
      });
    });
};

exports.addCustomer = (req, res) => {
  Customers.create({
    identity: req.body.identity,
    name: req.body.name,
    phone: req.body.phone
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: true,
        Message: "Invalid Request !"
      });
      console.log(err);
    });
};

exports.showCustomers = (req, res) => {
  Customers.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: true
      });
    });
};

exports.editCustomer = (req, res) => {
  const custId = req.params.cust_id;
  Customers.update(
    {
      identity: req.body.identity,
      name: req.body.name,
      phone: req.body.phone
    },
    {
      where: { id: custId }
    }
  )
    .then(() => {
      res.send({
        error: false,
        Message: "Update Succesfull !"
      });
    })
    .catch(err => {
      res.send({
        error: true,
        Message: "Update Failed !"
      });
    });
};

exports.showCheckIn = (req, res) => {
  Rooms.findAll({
    include: [
      {
        model: Customers,
        through: {
          model: Orders,
          where: { is_done: false }
        }
      }
    ]
  }).then(data => {
    res.send(getCheckIn(data));
  });
};

exports.addCheckIn = (req, res) => {
  Orders.create({
    id_room: req.body.id_room,
    id_customer: req.body.id_customer,
    duration: req.body.duration,
    end_time: moment().add(req.body.duration, "minutes"),
    is_done: false,
    is_booked: true
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.putCheckOut = (req, res) => {
  const orderId = req.params.order_id;
  Orders.update(
    {
      is_done: true
    },
    {
      where: { id: orderId }
    }
  )
    .then(data => {
      res.send({
        update: true,
        data
      });
    })
    .catch(() => {
      res.send({
        update: false
      });
    });
};

exports.deleteRooms = (req, res) => {
  const idRoom = req.params.room_id;

  Rooms.destroy({
    where: { id: idRoom }
  })
    .then(() => {
      res.send({
        delete: true
      });
    })
    .catch(() => {
      res.send({
        delete: false
      });
    });
};

exports.deleteCustomers = (req, res) => {
  const idCustomer = req.params.cust_id;

  Customers.destroy({
    where: { id: idCustomer }
  })
    .then(() => {
      res.send({
        delete: true
      });
    })
    .catch(() => {
      res.send({
        delete: false
      });
    });
};

exports.showOrders = (req, res) => {
  Orders.findAll({
    include: [
      {
        model: Customers
      },
      {
        model: Rooms
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.send({
        error: true
      });
    });
};

const getCheckIn = data => {
  const newData = data.map(item => {
    const customer = item.customers.map(entry => {
      const { id, identity, name, phone } = entry;
      const newCustomers = {
        id,
        identity,
        name,
        phone
      };
      return newCustomers;
    });
    const order = item.customers.map(entry => {
      const { id, is_booked, is_done, duration, end_time } = entry.orders;
      const newOrders = {
        id,
        is_booked,
        is_done,
        duration,
        end_time
      };
      return newOrders;
    });
    const newItem = {
      id: item.id,
      room: item.room,
      customer: customer[0],
      order: order[0]
    };
    return newItem;
  });
  return newData;
};
