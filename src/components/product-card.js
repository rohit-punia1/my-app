const ProductCard = (props) => {
  const style = {
    img: {
      width: 180,
      height: 180,
      objectFit: "contain",
    },
    title: {
      fontSize: "14px",
      textAlign: "center",
      marginTop: 0,
      fontWeight: 600,
    },
    productCardContainer: {
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <div style={style.productCardContainer}>
      <div>
        <img src={props.image} alt="" style={style.img} />
        <h1 style={style.title}>{props.title}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
