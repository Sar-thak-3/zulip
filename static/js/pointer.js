// See https://zulip.readthedocs.io/en/latest/subsystems/pointer.html for notes on
// how this system is designed.

exports.recenter_pointer_on_display = false;
exports.set_recenter_pointer_on_display = function (value) {
    exports.recenter_pointer_on_display = value;
};

// Toggles re-centering the pointer in the window
// when All Messages is next clicked by the user
exports.suppress_scroll_pointer_update = false;
exports.set_suppress_scroll_pointer_update = function (value) {
    exports.suppress_scroll_pointer_update = value;
};

exports.initialize = function initialize() {
    $(document).on('message_selected.zulip', function (event) {
        if (event.id === -1) {
            return;
        }

        if (event.mark_read && event.previously_selected !== -1) {
            // Mark messages between old pointer and new pointer as read
            let messages;
            if (event.id < event.previously_selected) {
                messages = event.msg_list.message_range(event.id, event.previously_selected);
            } else {
                messages = event.msg_list.message_range(event.previously_selected, event.id);
            }
            if (event.msg_list.can_mark_messages_read()) {
                unread_ops.notify_server_messages_read(messages, {from: 'pointer'});
            }
        }
    });
};

window.pointer = exports;
