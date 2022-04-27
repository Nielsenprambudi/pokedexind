import { Notification } from "rsuite";

const message = (type, msg) => (
    <Notification type={type} header={type} closable>
      {msg}
    </Notification>
);

export default message;