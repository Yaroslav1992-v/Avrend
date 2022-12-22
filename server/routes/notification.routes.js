import express from "express";
import auth from "../middleware/auth.middleware.js";
import Notification from "../models/Notification.js";
const router = express.Router({ mergeParams: true });
router.patch("/", auth, async (req, res) => {
  try {
    let update;
    if (req.body.type === "seen") {
      update = req.body.notif.map((obj) => {
        return {
          updateOne: {
            filter: {
              _id: obj,
            },
            update: { $set: { seen: true } },
          },
        };
      });
    } else {
      update = req.body.notif.map((obj) => {
        return {
          updateOne: {
            filter: {
              _id: obj,
            },
            update: { $set: { read: true } },
          },
        };
      });
    }
    await Notification.bulkWrite(update);
    res.send("success");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      notifier: req.user._id,
    }).populate("from", "picturePath lastName firstName  accountName");
    res.json(notifications);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/", auth, async (req, res) => {
  try {
    let deletedNotif;
    console.log(req.body);
    if (req.body.id) {
      if (req.body.type === "message") {
        deletedNotif = await Notification.deleteMany({
          from: req.body.id,
          notifier: req.user._id,
          type: req.body.type,
        });
      } else {
        deletedNotif = await Notification.findOneAndDelete({
          from: req.user._id,
          type: req.body.type,
          typeId: req.body.id,
        });
      }
    } else if (req.body.typeId) {
      deletedNotif = await Notification.deleteMany({
        typeId: req.body.typeId,
        from: req.body.from,
        type: req.body.type,
      });
    }
    res.send(deletedNotif?._id || "");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});
// router.delete('/:notId', auth, async(req,res)=>{
//   try {

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// })
router.post("/", auth, async (req, res) => {
  try {
    let notification = await Notification.create({
      from: req.user._id,
      ...req.body,
    });
    notification = await notification.populate(
      "from",
      "picturePath lastName firstName  accountName"
    );

    res.json(notification);
  } catch (error) {
    console.log(error.message);
  }
});
export default router;
