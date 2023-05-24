import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 import "./Style.css";

function Login() {
  const naviget = useNavigate();
  const [email, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      naviget("/dashboard");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [msg]);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "email":
        setError("");
        setUser(e.target.value);
        if (e.target.value === "") {
          setError("email has left blank");
        }
        break;
      case "password":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("Password has left blank");
        }
        break;
      default:
    }
  };

  function loginSubmit() {
    if (email !== "" && password !== "") {
      var url = "http://localhost/react_allocation_system/login.php";
      var headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      var Data = {
        email: email,
        password: password,
      };
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (
            response[0].result === "Invalid email!" ||
            response[0].result === "Invalid password!"
          ) {
            setError(response[0].result);
          } else {
            setMsg(response[0].result);
            setTimeout(function () {
              localStorage.setItem("login", true);
              naviget("/dashboard");
            }, 5000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    } else {
      setError("All field are required!");
    }
  }

  return (
    <div className="form">
      {/* <h2>Admin Login Panel</h2>
      <p>
        {error !== "" ? (
          <span className="error">{error}</span>
        ) : (
          <span className="success">{msg}</span>
        )}
      </p>
      
      <label><b>Email:</b></label>
      <input
        type="text"
        value={email}
        onChange={(e) => handleInputChange(e, "email")}
      />
      <label><b>Password:</b></label>
      <input
        type="password"
        value={password}
        onChange={(e) => handleInputChange(e, "password")}
      />
      <div>
        <form>
      <input
        type="button"
        defaultValue="Login"
        className="button"
        onClick={loginSubmit}
      />
      </form>
      </div> */}


       <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form>


            <p>
        {error !== "" ? (
          <span className="error">{error}</span>
        ) : (
          <span className="success">{msg}</span>
        )}
      </p>

              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" value={email} onChange={(e) => handleInputChange(e, "email")} placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
              </div>

              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingInput" value={password} onChange={(e) => handleInputChange(e, "password")} placeholder="name@example.com" style={{width:"430px"}} />
                <label for="floatingInput">Password</label>
              </div>
        
      <div  style={{marginTop:"10px", marginBottom:"7px" }}>
                 <a href="#" style={{textDecoration:"none"}}> Forgotten password</a>
                 </div>

              <div class="d-grid">

                  <input
        type="button"
        defaultValue="Login"
        className="button"
        onClick={loginSubmit}
      />
              </div>

              <div>
      </div>

           
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> 
    </div>
  );
}

export default Login;
