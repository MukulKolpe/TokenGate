const Event = require("../models/event");
const asyncHandler = require("express-async-handler");
let nodemailer = require("nodemailer");

const getEvents = async (req, res) => {
  res.status(200).json(await Event.find());
};

const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404);
    console.log("Event not found");
  }
};

const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    time,
    date,
    image,
    mode,
    location,
    price,
    organizer,
    organizer_email,
    speakerApplications,
    speakers,
    attendees,
    volunteers,
    tickets,
    volunteersApplications,
    domain,
    latitude,
    longitude,
  } = req.body;

  const event = await Event.create({
    title,
    description,
    time,
    date,
    image,
    mode,
    location,
    price,
    speakerApplications,
    speakers,
    attendees,
    organizer,
    organizer_email,
    volunteers,
    tickets,
    volunteersApplications,
    domain,
    latitude,
    longitude,
  });

  if (event) {
    res.status(201).json({
      _id: event._id,
      title: event.title,
      description: event.description,
      time: event.time,
      date: event.date,
      image: event.image,
      mode: event.mode,
      location: event.location,
      organizer: event.organizer,
      price: event.price,
      tickets: event.tickets,
      domain: event.domain,
      latitude: event.latitude,
      longitude: event.longitude,
    });
  } else {
    res.status(400);
    console.log("Invalid event data");
  }
});

const updateEventApproval = asyncHandler(async (req, res) => {
  const email = req.body.email;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2020.sarvesh.limaye@ves.ac.in",
      pass: process.env.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "2020.sarvesh.limaye@ves.ac.in",
    to: email,
    subject: "[MLH X NEAR] Event Registration Approved",
    html: `
    <p><b>Congratulations🎉🎉!</b></p>
    <p>We are thrilled to inform you that, the event you registered has been approved.</p>
    <p>We look forward to an outstanding event!</p>
    <p>Navigate to explore page to rollout tickets</p>
    <p>If you have any further questions or need assistance, please feel free to contact us. We look forward to a fantastic event!</p>
    <br>
    <p>Best regards,</p>
    <p>[MLH X NEAR] Event Team</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent");
    }
  });
  const event = await Event.findByIdAndUpdate(req.params.id, {
    isApproved: true,
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Event : ", docs);
      }
    },
  });
});

module.exports = { getEvents, getEventById, createEvent, updateEventApproval };
