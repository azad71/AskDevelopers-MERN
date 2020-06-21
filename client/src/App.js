import React from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./redux/auth/auth.actions";
import { clearCurrentProfile } from "./redux/profile/profile.actions";
import { store } from "./redux/store";

// loading components
import Navbar from "./components/layout/navbar.component";
import Landing from "./components/layout/landing.component";
// import Footer from "./components/layout/footer.component";
import SignUp from "./components/auth/sign-up.component";
import Login from "./components/auth/login.component";
import Dashboard from "./components/dashboard/dashboard.component";
import CreateProfile from "./components/create-profile/create-profile.component";
import EditProfile from "./components/edit-profile/edit-profile.component";
import AddExperience from "./components/add-experience/add-experience.component";
import AddEducation from "./components/add-education/add-education.component";
import Profiles from "./components/profiles/profiles.component";
import ViewProfile from "./components/view-profile/view-profile.component";
import NotFound from "./components/not-found/not-found.component";
import Posts from "./components/posts/post.component";
import SinglePost from "./components/single-post/single-post.component";

import PrivateRoute from "./components/common/private-route/private-route.component";

import "./App.css";

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
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/feed" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={SinglePost} />
      </Switch>
    </div>
  );
}

export default App;
