import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import { formatPostingTime } from "../../utils/helperFuntions";
import moment from "moment";

const BlogsListItem = ({ item }) => {
  const {
    _id,
    author: { name, title, subtitle, tags, imageUrl, createdAt },
  } = item;
  console.log(_id);
  const formattedCreatedAt = moment(createdAt).format('MMMM Do YY');
  return (
    <article className="overflow-hidden transition-all duration-300 shadow-md rounded-xl bg-base-100 hover:drop-shadow-lg">
      <Link to={`/blogs/${_id}`}>
      
      
        <div className="flex flex-col md:flex-row">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-56 md:order-2 md:h-auto md:w-1/4"
          />
          <div className="flex flex-grow flex-col gap-4 p-5 md:min-h-[300px]">
            <div className="space-y-2">
              
              <span className="badge badge-secondary badge-outline badge-lg">
              {tags}
              </span>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <h3 className="text-lg">{subtitle}</h3>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={name} />
                <span className="font-medium">{name}</span>
                {console.log(name)}
              </div>
              <div className="text-sm">{formattedCreatedAt}</div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};


BlogsListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      tag: PropTypes.string,
      imageUrl: PropTypes.string,
      // createdAt: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogsListItem;
