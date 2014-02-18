
import jinja2
import logging
import os
import re
import webapp2

from google.appengine.api import mail
from google.appengine.ext.webapp import template

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def MakeHandler(html):
  class HtmlHandler(webapp2.RequestHandler):
    def get(self):
      template = JINJA_ENVIRONMENT.get_template(html)
      self.response.write(template.render({}))
  return HtmlHandler


class MailHandler(webapp2.RequestHandler):

  def get(self):
    name = self.request.get("name")
    email = self.request.get("email")
    body = self.request.get("body")
    if not name or not email or not body:
      self.response.out.write("Missing name, email, or body.")
      return
    self.response.out.write("Thank you for your email!")
    mail.send_mail(
        sender="Contact Me <contactme@emmaboliu.appspotmail.com>",
        to="Emma Baumstarck <ebaumstarck@gmail.com>",
        subject="Greetings from your Web Site",
        body="\nName: %(name)s\nEmail: %(email)s\nMessage: %(body)s" % {
            "name": name,
            "email": email,
            "body": body,
        })


app = webapp2.WSGIApplication([
    ("/", MakeHandler("index2.html")),
    ("/chess", MakeHandler("chess.html")),
    ("/flash-cards", MakeHandler("flashcards.html")),
    ("/mail", MailHandler),
    ("/sliding-puzzle", MakeHandler("slidingpuzzle.html")),
    ("/tic-tac-toe", MakeHandler("tictactoe.html")),
    ("/questions", MakeHandler("questions.html")),
], debug=True)
