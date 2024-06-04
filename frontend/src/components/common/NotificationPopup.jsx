import { useGetNotificationQuery, useMarkNotificationAsSeenMutation } from "../../features/notifications/notificationsApiSlice";
import { MdNotificationsNone } from "react-icons/md";
import NotificationData from './NotificationData';
import React, { useState, useEffect, useRef } from 'react';

export default function NotificationPopup() {
    const { data: notifications , isLoading: notificationsLoading } = useGetNotificationQuery();
    const [markNotificationAsSeen] = useMarkNotificationAsSeenMutation();
    const [open, setOpen] = useState(false);
    const [notifs, setNotifs] = useState([]);
    const [newNotifCount, setNewNotifCount] = useState(0);

    let menuRef = useRef();

    useEffect(() => {
        if (notifications) {
            setNotifs(notifications);
            setNewNotifCount(notifications.filter(notif => notif.seen === false).length);
        }
    }, [notifications]);

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

    const handleRead =  () => {
            notifs.forEach(async(notif) => {
                if (notif.seen === false) {
                    await markNotificationAsSeen({ note: notif.note, from: notif.from._id}).unwrap();
                }
            });
            setNotifs(notifs.map(notif => ({ ...notif, seen: true })));
            setNewNotifCount(0);
            setOpen(false);
    };

    if (notificationsLoading) return <MdNotificationsNone className="w-5 h-5 animate-pulse" />;

    return (
        <div>
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger overflow-auto' onClick={() => { setOpen(!open) }}>
                    <MdNotificationsNone className="w-5 h-5 relative" />
                    {newNotifCount > 0 && <div className={`w-[11px] h-[11px] text-xs bg-red-700 flex items-center justify-center p-[7px] right-[92px] top-[18px] md:top-[17px] sm:top-[19px] sm:right-[107px] md:right-[65px] rounded-full absolute`}>{newNotifCount}</div>}
                </div>
                <div className={`absolute overflow-y-auto top-[60px] shadow-md shadow-[#6D6D6D] rounded-md bg-[#fff] dark:bg-darkmode w-[250px] sm:w-[350px] right-1 before:absolute before:top-[-5px] before:right-[20px] before:transform before:rotate-45 before:h-[20px] before:w-[20px] before:dark:bg-darkmode ${open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-20'}`}>
                    <div className="text-white bg-primary py-3 px-3 rounded-t-lg font-semibold text-lg">
                        Notifications
                    </div>
                    <div className="p-3">
                        {notifs.length > 0 ? (
                            notifs.map((element, index) => (
                                <NotificationData key={index} props={element} isNew={!element.seen} />
                            ))
                        ) : (
                            <div className="text-gray-500 text-sm">No notifications</div>
                        )}
                    </div>
                    {notifs.length > 0 && (
                        <div className="flex items-center justify-center pb-2">
                            <button onClick={handleRead} className="text-white px-2 text-xs py-1 bg-primary rounded-lg mr-2">Mark as read</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
