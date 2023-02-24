#!/bin/bash

# Recipient email address
to="mailAddress@gmail.com"

# Sender email address
from="mailuser@gmail.com"

# Subject
subject="Test email"

# Message body
body="This is a test email sent from a bash script."

# Send the email
echo "$body" | sendmail -f "$from" -t "$to" -u "$subject" -S smtpMailServer:25 -au mailuser -ap password@#

