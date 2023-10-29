import React,{ useState ,useEffect} from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Navbar from './Navbar';
import axios from 'axios';

const ProfilePage = ({ username, email }) => {

  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user data from the backend API
    axios.get('http://localhost:5000/profile')
      .then(response => {
        setUserData(response.data); // Assuming response.data contains username, email, and profileImage
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <Container fluid>
    <Navbar />
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image
            src="https://static.vecteezy.com/system/resources/previews/001/857/158/non_2x/influencer-profile-page-mobile-application-free-vector.jpg"
            alt="User Profile"
            fluid
          />
        </Col>
        <Col md={6}>
          <div className="profile-details">
            <h1 className='display-6 text-center'>Your Profile</h1>
            <Row>
              <Col md={6}>
                <h1 className='lead ms-2'>Username:</h1>
              </Col>
              <Col md={6}>
                  {userData.username}
                </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h1 className='lead ms-2 mt-4'>Email:</h1>
              </Col>
              <Col md={6}>
                  {userData.email}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
    </Container>


    
  );
};

export default ProfilePage;
