import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivatePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to manage navigation

  useEffect(() => {
    // Function to check if the user is logged in
    const checkAuth = () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to view this page");
        // Redirect to login if token is not found
        navigate("/login");
      } else {
        // Retrieve email from session storage and update state
        const storedEmail = sessionStorage.getItem("email");
        setEmail(storedEmail);
        setLoading(false); // Set loading to false once authentication check is done
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading message or spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <img
          src="https://st4.depositphotos.com/3369547/24946/v/450/depositphotos_249466536-stock-illustration-shield-security-with-padlock.jpg"
          alt="Security"
          style={styles.image}
        />
        <h1>Private Page</h1>
        <p>
          Hello{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>{email}</span>{" "}
          this is your protected content!
        </p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black", // Light background color
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  image: {
    width: "150px",
    height: "150px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
};

export default PrivatePage;
