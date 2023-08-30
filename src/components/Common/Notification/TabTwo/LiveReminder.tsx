import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Notification } from '../../../../redux/notificationSlice/notificationSlice';


const LiveReminder: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notificationReducer.notifications);
  const [reminders,setRemiders] = useState<Notification[]|[]>([])
  useEffect(() => {
    setRemiders(notifications);
  },[notifications])
  return (
    <div className="flex w-full h-full justify-center items-center text-[13px] p-3  overflow-hidden">
      <div className="flex overflow-y-auto  w-full max-h-[200px] flex-col gap-3 px-5 ">
        {reminders.length > 0 ? (
          reminders.map((reminder, idx) => (
            <div
              className="w-full h-fit flex  p-3 items-center justify-center gap-5 bg-black text-white "
              key={idx}
            >
              <div className="flex w-full h-fit gap-3 items-center">
                <div className="flex w-7 h-7">
                  <img
                    className="rounded-sm"
                    src={reminder.tutor?.profile}
                    alt="user.profile"
                  />
                </div>
                <div className="flex items-center w-fit h-fit gap-1">
                  {reminder.tutor?.username} is live now{" "}
                  <span className="text-primary">!</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full gap-1 h-fit justify-center items-center p-5 text-[13px] ">
            No new notifications <span className="text-primary">!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveReminder