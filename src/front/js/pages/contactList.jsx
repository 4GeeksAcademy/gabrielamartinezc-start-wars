import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/contactCard.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const ContactList = () => {
  // Get store and actions from context
  const { store, actions } = useContext(Context);

  // Fetch contacts only when contacts change
  useEffect(() => {
    actions.getAgenda();
  }, [store.contacts]);

  const handleEdit = (updatedContact) => {
    actions.updateContact(updatedContact);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div>
        <h2 className="text-center">Contact List</h2>
        <Link
          to="/contact"
          className="btn"
          style={{
            backgroundColor: "green",
            color: "white",
            marginBottom: "20px",
          }}
        >
          Add Contact
        </Link>
        <div className="d-flex flex-column align-items-center">
          {store.contacts.map((contact, index) => (
            <div key={index} className="mb-3 w-100">
              <ContactCard
                contact={contact}
                onDelete={() => actions.removeContact(contact)}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
