import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useContext } from "react";
import { Context } from "../store/appContext";

const AddContact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get store and actions from context
  const { store, actions } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic here

    // create payload
    const payload = {
      name: fullName,
      phone: phone,
      email: email,
      address: address,
    };

    // send payload to API https://playground.4geeks.com/contact/agendas/myagenda/contacts
    const url =
      "https://playground.4geeks.com/contact/agendas/myagenda/contacts";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Contact added successfully");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // Reset form fields after save
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="p-5 bg-white rounded shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 style={{ color: "black" }} className="text-center">
          Add New Contact
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name:</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Save
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/contact/list" className="text-decoration-none">
            Back to contact list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
