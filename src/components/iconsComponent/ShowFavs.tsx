export const ShowFavs = (props: any) => {
  return (
    <svg
      onClick={props.showfavs}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi-heart-fill"
      viewBox="0 0 16 16"
    >
      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
    </svg>
  );
};
