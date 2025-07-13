import { validateName, validatePhoneNo } from "../RegexExpsValidation/RegexExps";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, DialogContentText, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function PayDetailsOverlay(props) {

  const [payeeName, setPayeeName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [errors, setErrors] = useState({});
  useEffect(()=>{},[payeeName,phoneNo])

  const onClose = () => {
    props.onClose();
  }

  const validate = () => {
    const newErrors = {};
    if (!payeeName.match(validateName)) {
      newErrors.payeeName = "Payee Name is required";
    }
    if (!phoneNo.match(validatePhoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handlePay = () => {
    if (validate()) {

        props.setPayeeName(payeeName);
        props.setPayeePhno(phoneNo);
        props.proceedAndpay();
      onClose();
    }
    else {
        props.setPayeeName("");
        props.setPayeePhno("");
    }
  }

  return (
    <Dialog open={props.open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ background: '-webkit-linear-gradient(180deg,#eee, #090979)', color: 'whitesmoke' }}>
        Payee Details
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {props?.message}
        </DialogContentText>

        <TextField
          label="Payee Name"
          fullWidth
          margin="normal"
          value={payeeName}
          onChange={(e) => {props.setPayeeName(e.target.value);setPayeeName(e.target.value);validate()}}
          error={Boolean(errors.payeeName)}
          helperText={errors.payeeName}
        />

        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          value={phoneNo}
          onChange={(e) => {props.setPayeePhno(e.target.value);setPhoneNo(e.target.value);validate()}}
          error={Boolean(errors.phoneNo)}
          helperText={errors.phoneNo}
          inputProps={{ maxLength: 10 }}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handlePay} color="success">
          Pay
        </Button>
        <Button onClick={onClose} color="success">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
