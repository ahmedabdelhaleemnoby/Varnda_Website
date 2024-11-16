import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Header.css"
// import { ReactComponent as Logo } from '../../images/logo.png';
import Logo from '../../images/logo.png';
import {
  faSignInAlt,
  faUserPlus,
  faHeart,
  faPlus,
  faCog,
  faSignOutAlt,
  faUser,
  faFileAlt,
  faTachometerAlt,
  faBuilding,
  faMapMarkedAlt,
  faCity
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import api from "../../API/ApiLink";
import { Avatar } from '@mui/joy';



export default function Header() {

  const navigate = useNavigate()
  const token = Cookies.get('token')
  const image = Cookies.get('image')
  const first_name = Cookies.get('first_name')
  const role = Cookies.get("role")
  // const role = localStorage.getItem("role")
  const Logout = async () => {
    try {
      const response = await api.post("/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log(error);
    } finally {
      // localStorage.removeItem("role");
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName);
      });
      navigate("/")
    }
  }
  return (
    <>
      {/* <Navbar bg="light" expand="lg"> */}
      <Navbar style={{background:'#0d6efd'}} expand="lg">
        <Container>

          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Link to="/" className="logo-cont">
              {/* <Logo className="logo" /> */}
              <img src={Logo} alt='logo' className="logo"/>
            </Link>
            <Link to="/myprofile" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                borderRadius: '50px',
                paddingLeft: '10px',
                maxWidth: '200px',
                overflow: 'hidden',
              }}>
                <Avatar src={image} sx={{ '--Avatar-size': '2rem' }} />
                <span style={{
                  display: 'inline-block',
                  maxWidth: '147px',
                  textWrap: 'nowrap',
                  color: 'black',
                }}>
                  {first_name}
                </span>
              </div>
            </Link>

          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{background:'white'}}/>
          <Navbar.Collapse id="basic-navbar-nav" style={{
            width: 'fit-content',
            alignItems: 'end',
            flexDirection: 'column'
          }}>
            <Nav>
              <NavDropdown
                title={
                  <span>
                    <FontAwesomeIcon icon={faUser} className="ms-2" />
                    حسابى
                  </span>
                }
                id="navbarScrollingDropdown"
              >

                {!token && <>
                  <NavDropdown.Item as={Link} to="/login" className="text-end">
                    <FontAwesomeIcon icon={faSignInAlt} className="ms-2" />
                    تسجيل الدخول
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup" className="text-end">
                    <FontAwesomeIcon icon={faUserPlus} className="ms-2" />
                    تسجيل الحساب
                  </NavDropdown.Item>
                </>}
                <NavDropdown.Item as={Link} to="/favorite-properties" className="text-end">
                  <FontAwesomeIcon icon={faHeart} className="ms-2" />
                  المفضلة
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/myproperties" className="text-end">
                  <FontAwesomeIcon icon={faBuilding} className="ms-2" />
                  تصفح عقاراتك
                </NavDropdown.Item>
{/*  */}
                <NavDropdown.Item as={Link} to="/governorates" className="text-end">
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="ms-2" />
                  المحافظات
                  </NavDropdown.Item>
{/*  */}




                <NavDropdown.Item as={Link} to="/myprofile" className="text-end" >
                  <FontAwesomeIcon icon={faCog} className="ms-2" />
                  الاعدادات
                </NavDropdown.Item>

                {role === "admin" && <NavDropdown.Item as={Link} to="/dashboard" className="text-end">
                  <FontAwesomeIcon icon={faTachometerAlt} className="ms-2" />
                  لوحه التحكم
                </NavDropdown.Item>
                }
                {token &&
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="text-end" onClick={Logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="ms-2" />
                      تسجيل خروج
                    </NavDropdown.Item>
                  </>
                }
              </NavDropdown>
              <Nav.Link as={Link} to="/submit-property"  style={{color: 'white'}} >
                <FontAwesomeIcon icon={faPlus} className="ms-2" />
                اضف عقار
              </Nav.Link>
              <Nav.Link as={Link} to="/blog"  style={{color: 'white'}}>
                <FontAwesomeIcon icon={faFileAlt} className="ms-2" />
                المدونة
              </Nav.Link>

{/*  */}
              <Nav.Link as={Link} to="/projects"  style={{color: 'white'}}>
                <FontAwesomeIcon icon={faCity} className="ms-2" />
                المشروعات العقارية
              </Nav.Link>
{/*  */}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={{ margin: "0px" }} />
    </>
  );
}