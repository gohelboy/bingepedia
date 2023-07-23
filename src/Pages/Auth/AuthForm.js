import { useState } from "react";
import { Button, Input, Link } from "@mui/joy";
import {
  Key,
  Email,
  Visibility,
  VisibilityOff,
  East,
  Person4,
  Pin,
} from "@mui/icons-material/";
import "./AuthForm.css";
import { useFormik } from "formik";
import SnackbarToast from "../../components/Snackbar/SnackbarToast";

const AuthForm = () => {
  const [form, setForm] = useState(0);
  if (form === 0) return <Login setFormType={setForm} />;
  if (form === 1) return <Register setFormType={setForm} />;
  if (form === 2) return <VerifyUser setFormType={setForm} />;
};

const Login = ({ setFormType }) => {
  const [requestData, setRequestData] = useState({
    data: null,
    isLoading: false,
    message: "",
    severity: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  var initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      loginUser(values);
    },
  });

  // make user login
  const loginUser = async (values) => {
    setRequestData({
      ...requestData,
      isLoading: true,
    });
    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const resData = await res.json();

    if (resData.status === 0) {
      setRequestData({
        data: null,
        isLoading: false,
        message: resData.message,
        severity: "error",
      });
      setOpen(true);
    }
    if (resData.status === 1 && resData.data.isVerified === false) {
      setRequestData({
        data: null,
        isLoading: false,
        message: resData.message,
        severity: "warning",
      });
      setOpen(true);
      setFormType(2);
    }
    if (resData.status === 1 && resData.data.isVerified === true) {
      setRequestData({
        data: resData.data.payload,
        isLoading: false,
        message: resData.message,
        severity: "success",
      });
      setOpen(true);
    }
  };
  return (
    <div className="auth">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="title">
          <h1>Login</h1>
        </div>
        <div className="inputfields">
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            name="email"
            placeholder="Email"
            type="email"
            required
            variant="plain"
            size="lg"
            value={formik.values.email}
            onChange={formik.handleChange}
            startDecorator={<Email style={{ color: "#73738C" }} />}
          />
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            required
            variant="plain"
            size="lg"
            value={formik.values.password}
            onChange={formik.handleChange}
            startDecorator={<Key style={{ color: "#73738C" }} />}
            endDecorator={
              !showPassword ? (
                <Visibility
                  style={{ color: "#73738C" }}
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <VisibilityOff
                  style={{ color: "#73738C" }}
                  onClick={() => setShowPassword(false)}
                />
              )
            }
          />
          <Link underline="always">Forget password</Link>
        </div>
        <div className="btn">
          <Button type="submit" loading={requestData.isLoading}>
            Sign in <East />
          </Button>
          <div className="devider"></div>
          <Link
            underline="always"
            className="link"
            onClick={() => {
              setFormType(1);
            }}
          >
            Don't have an account? Signup
          </Link>
        </div>
        <SnackbarToast
          open={open}
          setopen={setOpen}
          message={requestData.message}
          severity={requestData.severity}
        />
      </form>
    </div>
  );
};

const Register = ({ setFormType }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="auth">
      <div className="form-container">
        <div className="title">
          <h1>Register</h1>
        </div>
        <form className="inputfields">
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            placeholder="Username"
            type="text"
            required
            variant="plain"
            size="lg"
            startDecorator={<Person4 style={{ color: "#73738C" }} />}
          />
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            placeholder="Email"
            type="email"
            required
            variant="plain"
            size="lg"
            startDecorator={<Email style={{ color: "#73738C" }} />}
          />
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            required
            variant="plain"
            size="lg"
            startDecorator={<Key style={{ color: "#73738C" }} />}
            endDecorator={
              !showPassword ? (
                <Visibility
                  style={{ color: "#73738C" }}
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <VisibilityOff
                  style={{ color: "#73738C" }}
                  onClick={() => setShowPassword(false)}
                />
              )
            }
          />
          {/* <Link underline="always">Forget password</Link> */}
        </form>
        <div className="btn">
          <Button>
            Continue <East />
          </Button>
          <div className="devider"></div>
          <Link
            underline="always"
            className="link"
            onClick={() => {
              setFormType(0);
            }}
          >
            Already have an account? Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

const VerifyUser = ({ setFormType }) => {
  return (
    <div className="auth">
      <div className="form-container">
        <div className="title">
          <h1>Check your mail</h1>
        </div>
        <form className="inputfields">
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            placeholder="OTP"
            type="number"
            required
            variant="plain"
            size="lg"
            startDecorator={<Pin style={{ color: "#73738C" }} />}
          />
          <Link underline="always">Resend OTP</Link>
        </form>
        <div className="btn">
          <Button>
            Verify <East />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
