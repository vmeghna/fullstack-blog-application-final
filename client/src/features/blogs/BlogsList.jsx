import { useBlogs } from "../../context/BlogsContext";
import GridTemplate from "../../ui/GridTemplate";
import BlogsLoader from "../../ui/loaders/BlogsLoader";
import BlogsListItem from "./BlogsListItem";

const BlogsList = () => {
  const { loading, blogs } = useBlogs();

  if (loading) return <BlogsLoader />;
  

  return (
    <GridTemplate>
      {/* {blogs?.map((item) => (
        <BlogsListItem item={item} key={item._id} />
      ))} */}
      {blogs?.map((item) => {
        console.log("Item:", item); // Log the item to inspect its structure
        return <BlogsListItem item={item} key={item._id} />;
      })}
    </GridTemplate>
  );
};

export default BlogsList;
