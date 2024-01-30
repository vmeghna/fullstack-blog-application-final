import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";
import BlogsList from "./features/blogs/BlogsList";
import BlogsListItem from "./features/blogs/BlogsListItem";
import BlogDetail from "./features/blogs/BlogDetail";
import UpdateBlog from "./pages/UpdateBlog";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/UpdateProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="/blogs/:id" element={<BlogDetail/>}/> */}
          <Route path="/blogs/:_id" element={<BlogDetail/>}/>
          <Route path="/update/:_id" element={<UpdateBlog/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/profileUpdate/:id" element={<ProfileUpdate/>}/>
          <Route path="users">
            <Route path="create-blog" element={<CreateBlog />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
