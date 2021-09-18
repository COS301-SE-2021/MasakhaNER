import smtplib
import ssl
# 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
# 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


class Email:
    """
    Constructor:
        Sets up SMTP server..
    Parameters:
        None
    Returns:
        Boolean:Returns false if database connection fails
    """

    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.port = 587  # For starttls
        self.sender_email = "masakhaner.301@gmail.com"
        self.password = "stopdacapcos301"
        self.context = ssl.create_default_context()
        try:
            self.server = smtplib.SMTP(self.smtp_server, self.port)
            self.server.ehlo()
            self.server.starttls(context=self.context)
            self.server.ehlo()
            self.server.login(self.sender_email, self.password)
        except Exception as e:
            print(f"Send email error: {e}")
            return None

    """
    send_email function:
        Sends email to user when they register
    Parameters:
        message(string): message sent containing email
        receiver_email(string): email address of user
    Returns:
        Boolean:Returns false if email sending fails
    """

    def send_email(self, message, receiver_email):
        try:
            self.server.sendmail(self.sender_email, receiver_email, message)
            self.server.quit()
            #print('email sent')
            return True
        except:
            print("failed")
            return False
