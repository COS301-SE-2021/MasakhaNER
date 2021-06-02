import { Input } from "../../components/input/Input";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/Footer/Footer";
import Register from "../register/Register";

function Dashboard() {
  return (
    <div>
      <Nav />
      {/* <Input /> */}
      <Register/>
      <Footer />
    </div>
  );
}

export default Dashboard;
