import React from "react";
import { Dialog, DialogContent, Box, Slide } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function NetworkChange({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const networkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }], //BSC Mainnet
        // params: [{ chainId: "0x61" }], //BSC Testnet
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="modal__main__container">
        <Dialog
          open={open}
          keepMounted
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent sx={{background:"#FFC07B"}} className="dialoge__content__section">
            <Box component="h3" color="#000">
              <Box component="span" color="red" fontSize="30px">
                Error!
              </Box>{" "}
              You are on wrong network please switch your network.
            </Box>
            <Box align="center">
              <button
                style={{
                  background:
                    "#FF8106",
                  borderRadius: "34px",
                  padding: "15px 20px",
                  border: "1px solid white",
                  outline: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "16px",
                  lineHeight: "19px",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  marginRight: "10px",
                }}
                onClick={networkHandler}
              >
                Switch Network
              </button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default NetworkChange;
