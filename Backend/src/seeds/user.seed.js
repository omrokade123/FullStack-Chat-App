import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "chhota.bheem@example.com",
    fullName: "Chhota Bheem",
    password: "123456",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOa16G1rPDCG0qCPmfOmj_fNpOTd1IT_kU1g&s"
  },
  {
    email: "mighty.raju@example.com",
    fullName: "Mighty Raju",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/23.jpg"
  },
  {
    email: "motlu@example.com",
    fullName: "Motu",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    email: "patlu@example.com",
    fullName: "Patlu",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/31.jpg"
  },
  {
    email: "nobita@example.com",
    fullName: "Nobita Nobi",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/19.jpg"
  },
  {
    email: "doraemon@example.com",
    fullName: "Doraemon",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/40.jpg"
  },
  {
    email: "shinchan@example.com",
    fullName: "Shinchan Nohara",
    password: "123456",
    profilePic: "./Images/shinchan.jpeg"
  },
  {
    email: "krishna.balram@example.com",
    fullName: "Krishna Balram",
    password: "123456",
    profilePic: "./Images/krishna.jpeg"
  },
  {
    email: "kalia@example.com",
    fullName: "Kalia",
    password: "123456",
    profilePic: "./Images/kalia.jpeg"
  },
  
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();