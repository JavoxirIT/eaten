import { LoginForm } from "./LoginForm";

export default function LoginLayout() {
  return (
    <div style={style.rowStyle}>
      <div style={style.blockStyle}>
        <h2 style={style.h2}>EATEN</h2>
        <div style={style.loginBlockForm}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

const style = {
  rowStyle: {
    minHeight: "100vh",
    backgroundImage: "url(/assets/images/loginback.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blockStyle: {
    background: "rgba(35,31,32,0.47)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(15px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
  },
  h2: {
    color: "#fff",
    fontSize: "150px",
    letterSpacing: 25,
    padding: "0 0 50px 0",
  },
  loginBlockForm: {
    width: "70%",
    borderRadius: "16px",
    padding: "20px 20px",
  },
};
