import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const ContactCard = ({ contact, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState(contact);
  const [formChanged, setFormChanged] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (formChanged) {
      onEdit(editedContact); // Pass updated contact to the parent for saving
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
    setFormChanged(true); // Mark form as changed
  };

  return (
    <Card className="text-center">
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedContact.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedContact.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editedContact.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editedContact.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <>
            <Card.Title>{contact.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {contact.email}
              <br />
              <strong>Address:</strong> {contact.address}
              <br />
              <strong>Phone:</strong> {contact.phone}
            </Card.Text>
          </>
        )}
        {isEditing ? (
          <Button variant="success" className="me-2" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant="primary" className="me-2" onClick={handleEditClick}>
            Edit
          </Button>
        )}
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ContactCard;
