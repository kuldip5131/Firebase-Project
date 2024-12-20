import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Card } from "react-bootstrap";



function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [contact, setContact] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [hobbyInput, setHobbyInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const currentUser = await createUserWithEmailAndPassword(auth, email, password);
            const user = currentUser.user;

            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    contact: contact,
                    city: city,
                    gender: gender,
                    hobbies: hobbies,
                    timestamp: new Date(),
                });

                toast.success("User registered successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });

                // Reset all fields
                setEmail("");
                setPassword("");
                setFname("");
                setLname("");
                setContact("");
                setCity("");
                setGender("");
                setHobbies([]);
                setHobbyInput("");
            }
        } catch (error) {
            toast.error(`Error registering user: ${error.message}`, {
                position: "top-right",
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddHobby = () => {
        if (hobbyInput.trim()) {
            const cleanedHobby = hobbyInput
                .split(",")   // split by comma
                .map((hobbyInput) => hobbyInput.trim())
                .filter((hobbyInput) => hobbyInput);
            setHobbies([...hobbies, ...cleanedHobby]);
            setHobbyInput("");
        }
    };

    const handleRemoveHobby = (hobbyToRemove) => {
        setHobbies((prevHobbies) => prevHobbies.filter((hobby) => hobby !== hobbyToRemove));
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6} className="col-register">
                    <Card className="card-register box-decoration">
                        <form onSubmit={handleRegister}>
                            <h3 className="text-center" >Sign Up</h3>

                            <div className="mb-3">
                                <label>First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    required />
                            </div>

                            <div className="mb-3">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Contact</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter contact number"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Gender</label>
                                <select
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>Hobbies</label>
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        placeholder="Enter a hobby"
                                        value={hobbyInput}
                                        onChange={(e) => setHobbyInput(e.target.value)}
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={handleAddHobby}>
                                        Add
                                    </button>
                                </div>
                                <ul className="list-group mt-2">
                                    {hobbies.map((hobby, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between"
                                        >
                                            {hobby}
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemoveHobby(hobby)}
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-grid">
                                <button className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>
                            </div>
                            <p className="forgot-password text-end mt-1">
                                Already registered <a href="/login">Login</a>
                            </p>
                        </form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
