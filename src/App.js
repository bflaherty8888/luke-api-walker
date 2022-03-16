import StarForm from "./components/StarForm";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Result from "./components/Result";

function App() {
  return (
    <div className="container my-3">
      <BrowserRouter>
        <StarForm />
        <Switch>
          <Route path="/:category/:id">
            <Result />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
