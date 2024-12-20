import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth, db } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch user details from Firestore
    const fetchUserDetails = async () => {
        const user = auth.currentUser;

        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserDetails(userSnap.data());
                } else {
                    toast.error("No user details found.", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                console.error("Error fetching user details:", error.message);
                toast.error("Failed to fetch user details.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("User not logged in.", {
                position: "top-right",
                autoClose: 2000,
            });
            navigate("/login"); // Redirect to login if no user is found
        }
    };

    // Fetch details on component mount
    useEffect(() => {
        fetchUserDetails();
    }, []);

    // Handle user logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
            toast.success("User signed out successfully!", {
                position: "top-right",
                autoClose: 2000,
            });
            navigate("/login"); // Navigate to login page after logout
        } catch (error) {
            console.error("Logout error:", error.message);
            toast.error("Failed to logout. Please try again.", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="p-4 box-decoration">
                        {loading ? (
                            <div className="text-center p-3">
                                <Spinner animation="border" role="status" className="mb-2" />
                                <p>Loading user details...</p>
                            </div>
                        ) : userDetails ? (
                            <div>
                                <div className="text-center">
                                    <h3>Profile Page</h3>
                                </div>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>First Name</th>
                                            <td>{userDetails.firstName}</td>
                                        </tr>
                                        <tr>
                                            <th>Last Name</th>
                                            <td>{userDetails.lastName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{userDetails.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Contact</th>
                                            <td>{userDetails.contact}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{userDetails.city}</td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>{userDetails.gender}</td>
                                        </tr>
                                        <tr>
                                            <th>Hobbies</th>
                                            <td>{userDetails.hobbies.join(", ")}</td>
                                        </tr>
                                        <tr>
                                            <th>Timestamp</th>
                                            <td>
                                                {userDetails.timestamp
                                                    ? userDetails.timestamp.toDate().toLocaleString()
                                                    : "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="text-center">
                                    <Button variant="primary" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-3">
                                <p>No user details available.</p>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
