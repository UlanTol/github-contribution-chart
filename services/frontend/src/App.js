import "./App.css";
import GithubChart from "./components/HomePage/GithubChart";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <GithubChart />
    </Provider>
  );
}

export default App;
