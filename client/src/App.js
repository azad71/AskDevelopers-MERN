import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./redux/auth/auth.actions";
import { clearCurrentProfile } from "./redux/profile/profile.actions";
import { store } from "./redux/store";

// loading global styles
import "./App.css";

// loading components
// initial components
import Navbar from "./components/layout/navbar.component";
import Landing from "./components/layout/landing.component";
import Spinner from "./components/common/spinner/spinner.component";

// import Footer from "./components/layout/footer.component";
// lazy loading
const SignUp = lazy(() => import("./components/auth/sign-up.component"));
const Login = lazy(() => import("./components/auth/login.component"));
const PrivateRoute = lazy(() =>
  import("./components/common/private-route/private-route.component")
);
const Dashboard = lazy(() =>
  import("./components/dashboard/dashboard.component")
);
const CreateProfile = lazy(() =>
  import("./components/create-profile/create-profile.component")
);
const EditProfile = lazy(() =>
  import("./components/edit-profile/edit-profile.component")
);
const AddExperience = lazy(() =>
  import("./components/add-experience/add-experience.component")
);
const AddEducation = lazy(() =>
  import("./components/add-education/add-education.component")
);
const Profiles = lazy(() => import("./components/profiles/profiles.component"));
const ViewProfile = lazy(() =>
  import("./components/view-profile/view-profile.component")
);
const NotFound = lazy(() =>
  import("./components/not-found/not-found.component")
);
const Posts = lazy(() => import("./components/posts/post.component"));
const SinglePost = lazy(() =>
  import("./components/single-post/single-post.component")
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedUserData = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedUserData));

  let currentTime = Date.now() / 1000;

  if (decodedUserData.exp < currentTime) {
    store.dispatch(logOutUser());
    store.dispatch(clearCurrentProfile());

    window.location.href = "/login";
  }
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/">
            <Landing />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/profiles">
            <Profiles />
          </Route>

          <Route exact path="/profile/:handle">
            <ViewProfile />
          </Route>

          <Route exact path="/not-found">
            <NotFound />
          </Route>

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/feed" component={Posts} />
          <PrivateRoute exact path="/post/:id" component={SinglePost} />
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
