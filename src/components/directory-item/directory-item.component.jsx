import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;

  return (
    <div className="directory-item-container">
      <div className="background-image" style={makeStyle(imageUrl)} />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

const makeStyle = (imageUrl) => {
  return {
    backgroundImage: `url(${imageUrl})`,
  };
};

export default DirectoryItem;
