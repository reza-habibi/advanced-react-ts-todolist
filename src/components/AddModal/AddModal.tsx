import React, { useState , useEffect} from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { MdModeEdit } from "react-icons/md";
import { useSpring, animated } from "react-spring/dist/react-spring.cjs";

import ModalForm from "./ModalForm/ModalForm";
import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "./../../app/hooks";
import { openModal } from "../../redux/todoSlicer";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const SpringModal = () => {
  const { opened } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  const classes = useStyles();

  const handleOpen = () => {
    dispatch(openModal(true));
  };

  const handleClose = () => {
    dispatch(openModal(false));
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <MdModeEdit size={28} cursor={"pointer"} />
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalForm onClick={handleClose} setOpen={setOpen} open={open} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SpringModal;
