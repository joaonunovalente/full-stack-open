const PersonNotification = ({ message }) => {

  return message === null ? null : (
    <div className="notification-message">
      <label>{message}</label>
    </div>
  );
};

export default PersonNotification;
