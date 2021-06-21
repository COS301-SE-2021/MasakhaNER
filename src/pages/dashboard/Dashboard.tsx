import { Input } from "../../components/input/Input";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./Dashboard.css"

function Dashboard() {
  return (
    <div id="dash"> 
      <Nav />
      <Input />
      <Footer />
    </div>
  );
}

export default Dashboard;
