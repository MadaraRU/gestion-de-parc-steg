import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  return (
    show && (
      <Alert variant={variant} onClose={() => setShow(!show)} dismissible>
        {children}
      </Alert>
    )
  );
};

export default Message;
