import { Input } from "../../components/input/Input";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/Footer/Footer";
import Register from "../register/Register";
import VerifyAccount from "../verify/VerifyAccount"

function Dashboard() {
  return (
    <div>
      <Nav />
      {/* <Input /> */}
      <Register/>
      {/* <VerifyAccount /> */}
      <Footer />
    </div>
  );
}

export default Dashboard;
