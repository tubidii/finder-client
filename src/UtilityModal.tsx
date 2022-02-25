import {ListItem, ListItemButton, ListItemIcon, ListItemText, Modal} from "@mui/material";
import {Box} from "@mui/system";
import {Comment, Location} from "../types";
import * as MuiIcons from "@mui/icons-material";
import List from '@mui/material/List';
import CommentIcon from '@mui/icons-material/Comment';

type UtilityModalProps = {
  location?: Location
  handleClose: () => void
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: 'background.paper',
  border: 'rgba(255,255,255,0.5)',
  boxShadow: 24,
  borderRadius:"1rem"
}

type CommentItemProps = {
  comment: Comment
}


const CommentItem = ({comment}: CommentItemProps) => {
  return (
    <ListItem
      disablePadding
      sx={{
        borderRadius: "1rem",
        marginBottom:"0.5rem",
        boxShadow: "0px 1px 1px -1px white,0px 1px 1px 0px white,0px 1px 4px 0px white"
      }}  >
      <ListItemButton>
        <ListItemIcon>
          <CommentIcon sx={{
            color: 'white'
          }}/>
        </ListItemIcon>
        <ListItemText primary={comment.description}/>
      </ListItemButton>
    </ListItem>
  )
}

type CommentListProps = {
  comments: Comment[]
}

const CommentList = ({comments}: CommentListProps) => {
  return (
    <List>
      {comments.map(
        (comment, index) => {
          return <CommentItem key={index} comment={comment}/>
        }
      )}
    </List>
  )
}


const UtilityModal = ({handleClose, location}: UtilityModalProps) => {
  if (!location) return null;
  // @ts-ignore
  const MarkerIcon = MuiIcons[location.category.icon];
  return (
    <Modal open={Boolean(location)} onClose={handleClose}>
      <>
        {location &&
        <Box sx={style}>
          <Box sx={{p: 4}}>
            <h1>{location.name}</h1>
            <h3>{location.category.name}</h3>
            <h5>Comments</h5>
            <CommentList comments={location.comments}/>
          </Box>
        </Box>
        }
      </>
    </Modal>
  )
}

export default UtilityModal;
