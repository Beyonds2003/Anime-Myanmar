import React from "react";
import {
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import VideoThumbnail from "react-video-thumbnail";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "./style.css";

function VideoComponent({ vid, num }) {
  const [change, setChange] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const playerRef = React.useRef();

  const onReady = React.useCallback(() => {
    const timeToStart = 4 * 60;
    playerRef.current.seekTo(timeToStart, "seconds");
  }, [playerRef.current]);

  const navigate = useNavigate();

  const handleChange = () => {
    navigate(`/v1/play/${vid.Mtitle}/${vid.epname}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, color: "#009eff" }}
      onMouseEnter={() => setChange(true)}
      onMouseLeave={() => setChange(false)}
    >
      <motion.div className="videoContainer" onClick={handleChange}>
        <ReactPlayer
          ref={playerRef}
          url={vid.videourl[1].url}
          cors={true}
          playing={isPlaying}
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "5px", overflow: "hidden" }}
          onReady={onReady}
        />
      </motion.div>
      <Typography
        variant="body2"
        id="epname"
        style={{ color: change ? "#009eff" : "white" }}
      >
        {`Episode-${vid.epname.split(" ").at(-1)}`}
      </Typography>
    </motion.div>
  );
}

export default VideoComponent;
