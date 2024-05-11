
import { MdNotificationsNone } from "react-icons/md";
import NotificationData from './NotificationData';
import React, {useState, useEffect, useRef} from 'react';

export default function NotificationPopup() {
    const [notifs, setNotifs] = useState([
        {
            id: 1,
            user: "Jacob Thompson",
            userImage: "bg4.jpg",
            action: "commented in your last picture ", 
            timestamp: new Date(),
            isNew: true
        },
        {
            id: 2,
            user: "Rizky Hasanuddin",
            userImage: "bg4.jpg",
            action: "sent you a private message",
            timestamp: new Date(),
            isNew: true
          
          
          },{
            id: 3,
            user: "Mark Webber",
            userImage: "bg4.jpg",
            action: "commented in your last picture",
            timestamp: new Date(),
            isNew: false
        },
        {
            id: 4,
            user: "Angela Gray",
            userImage: "bg4.jpg",
            action: "reacted to your recent post",
            timestamp: new Date(),
            isNew: false
        },
    ]);

    const [open, setOpen] = useState(false);
    const [newNotifCount, setNewNotifCount] = useState(notifs.filter(notif => notif.isNew).length);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }      
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }

    }, []);

    const handleRead = () => {
        setNotifs(notifs.map(notif => {
            return { ...notif, isNew: false };
        }));
        setNewNotifCount(0);
        setOpen(false);
    };

    const handleDeleteAll = () => {
        setNotifs([]);
        setNewNotifCount(0);
        setOpen(false);
    };

    const handleNotificationClick = (id) => {
        setNotifs(notifs.map(notif => {
            if (notif.id === id && notif.isNew) {
                return { ...notif, isNew: false };
            }
            return notif;
        }));
        setNewNotifCount(newNotifCount - 1);
    };

    return (
        <div>
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger  overflow-auto' onClick={() => {setOpen(!open)}}>  
                    <MdNotificationsNone className="w-5 h-5 relative" />
                    {newNotifCount > 0 && <div className={`w-[11px] h-[11px] text-xs bg-red-700 flex items-center justify-center p-[7px] right-[92px] top-[18px] md:top-[17px] sm:top-[19px] sm:right-[107px] md:right-[65px] rounded-full absolute`}>{newNotifCount}</div>}
                </div>
                <div className={`absolute overflow-y-auto top-[60px] shadow-md shadow-[#6D6D6D] rounded-md bg-[#fff] w-[250px] sm:w-[350px] right-1 before:absolute before:top-[-5px] before:right-[20px] before:transform before:rotate-45 before:h-[20px] before:w-[20px] before:dark:bg-darkmode ${open ? 'opacity-100 visible translate-y-0' : ' opacity-0 invisible -translate-y-20'}`} >
                    <div className="text-white bg-sky-500 py-3 px-3 rounded-t-lg font-semibold text-lg">
                        Notifications 
                    </div>
                    <div className="p-3">
                        {notifs.length > 0 ? (
                            notifs.map((element, index) => (
                                <NotificationData key={index} props={element} isNew={element.isNew} onClick={() => handleNotificationClick(element.id)} />
                            ))
                        ) : (
                            <div className="text-gray-500 text-sm">No notifications</div>
                        )}
                    </div> 
                    {notifs.length > 0 && (
                        <div className="flex items-center justify-center pb-2">
                            <button onClick={handleRead} className="text-white px-2 text-xs py-1 bg-sky-500 rounded-lg mr-2">Mark as read</button>
                            <button onClick={handleDeleteAll} className="text-white px-2 text-xs py-1 bg-red-500 rounded-lg">Delete All</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
