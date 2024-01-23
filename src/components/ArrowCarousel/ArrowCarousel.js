export function ArrowCarousel(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color:"black", backgroundColor:"#b7cf33" ,borderRadius:"80px" }}
        onClick={onClick}
      />
    );
  }
  