const NavItem = (props) => {
  return (
    <>
      <div>
        <p
          className={props.className}
          onClick={props.handleClick}
          style={props.style}
        >
          {props.text}
        </p>

        {props.open && props.children}
      </div>
    </>
  );
};

export default NavItem;
