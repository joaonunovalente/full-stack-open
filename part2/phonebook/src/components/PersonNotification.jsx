const PersonNotification = ({ message }) => {
  if (message === null) {
    return

  }

  return (
    <div className="note">
      <label>{message}</label>
    </div>
  );
};

export default PersonNotification;
