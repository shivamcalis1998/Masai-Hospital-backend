const express = require("express");
const Appointment = require("../models/appointment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      specialization,
      experience,
      date,
      location,
      slots,
      fee,
    } = req.body;

    const newAppointment = new Appointment({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });

    await newAppointment.save();

    return res
      .status(201)
      .json({ message: "Appointment created successfully" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { specialization, sort, search } = req.query;

    let query = {};

    if (specialization) {
      query.specialization = specialization;
    }

    if (search) {
      query.name = new RegExp(search, "i");
    }

    let sortOptions = {};

    if (sort === "asc") {
      sortOptions.date = 1;
    } else if (sort === "desc") {
      sortOptions.date = -1;
    }

    const appointments = await Appointment.find(query).sort(sortOptions);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = req.body;

    const result = await Appointment.findByIdAndUpdate(id, updatedAppointment, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: result,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Appointment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
