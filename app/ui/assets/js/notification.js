'use strict'

class Notification {
    constructor(type, message, title = null) {
        // Holds the actual notification frame
        this.frame = null;
        this.type = type;
        this.title = title;
        this.message = message;
    }

    // Initializes events handling for the notification
    initEvents() {
        this.frame.on('click', () => {
            this.destroy();
        });
    }

    // Animates (fadeIn) the notification, appends it to the DOM
    show() {
        const notificationTitle = this.title === null ? this.getDefaultTitle(this.type) : this.title;

        // Append the notification into the DOM
        const notification = $('<div class="notification ' + this.type + '"><h3>' + notificationTitle + '</h3><span>' + this.message + '</span></div>');

        // Keep a ref to the notification frame
        this.frame = notification;

        // Append the notification to the DOM
        $('#wrapper').append(notification);

        this.initEvents();

        // Animate the notification
        this.frame.fadeIn("fast");
    }

    // Animates (fadeOut) the notification, removes it from the DOM afterwards
    destroy() {
        // Animate the notification
        this.frame.fadeOut( "fast", function() {
            // Remove it from the DOM
            this.remove();
            console.log('destroy now');
        });
    }

    // Returns a default title for the notification if none has been provided
    getDefaultTitle(type) {
        // Avoid mismatch due to uppercase letter usage
        const lowercasedType = type.toLowerCase();
        let title = undefined;

        switch (type) {
          case 'info':
            title = 'Info';
            break;
          case 'error':
            title = 'error';
            break;
          default:
            title = '';
        }

        return title;
    }
}
