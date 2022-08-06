import "./infoMovie.css";

interface IModalProps {
  setShowModal: Function;
}

export const InfoMovie: React.FC<IModalProps> = (props: IModalProps) => {
  return (
    <div className="showModal">
      <div className="modalMovieInfo">
        <h1>{}</h1>
        <h2>Descrição do filme</h2>
        <h3>Nota do filme</h3>
        <button type="button" onClick={() => props.setShowModal(false)}>
          Fechar
        </button>
      </div>
    </div>
  );
};
