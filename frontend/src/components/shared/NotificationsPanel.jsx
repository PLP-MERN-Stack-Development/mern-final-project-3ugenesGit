import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BellAlertIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markNotificationRead } from '@/services/notificationService';
import { useNotifications } from '@/hooks/useNotifications';

export const NotificationsPanel = () => {
  const { notificationsOpen } = useSelector((state) => state.ui);
  const queryClient = useQueryClient();
  const { data: notifications = [], isLoading } = useNotifications({ enabled: notificationsOpen });

  const mutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  return (
    <Transition
      show={notificationsOpen}
      as={Fragment}
      enter="transition duration-200"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
    >
      <div className="absolute right-6 top-20 z-20 w-80 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BellAlertIcon className="h-5 w-5 text-primary-500" />
            <h3 className="font-semibold text-slate-800">Notifications</h3>
          </div>
          <p className="text-xs text-slate-400">
            {notifications.filter((item) => !item.read).length} unread
          </p>
        </div>
        <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
          {isLoading && (
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">Loading…</div>
          )}
          {!isLoading && !notifications.length && (
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
              All caught up! 🎉
            </div>
          )}
          {notifications.map((item) => (
            <div key={item._id} className="rounded-xl bg-slate-50 p-3 text-sm space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-800">{item.title}</p>
                {!item.read && (
                  <button
                    onClick={() => mutation.mutate(item._id)}
                    className="text-xs font-semibold text-primary-600"
                  >
                    Mark read
                  </button>
                )}
                {item.read && <CheckIcon className="h-4 w-4 text-emerald-500" />}
              </div>
              <p className="text-slate-500">{item.body}</p>
              <p className="text-xs text-slate-400">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Transition>
  );
};

