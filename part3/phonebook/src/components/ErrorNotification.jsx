const ErrorNotification = ({ message }) => {

  return message === null ? null : (
    <div className="error-message">
      <label>{message}</label>
    </div>
  );
};

export default ErrorNotification;
