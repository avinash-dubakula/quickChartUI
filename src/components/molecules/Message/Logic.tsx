import { MessageStatus } from "../../../types/AppData/Message/Types";

export const formatTime = (date?: Date) => {
    if (!date) return '';
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Converts "0" to "12"
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
export const getStatusIcon = (status: MessageStatus, isIncoming: boolean, actionAt: Date | undefined) => {
    if (!actionAt) return <span className="statusIcon" style={{ color: 'grey' }}>🕞</span>; // Icon for sending (actionAt is null)
  
    if (!isIncoming) {
      switch (status) {
        case MessageStatus.Sent:
          return <span className="statusIcon">✓</span>;
        case MessageStatus.Delivered:
          return <span className="statusIcon">✓✓</span>;
        case MessageStatus.Seen:
          // Return two ticks in blue color for Seen status
          return <span className="statusIcon" style={{ color: 'blue' }}>✓✓</span>;
        case MessageStatus.Deleted:
          // No icon for deleted, thus no class needed
          return <span></span>;
        default:
          return <span></span>;
      }
    } else {
      // Return empty for incoming messages if necessary
      return <span></span>;
    }
  };