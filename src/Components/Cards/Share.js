import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Share({url,text=""}) {

  const [open, setOpen] = React.useState(false);

  const actions = [
    { 
      icon: <TelegramIcon />, 
      name: 'Telegram', 
      url: `https://telegram.me/share/url?url=${encodeURIComponent(url)}/&text=${text}`,
      color:'#0088cc'
    },
    { 
      icon: <TwitterIcon />, 
      name: 'Twitter', 
      url: `https://twitter.com/intent/tweet?text=${text} &url=${encodeURIComponent(url)}`,
      color:'#1DA1F2'
    },
    { 
      icon: <WhatsAppIcon />, 
      name: 'WhatsApp', 
      url: `whatsapp://send?text=${text} ${encodeURIComponent(url)}`,
      color:'#25D366'
    },
    { 
    icon: <FacebookIcon />, 
    name: 'Facebook', 
    url: `http://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
      color:'#1877F2'
    },
    { 
      icon: <PinterestIcon />,
      name: 'Pinterest', 
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      color: '#E60023'
    },
  ];
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleActionClick = (url) => {
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
      <SpeedDial
        ariaLabel="SpeedDial basic"
        sx={{ 
          position: 'fixed',
          bottom: '10px',
          left: '10px'}}
        icon={<ShareIcon />}
        direction="left"
        onClick={handleToggle}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            sx={{color:`${action.color}`}}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.url)}
          />
        ))}
      </SpeedDial>
  );
}
