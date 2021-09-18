import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class Email2:

    sg = None

    def __init__(self):
        try:
            self.sg = SendGridAPIClient(
                "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")
        except Exception as e:
            print("THE ERROR IS", e)

    def sendMessage(self, sendto, message):
        message = Mail(from_email="stopdacap301@gmail.com",
                       to_emails=sendto,
                       subject="Verification Code",
                       plain_text_content=message,
                       html_content="<p>"+message+"</p>")
        try:
            self.sg.send(message)
            # print(response.status_code)
            # print(response.body)
            # print(response.header)
        except Exception as e:
            print("Exception error", e)
