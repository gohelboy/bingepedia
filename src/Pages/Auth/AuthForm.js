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
import { useDispatch } from "react-redux";
import { loggedin } from "../../redux/features/authSlice";
import { BASE_URL, getAllUserList, getWatched, getWatchlist } from "../../redux/features/saveSlice";
const AuthForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    otp: '',
  });

  const [form, setForm] = useState(0);
  if (form === 0) return <Login setFormType={setForm} initialValues={userData} setInitialvalues={setUserData} />;
  if (form === 1) return <Register setFormType={setForm} initialValues={userData} setInitialvalues={setUserData} />;
  if (form === 2) return <VerifyUser setFormType={setForm} initialValues={userData} setInitialvalues={setUserData} />;
};

const Login = ({ setFormType, initialValues, setInitialvalues }) => {
  const dispatch = useDispatch();
  const getData = async (id) => {
    console.log("start")
    const watchlist = await getWatchlist(id);
    const watched = await getWatched(id);
    dispatch(getAllUserList({ watchlist: watchlist, watched: watched }))
    console.log("end")
  }
  const [requestData, setRequestData] = useState({
    data: null,
    isLoading: false,
    message: "",
    severity: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setInitialvalues(formik.values);
      loginUser(values);
    },
  });

  // make user login
  const loginUser = async (values) => {
    setRequestData({
      ...requestData,
      isLoading: true,
    });

    const res = await fetch(BASE_URL + "/user/login", {
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
      await getData(resData.data.id);
      dispatch(loggedin(resData.data));
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

const Register = ({ setFormType, initialValues, setInitialvalues }) => {

  const [requestData, setRequestData] = useState({
    isLoading: false,
    message: "",
    severity: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      setInitialvalues(formik.values);
      RegisterUser();
    }
  });

  const RegisterUser = async () => {
    setRequestData({
      isLoading: true,
      ...requestData,
    })
    const res = await fetch(BASE_URL + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    });

    const resData = await res.json();
    if (resData.status === 0) {
      setRequestData({
        isLoading: false,
        message: resData.message,
        severity: 'error',
      })
      setOpen(true);
    }
    else if (resData.status === 1 && resData.data?.isVerified === false) {
      setRequestData({
        isLoading: false,
        message: resData.message,
        severity: 'warning',
      })
      setOpen(true);
      setFormType(2);
    }
    else if (resData.status === 1 && resData.data?.isVerified === true) {
      setRequestData({
        isLoading: false,
        message: resData.message,
        severity: "info",
      })
      setOpen(true);
    }
    else if (resData.status === 1) {
      setRequestData({
        isLoading: false,
        message: resData.message,
        severity: 'success',
      })
      setOpen(true);
      setFormType(2);
    }

  }

  return (
    <div className="auth">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="title">
          <h1>Register</h1>
        </div>
        <div className="inputfields" >
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            startDecorator={<Person4 style={{ color: "#73738C" }} />}
            name="username"
            placeholder="Username"
            type="text"
            required
            variant="plain"
            size="lg"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            startDecorator={<Email style={{ color: "#73738C" }} />}
            name='email'
            placeholder="Email"
            type="email"
            required
            variant="plain"
            size="lg"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
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
            placeholder="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            variant="plain"
            size="lg"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {/* <Link underline="always">Forget password</Link> */}
        </div>
        <div className="btn">
          <Button type="submit">
            Continue <East />
          </Button>
          <div className="devider"></div>
          <Link
            underline="always"
            className="link"
            onClick={() => {
              setFormType(0);
            }}>
            Already have an account? Signin
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

const VerifyUser = ({ setFormType, initialValues }) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    isLoading: false,
    message: "",
    severity: "",
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      verify();
    }
  });

  const verify = async () => {

    setRequestData({
      isLoading: true,
      ...requestData,
    })

    const res = await fetch(BASE_URL + '/user/verify-user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formik.values.email, otp: formik.values.otp }),
    })
    const resData = await res.json();
    if (resData.status === 0) {
      setRequestData({
        isLoading: false,
        message: resData.message,
        severity: "error",
      })
      setOpen(true);
    }
    else if (resData.status === 1 && resData.data?.isVerified === true) {
      setRequestData({
        isLoading: false,
        message: resData.message,
        severity: "success",
      })
      setOpen(true);
      dispatch(loggedin(resData.data));
    }
  }

  return (
    <div className="auth">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="title">
          <h1>Check your Email</h1>
        </div>
        <div className="inputfields">
          <Input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
            }}
            name='otp'
            placeholder="OTP"
            type="number"
            variant="plain"
            size="lg"
            startDecorator={<Pin style={{ color: "#73738C" }} />}
            onChange={formik.handleChange}
            value={formik.values.otp}
            required
          />
          <Link underline="always">Resend OTP</Link>
        </div>
        <div className="btn">
          <Button type="submit">
            Verify <East />
          </Button>
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

export default AuthForm;
