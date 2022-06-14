import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category;

    return (
        <div className="category-container">
            <div className="background-image" style={makeStyle(imageUrl)}/>
            <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
            </div>
        </div>
    );
}

const makeStyle = (imageUrl) => {
    return {
        backgroundImage: `url(${imageUrl})`
    };
}

export default CategoryItem;