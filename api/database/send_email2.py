import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

message = Mail(from_email="stopdacap301@gmail.com",
               to_emails="borekhotso@gmail.com",
               subject="Heroku is ass",
               plain_text_content="i hope this works honestly",
               html_conytent="<strong>please just work</strong>")

try:
    sg = SendGridAPIClient(
        "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")
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.header)
except Exception as e:
    print(e.meddage)
